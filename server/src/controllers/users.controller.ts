import * as bcrypt from 'bcrypt';


import {userRegisterInfo} from '../types/users'
import {show_bad_message, show_good_message} from '../functions/utils'

export async function register_a_new_user(userInfo:userRegisterInfo) {
    const {name, password, gender} = userInfo;

    if (name.length <= 3 || password.length <= 3) {
        return show_bad_message('Your names are too short')
    }
    if (password.length <= 3) {

    }
    if (gender.length <= 3) {

    }

    const plainPassword: string = 'user_password'; // Replace with the actual password
    const saltRounds: number = 10; // Number of salt rounds, higher is better but slower
    console.log('oya, register the user shaparly', userInfo)
}