import * as bcrypt from 'bcrypt';
import { log } from '../logger/';

import {userRegisterInfo} from '../types/users'
import {show_bad_message, show_good_message} from '../functions/utils'

export async function register_a_new_user(userInfo:userRegisterInfo) {
    const {name, username, email, password, gender} = userInfo;
    const checks_array = [name, username, email, password, gender] // want to make sure all fields are not less than zero
    let found_an_empty_value = false

    // checks to make sure all fields are not less than zero in length
    checks_array.forEach(item => {
        if (item.length <= 0) {
            found_an_empty_value = true
        } 
    })
 

    if (found_an_empty_value) {
        return show_bad_message('please fill up all the required fields, some fields are empty')
    }

    if (password.length <= 5) {
        return show_bad_message('Your password is too short, it should be at least 5 characters')
    }

    const plainPassword: string = 'user_password'; // Replace with the actual password
    const saltRounds: number = 10; // Number of salt rounds, higher is better but slower
    // console.log('oya, register the user shaparly', userInfo)

    return show_good_message()
}