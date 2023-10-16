import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import {FiChevronsDown} from 'react-icons/fi'
import { useAppSelector } from '../../redux/hook';

//--START-- importing of components
import Header from "../Header/Header";
import { EachTodoItemComp, InputComponent } from './ProfileMini';

//--START-- importing of stylesheets
import './Profile.scss'

//--START-- importing of types
import {todoItemsProps} from './ProfileMini'

// gets the backEnd url from our .env file
const backEndPort = import.meta.env.VITE_BACKEND_PORT;





export default function ProfileComp() {
    const userInfo = useAppSelector(state => state.user)
    const [items, setItems] = useState<todoItemsProps[]|null>(null)
    const [reloadItems, setReloadItems] = useState<boolean>(true)

    const fetch_all_the_items_in_this_user_todo_list = useCallback(() => {
        axios.post(`${backEndPort}/todo/all_my_items`, userInfo, {headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            console.log(res.data)

            if (res.data.msg === 'okay') {
                setItems(res.data.items)
                setReloadItems(false)
            }
        })
        .catch()
    }, [userInfo])

    useEffect(() => {
        if (reloadItems) {
            fetch_all_the_items_in_this_user_todo_list()
        }
    }, [reloadItems])

    return (
        <div className="profile_Cvr1">
            <Header />
            <div className="padding-x flex">
                <div className="w-[65%]">
                    {/* THE INPUT COMPONENT FOR ADDING A NEW ITEM TO THE TODO LIST */}
                    <InputComponent />

                    <div className="">
                        <div className="p-6 bg-[#f5f6fa] font-semibold"><h2>Get busy</h2></div>

                        {/* EACH OF THE TODO ITEMS */}
                        <div className="">
                            {items?.map((ech, index) => <EachTodoItemComp key={`todoItem-${index}`} {...ech} setReloadItems={setReloadItems} /> )}
                        </div>
                    </div>
                </div>
                <div className="w-[35%] flex justify-center text-center">
                    <div className="mt-10">
                        <div className="w-[230px] h-[230px] bg-[#f5f6fa] rounded-full"></div>
                        <div className="py-5 pb-3 text-base">Stanley Chukwu</div>
                        <div className="flex justify-center text-sm font-extrabold">
                            <FiChevronsDown />
                        </div>
                        <div className="py-3 text-sm">15 items todo</div>
                    </div>
                </div>
            </div>
        </div>
    )
}