import pool from '../db'
import {show_bad_message, show_good_message, generate_fake_id} from '../functions/utils'
import { newTodoProps } from '../types/todo';

// re-ranks all the active todo in a user's list
export async function re_rank_all_of_this_user_todo_items(user_id: number) {
    const qAll = await pool.query("SELECT id from todo where user_id = $1 and completed = 'no' order by rank asc", [user_id])

    if (qAll.rows[0]) {
        await Promise.all(
            qAll.rows.map( async (row: {id:number}, index: number) => {
                await pool.query("UPDATE todo SET rank = $1 where id = $2", [index+1, row.id])
            })
        )
    }

    return show_good_message()
}

// get one todo item using the id or the fake id
export async function get_the_details_of_this_todo (props:{wch:'fake_id'|'id', use_id:number}) {
    const qSelect = await pool.query(`SELECT * FROM todo where ${props.wch} = $1 limit 1`, [props.use_id])
    const num_rows = qSelect.rows.length
    return {num_rows, ...qSelect.rows[0]}
}

// adds a new todo to the list of a user todo items
export async function add_a_new_item_to_this_user_todoList(todoInfo:newTodoProps) {
    const {details, user_id} = todoInfo;

    if (details.length <= 1) {
        return show_bad_message('Please fill in all required fields, specifically for your todo')
    }

    if (user_id <= 0) {
        return show_bad_message('invalid user id received, please refresh your application/browser and try again')
    }

    // makes sure the user has less than 50 todo items
    const q50 = await pool.query("SELECT count(id) from todo where user_id = $1 and completed = 'no' ", [user_id]);
    const total = q50.rows[0].count
    if (total >= 50) {
        return show_bad_message('you have reached the maximum number of items(i.e 50 items) in your todo list');
    }

    // get the last ranked item and create the ranking for this item
    const qRank = await pool.query("SELECT rank from todo WHERE user_id = $1 and completed = 'no' order by rank desc limit 1 ", [user_id]);
    let last_rank = qRank.rows[0] ? qRank.rows[0].rank : 0
    last_rank += 0.25

    // saves the item to the user todo list
    const qSave = await pool.query(
        "INSERT INTO todo (user_id, details, date_added, rank, completed) values ($1, $2, now(), $3, $4) RETURNING *",
        [user_id, details, last_rank, 'no']
    )
    const result = qSave.rows[0]

    // generates a fake_id for the todo item
    const fake_id = generate_fake_id(result.id)
    const qUpdate = await pool.query("UPDATE todo SET fake_id = $1 WHERE id = $2 ", [fake_id, result.id])

    // re-rank all the items on the todo list
    await re_rank_all_of_this_user_todo_items(user_id);

    // get the details of only this todo item
    const todo_item = await get_the_details_of_this_todo({wch:'id', use_id:result.id})

    const good_msg = show_good_message()
    return {...good_msg, ...todo_item};
}