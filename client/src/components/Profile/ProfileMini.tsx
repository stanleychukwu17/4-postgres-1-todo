import axios from 'axios';
import {BsFillCheckCircleFill} from 'react-icons/bs'
import {useForm, SubmitHandler} from "react-hook-form"
import { useAppSelector } from '../../redux/hook';

// gets the backEnd url from our .env file
const backEndPort = import.meta.env.VITE_BACKEND_PORT;

type todo_item_input = {
    details: string
}

export const InputComponent = () => {
    const userInfo = useAppSelector(state => state.user)

    const { handleSubmit, register: registerTodo, setValue: todoSetValue, formState: {errors:todoError} } = useForm<todo_item_input>()

    const add_item_to_todo_list: SubmitHandler<todo_item_input> = (data) => {
        const toSend = {...userInfo, ...data}
        axios.post(`${backEndPort}/todo/new_todo`, toSend, {headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            // setShowAlert(true)
            // setAlertMsg({'msg_type':'bad', 'msg_dts':err.message+', please contact the customer support and report this issue'})
            // setIsLoading1(false)
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
                        <button type="submit" className='text-4xl text-[#00a8ff] cursor-pointer'>
                            <BsFillCheckCircleFill />
                        </button>
                </div>
            </form>
            <div className="">
                {todoError.details && <p className='text-sm font-semibold text-[#df0e3a] ml-4'>Please fill in all the fields!!!</p>}
            </div>
        </div>
    )
}