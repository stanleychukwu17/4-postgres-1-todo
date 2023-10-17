import axios from 'axios';
import { useCallback, useState, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import {useForm, SubmitHandler} from "react-hook-form"
import { useAppSelector } from '../../redux/hook';
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
    details: string,
    date_added: string
} & {
    removeFunction: (id:number) => void
}
export const EachTodoItemComp = ({id, details, removeFunction}: todoItemsProps) => {
    const [note, setNote] = useState(details)
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const boxRef = useRef<HTMLDivElement>({} as HTMLDivElement)
    const spanControl = useAnimationControls()
    const userInfo = useAppSelector(state => state.user)

    // marking of the item to completed
    const updateThisItemToCompleted = () => {
        removeFunction(id) // removes the item from the todo items

        axios.post(`${backEndPort}/todo/completed`, {...userInfo, id}, {headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            setShowEdit(false);
            if (res.data.msg != 'okay') alert(res.data.cause);
        })
    }

    // updates the details of an item in the list
    const updateTheDetailsOfThisItem = useCallback((newDts: string) => {
        axios.put(`${backEndPort}/todo/update_item`, {...userInfo, id, newDts}, {headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            if(res.data.msg != 'okay') {
                alert(res.data.cause)
            }
        })
    }, [userInfo, id])

    // updates 
    const deleteThisItemFromThisList = useCallback(() => {
        removeFunction(id) // removes the item from the todo items

        axios.post(`${backEndPort}/todo/delete_item`, {...userInfo, id}, {headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            console.log(res.data.cause)
            if(res.data.msg != 'okay') {
                alert(res.data.cause)
            }
        })
    }, [userInfo, id])


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
        <motion.div className="todoEch flex py-5" ref={boxRef}>
            <div className="flex space-x-3 items-center mr-4 w-[120px]">
                <div className="icons" onClick={() => { setShowEdit(true) }}><FaPencilAlt /></div>
                <div className="icons" onClick={() => { deleteThisItemFromThisList() }}><BsTrash /></div>
                <motion.div className="icons iconsNoFlex" onClick={updateThisItemToCompleted} onMouseEnter={framerStartCheckAnimation} onMouseLeave={framerEndCheckAnimation}>
                    <motion.span className='checkEmpty' variants={spanVariant} animate={spanControl}><BsCheckCircle /></motion.span>
                    <motion.span className='checkEmpty' variants={spanVariant} animate={spanControl}><BsFillCheckCircleFill /></motion.span>
                </motion.div>
            </div>
            <div className="">
                {showEdit === false && <div>{note}</div>}
                {showEdit &&
                    <div className="">
                        <input
                            type="text" value={note} onChange={(e) => { setNote(e.target.value) }}
                            className='border py-3 px-5 w-[350px] rounded-md text-sm'
                        />
                        <button className='mx-5 text-xs font-semibold text-[#00a8ff] hover:underline' onClick={() => { updateTheDetailsOfThisItem(note) }}>Save update</button>
                        <button className='mx-5 text-xs font-semibold text-[#df0e3a] hover:underline' onClick={() => { setShowEdit(false) }}>cancel</button>
                    </div>
                }
                <div className="text-xs font-semibold text-[#a4b0be] mt-2">Added 20mins ago</div>
            </div>
        </motion.div>
    )
}