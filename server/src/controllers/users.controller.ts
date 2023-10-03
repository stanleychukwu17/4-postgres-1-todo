import * as bcrypt from 'bcrypt';
import { errorLogger, log } from '../logger/';
import pool from '../db'

import {userRegisterInfo} from '../types/users'
import {show_bad_message, show_good_message} from '../functions/utils'

export async function register_a_new_user(userInfo:userRegisterInfo) {
    const {name, username, email, password, gender} = userInfo;
    const checks_array = [name, username, email, password, gender] // want to make sure all fields are not less than zero
    let found_an_empty_value = false
    const success_message = 'Your registration was successfully completed, You can now login with your username/email and password'

    // checks to make sure all fields are not less than zero in length
    checks_array.forEach(item => {
        if (item.length <= 0) {
            found_an_empty_value = true
        } 
    })
 
    // checks to see if the email already exists
    const qEmail = await pool.query("SELECT id from users where email = $1 limit 1", [email])
    if (qEmail.rows.length > 0) {
        return show_bad_message('This email already exists')
    }

    // checks to see if the username already exists
    const qUsername = await pool.query("SELECT id from users where username = $1 limit 1", [username])
    if (qUsername.rows.length > 0) {
        return show_bad_message('This username already exists')
    }

    if (found_an_empty_value) {
        return show_bad_message('please fill up all the required fields, some fields are empty')
    }

    if (password.length <= 5) {
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