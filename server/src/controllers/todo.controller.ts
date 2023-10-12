import pool from '../db'
import {show_bad_message, show_good_message, generate_fake_id} from '../functions/utils'
import { newTodoProps } from '../types/todo';

export async function add_a_new_item_to_this_user_todoList(todoInfo:newTodoProps) {
    const {details, user_id} = todoInfo;

    if (details.length <= 1) {
        return show_bad_message('Please fill in all required fields, specifically for your todo')
    }

    if (user_id <= 0) {
        return show_bad_message('invalid user id received, please refresh your application/browser and try again')
    }

    const qSave = await pool.query(
        "INSERT INTO todo (user_id, details, date_added, completed) values ($1, $2, now(), $3) RETURNING *",
        [user_id, details, 'no']
    )
    const result = qSave.rows[0]

    console.log(result)

    const good_msg = show_good_message()
    return good_msg;
}