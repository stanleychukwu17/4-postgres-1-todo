import axios from 'axios';
import { useCallback, useState } from 'react';
import {useForm, SubmitHandler} from "react-hook-form"
import { useAppSelector } from '../../redux/hook';
import { motion, useAnimationControls } from 'framer-motion';
import {BsFillCheckCircleFill, BsTrash, BsCheckCircle} from 'react-icons/bs'
import {FaPencilAlt} from 'react-icons/fa'

import MessageComp, {MessageCompProps} from "../Message/MessageComp";

import { spanVariant } from './profile.variants';


// gets the backEnd url from our .env file
const backEndPort = import.meta.env.VITE_BACKEND_PORT;




type todo_item_input = {
    details: string
}

// the input component - for adding of items to the todoList
export const InputComponent = () => {
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [alertMsg, setAlertMsg] = useState<MessageCompProps>({msg_type:'', msg_dts:''})
    const userInfo = useAppSelector(state => state.user)

    const { handleSubmit, register: registerTodo, setValue: todoSetValue, formState: {errors:todoError} } = useForm<todo_item_input>()

    const add_item_to_todo_list: SubmitHandler<todo_item_input> = (data) => {
        // attach the accessToken, session_fid, refreshToken to the request... they're important for validation sake
        const toSend = {...userInfo, ...data}

        axios.post(`${backEndPort}/todo/new_todo`, toSend, {headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            if(res.data.msg === 'okay') {
                // dispatch(updateUser({loggedIn: 'yes', ...res.data}))

                // clears all of the input field for login
                todoSetValue("details", "") // RHF hook used here

            } else {
                setShowAlert(true)
                setAlertMsg({'msg_type':res.data.msg, 'msg_dts':res.data.cause})
            }
            // setIsLoading1(false)
        })
        .catch((err) => {
            setShowAlert(true)
            setAlertMsg({'msg_type':'bad', 'msg_dts':err.message+', please contact the customer support and report this issue'})
        });
    }

    return (
        <div className="my-10">
            <div className="text-2xl"><h2>Add items to your todo list</h2></div>
            <form onSubmit={handleSubmit(add_item_to_todo_list)}>
                <div className="py-4 flex">
                    <input
                        className="border border-[#f1f2f6] bg-[#fff] py-4 px-8 mr-5 w-[400px] rounded-full shadow-inner"
                        type="text" placeholder="start adding items here..."
                        {...registerTodo("details", { required: true })}
                    />
                    <button type="submit" className='text-4xl text-[#00a8ff] cursor-pointer outline-none'>
                        <BsFillCheckCircleFill />
                    </button>
                </div>
            </form>
            <div className="">
                {todoError.details && <p className='text-sm font-semibold text-[#df0e3a] ml-4'>Please fill in all the fields!!!</p>}
            </div>
            {showAlert && <MessageComp {...alertMsg} closeAlert={setShowAlert} />}
        </div>
    )
}



export type todoItemsProps = {
    id: number,
    fid: number,
    details: string,
    date_added: string
}
export const EachTodoItemComp = ({id, fid, details}: todoItemsProps) => {
    const spanControl = useAnimationControls()
    const userInfo = useAppSelector(state => state.user)
    const toSend = {...userInfo, id, fid}

    // marking of the item to completed
    const updateThisItemToCompleted = useCallback(() => {
        axios.post(`${backEndPort}/todo/completed`, toSend, {headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            console.log(res.data)
            if(res.data.msg === 'okay') {
                // dispatch(updateUser({loggedIn: 'yes', ...res.data}))

                // clears all of the input field for login

            } else {
                alert(res.data.cause)
            }
        })
    }, [])

    // the two functions below are for animating the icon that allows user to mark the item as completed
    const framerStartCheckAnimation = useCallback(() => {
        spanControl.stop()
        spanControl.start('animate')
    }, [spanControl])
    const framerEndCheckAnimation = useCallback(() => {
        spanControl.stop()
        spanControl.start('initial')
    }, [spanControl])

    return (
        <div className="todoEch flex py-5">
            <div className="flex space-x-3 items-center mr-4 w-[120px]">
                <div className="icons"><FaPencilAlt /></div>
                <div className="icons"><BsTrash /></div>
                <motion.div className="icons iconsNoFlex" onClick={updateThisItemToCompleted} onMouseEnter={framerStartCheckAnimation} onMouseLeave={framerEndCheckAnimation}>
                    <motion.span className='checkEmpty' variants={spanVariant} animate={spanControl}><BsCheckCircle /></motion.span>
                    <motion.span className='checkEmpty' variants={spanVariant} animate={spanControl}><BsFillCheckCircleFill /></motion.span>
                </motion.div>
            </div>
            <div className="">
                <div className="">{details}</div>
                <div className="text-xs font-semibold text-[#a4b0be] mt-2">Added 20mins ago</div>
            </div>
        </div>
    )
}