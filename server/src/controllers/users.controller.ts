import * as bcrypt from 'bcrypt';
import { errorLogger, log } from '../logger/';
import pool from '../db'

import {userRegisterInfo, userLoginInfo} from '../types/users'
import {show_bad_message, show_good_message, generate_fake_id} from '../functions/utils'
import {signJWT} from '../functions/jwt.utils'

// checks if a user has an active session or creates a new active session for the user_id received
async function createSession (user_id:number) {
    const good_msg = show_good_message()

    // checks to see if there are any active sessions for this user
    const qCheck = await pool.query("SELECT id, fake_id from users_session where user_id = $1 and active = 'yes' limit 1", [user_id])
    const num_rows = qCheck.rows.length
    if (num_rows > 0) {
        return {...good_msg, session_fid: qCheck.rows[0].fake_id}
    }

    // create a new session and return it
    const qIn = await pool.query("INSERT INTO users_session (fake_id, user_id, active) values ($1, $2, $3) RETURNING *", [0, user_id, 'yes'])
    const {id:session_id} = qIn.rows[0]
    const new_fake_id = generate_fake_id(session_id)

    // updates the session created with the new fake_id
    const qUpdate = await pool.query("UPDATE users_session set fake_id = $1 where id = $2", [new_fake_id, session_id])

    return {...good_msg, "session_fid":new_fake_id}
}

export async function register_a_new_user(userInfo:userRegisterInfo) {
    const {name, username, email, password, gender} = userInfo;
    const checks_array = [name, username, email, password, gender] // want to make sure all fields are not less than zero
    let found_an_empty_value = false
    const success_message = 'Your registration was successfully completed, You can now login with your username/email and password'

    // checks to make sure all fields are not less than zero in length
    checks_array.forEach(item => {
        if (typeof item === 'undefined' || item.length <= 1) {
            found_an_empty_value = true
        }
    })

    if (found_an_empty_value) {
        return show_bad_message('please fill up all the required fields with minimum of two characters')
    }

    try {
        // checks to see if the email already exists
        const qEmail = await pool.query("SELECT id from users where email = $1 limit 1", [email])
        if (qEmail.rows.length > 0) {
            return show_bad_message('This email already exists')
        }
    } catch (err) {

    }

    // checks to see if the username already exists
    const qUsername = await pool.query("SELECT id from users where username = $1 limit 1", [username])
    if (qUsername.rows.length > 0) {
        return show_bad_message('This username already exists')
    }

    if (password.length <= 4) {
        return show_bad_message('Your password is too short, it should be at least 5 characters')
    }

    // hash the password using bcrypt
    const saltWorkFactor = 10;
    const salt = await bcrypt.genSalt(saltWorkFactor);
    const hash = await bcrypt.hashSync(password, salt);

    // saves the new user to the database
    try {
        const newTodo = await pool.query(
            "INSERT INTO users (name, username, email, password, gender, date_added) VALUES ($1, $2, $3, $4, $5, now()) RETURNING *",
            [name.toLowerCase(), username.toLowerCase(), email.toLowerCase(), hash, gender]
        )
        return show_good_message(success_message)
    } catch (err:any) {
        errorLogger.error({pre:'Could not save a new user to the database'}, err.message);
        return show_bad_message('Could not save your information to the database, please contact our customer support for assistance');
    }

    return show_good_message(success_message)
}

export async function login_this_user (userInfo: userLoginInfo) {
    const {username, password} = userInfo;
    const checks_array = [username, password] // want to make sure all fields are not less than zero
    let found_an_empty_value = false

    // checks to make sure all fields are not less than zero in length
    checks_array.forEach(item => {
        if (typeof item === 'undefined' || item.length <= 0) {
            found_an_empty_value = true
        }
    })

    if (found_an_empty_value) {
        return show_bad_message('please fill up all the required fields, some fields are empty')
    }

    // checks to see if the user exists in our database
    const qUser = await pool.query("SELECT id, password from users where username = $1 OR email = $1 limit 1", [username])
    if (qUser.rows.length <= 0) {
        return show_bad_message('Please, the username or email provided is not valid')
    }

    // grabs the hashed password from the result above
    const userDts = qUser.rows[0]
    const {id:user_id, password: hashed_password} = userDts

    // compare the password received to see if it is a valid password
    const validPassword = await bcrypt.compare(password, hashed_password)
    if (!validPassword) {
        return show_bad_message('InValid password received')
    }

    // creates a new session for the user
    const session = await createSession(user_id); // get the session fake_id, use the fake_id to create the access token and refresh token
    const session_fid = session.session_fid as number

    // create access and refresh tokens
    const payload = {user_id: user_id, session_fid: session_fid}
    const accessToken = signJWT(payload, "7d");
    const refreshToken = signJWT({session_fid}, "1y");

    const done = show_good_message()
    const dts = {user_id, session_fid, refreshToken, accessToken}
    return {...done, ...dts}
}