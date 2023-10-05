import { useForm, SubmitHandler } from "react-hook-form"
import axios from 'axios';
import './LoginComp..scss'
import { useState } from "react";
import MessageComp, {MessageCompProps} from "../Message/MessageComp";

const backEndPort = import.meta.env.VITE_BACKEND_PORT;

type LoginForRHF = {
    username: string
    password: string
}

type RegisterRHF = {
    name: string
    username: string
    email: string
    gender: 'male'|'female'
    password: string
    confirm_password: string
}

export default function LoginComp() {
    const [isLoading2, setIsLoading2] = useState<boolean>(false)
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [alertMsg, setAlertMsg] = useState<MessageCompProps>({msg_type:'', msg_dts:''})

    const { register: registerLogin, handleSubmit: handleLogin, formState: {errors:loginError} } = useForm<LoginForRHF>()
    const { register: registerReg, handleSubmit: handleRegister,setValue: regSetValue, formState: {errors:regError} } = useForm<RegisterRHF>()

    const submitLogin: SubmitHandler<LoginForRHF> = (data) => {
        console.log(data, 'Login lets do dis!!!')
    }

    const submitRegistration: SubmitHandler<RegisterRHF> = (data) => {
        // console.log(data, obj, 'Register lets do dis!!!')

        setIsLoading2(true) // disables the submit button

        axios.post(`${backEndPort}/users/new_user`, data, {headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            console.log(res)
            setShowAlert(true)
            setAlertMsg({'msg_type':res.data.msg, 'msg_dts':res.data.cause})
            // if (res.data.msg === 'okay') {

            // } else {

            // }
            setIsLoading2(false)
        })
        .catch((err) => {
            console.log(err)
            // console.error('Error:', error);
            setIsLoading2(false)
        });

        // clears all of the input field
        Object.keys(data).forEach((item) => {
            // console.log(item)
            regSetValue(item as "username" | "password" | "name" | "email" | "gender" | "confirm_password", "")
        })
    }

    return (
        <div className="block relative my-14 padding-x">
            {showAlert && <MessageComp {...alertMsg} closeAlert={setShowAlert} />}

            <div className="pb-10 text-4xl">Hi there! Welcome to TodoM</div>
            <div className="ovrCover flex">
                <div className="w-1/2">
                    <div className="titleUp">Login</div>
                    <form onSubmit={handleLogin(submitLogin)}>
                        <div className="inputCover">
                            <div className="inpTitle font-bold">Username or Email</div>
                            <div className="inpInput">
                                <input type="text" {...registerLogin("username", { required: true })} />
                                {loginError.username && <p>This field is required!!!</p>}
                            </div>
                        </div>
                        <div className="inputCover">
                            <div className="inpTitle">Password</div>
                            <div className="inpInput">
                                <input type="password" {...registerLogin("password", { required: true })} />
                                {loginError.password && <p>This field is required!!!</p>}
                            </div>
                        </div>
                        <div className="btnCvr"><button type="submit">Login</button></div>
                    </form>
                </div>
                <div className="w-1/2">
                    <div className="titleUp">Register</div>
                    <form onSubmit={handleRegister(submitRegistration)}>
                        <div className="inputCover">
                            <div className="inpTitle font-bold">name</div>
                            <div className="inpInput">
                                <input type="text" {...registerReg("name", { required: false })} />
                                {regError.name && <p>This field is required!!!</p>}
                            </div>
                        </div>
                        <div className="inputCover">
                            <div className="inpTitle font-bold">username</div>
                            <div className="inpInput">
                                <input type="text" {...registerReg("username", { required: false })} />
                                {regError.username && <p>This field is required!!!</p>}
                            </div>
                        </div>
                        <div className="inputCover">
                            <div className="inpTitle font-bold">email</div>
                            <div className="inpInput">
                                <input type="text" {...registerReg("email", { required: false })} />
                                {regError.email && <p>This field is required!!!</p>}
                            </div>
                        </div>
                        <div className="inputCover">
                            <div className="inpTitle font-bold">gender</div>
                            <div className="inpInput">
                                <select {...registerReg("gender", { required: false })}>
                                    <option value="">Select your gender</option>
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                </select>
                                {regError.gender && <p>This field is required!!!</p>}
                            </div>
                        </div>
                        <div className="inputCover">
                            <div className="inpTitle">Password</div>
                            <div className="inpInput">
                                <input type="password" {...registerReg("password", { required: false })} />
                                {regError.password && <p>This field is required!!!</p>}
                            </div>
                        </div>
                        <div className="inputCover">
                            <div className="inpTitle">Re-enter Password</div>
                            <div className="inpInput">
                                <input type="password" {...registerReg("confirm_password", { required: false })} />
                                {regError.confirm_password && <p>This field is required!!!</p>}
                            </div>
                        </div>
                        <div className="btnCvr">
                            {!isLoading2 && <button type="submit">Register</button>}
                            {isLoading2 && <p>Loading...</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}