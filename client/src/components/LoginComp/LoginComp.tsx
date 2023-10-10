import {useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './LoginComp..scss'
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
    const navigate = useNavigate();
    const [isLoading1, setIsLoading1] = useState<boolean>(false)
    const [isLoading2, setIsLoading2] = useState<boolean>(false)
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [alertMsg, setAlertMsg] = useState<MessageCompProps>({msg_type:'', msg_dts:''})

    const { register: registerLogin, handleSubmit: handleLogin, setValue: loginSetValue, formState: {errors:loginError} } = useForm<LoginForRHF>()
    const { register: registerReg, handleSubmit: handleRegister, setValue: regSetValue, formState: {errors:regError} } = useForm<RegisterRHF>()

    const submitLogin: SubmitHandler<LoginForRHF> = (data) => {
        axios.post(`${backEndPort}/users/login`, data, {headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            console.log(res.data)

            if(res.data.msg === 'okay') {
                // navigate('/')

                // clears all of the input field for login
                Object.keys(data).forEach((item) => {
                    loginSetValue(item as "username" | "password", "") // RHF hook used here
                })
            } else {
                setShowAlert(true)
                setAlertMsg({'msg_type':res.data.msg, 'msg_dts':res.data.cause})
            }
            setIsLoading1(false)
        })
        .catch((err) => {
            setShowAlert(true)
            setAlertMsg({'msg_type':'bad', 'msg_dts':err.message+', please contact the customer support and report this issue'})
            setIsLoading1(false)
        });
    }

    const submitRegistration: SubmitHandler<RegisterRHF> = (data) => {
        setIsLoading2(true)

        axios.post(`${backEndPort}/users/new_user`, data, {headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            setShowAlert(true)
            setAlertMsg({'msg_type':res.data.msg, 'msg_dts':res.data.cause})
            setIsLoading2(false)

            // clears all of the input field for registering
            Object.keys(data).forEach((item) => {
                regSetValue(item as "username" | "password" | "name" | "email" | "gender" | "confirm_password", "")
            })
        })
        .catch((err) => {
            setShowAlert(true)
            setAlertMsg({'msg_type':'bad', 'msg_dts':err.message+', please contact the customer support and report this issue'})
            setIsLoading2(false)
        });
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
                        <div className="btnCvr">
                            {!isLoading1 && <button type="submit">Login</button>}
                            {isLoading1 && <p>Loading...</p>}
                        </div>
                    </form>
                </div>
                <div className="w-1/2">
                    <div className="titleUp">Register</div>
                    <form onSubmit={handleRegister(submitRegistration)}>
                        <div className="inputCover">
                            <div className="inpTitle font-bold">name</div>
                            <div className="inpInput">
                                <input type="text" {...registerReg("name", {required: true})} />
                                {regError.name && <p>This field is required!!!</p>}
                            </div>
                        </div>
                        <div className="inputCover">
                            <div className="inpTitle font-bold">username</div>
                            <div className="inpInput">
                                <input type="text" {...registerReg("username", {required: true})} />
                                {regError.username && <p>This field is required!!!</p>}
                            </div>
                        </div>
                        <div className="inputCover">
                            <div className="inpTitle font-bold">email</div>
                            <div className="inpInput">
                                <input type="text" {...registerReg("email", {required: true})} />
                                {regError.email && <p>This field is required!!!</p>}
                            </div>
                        </div>
                        <div className="inputCover">
                            <div className="inpTitle font-bold">gender</div>
                            <div className="inpInput">
                                <select {...registerReg("gender", {required: true})}>
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
                                <input type="password" {...registerReg("password", {required: true})} />
                                {regError.password && <p>This field is required!!!</p>}
                            </div>
                        </div>
                        <div className="inputCover">
                            <div className="inpTitle">Re-enter Password</div>
                            <div className="inpInput">
                                <input type="password" {...registerReg("confirm_password", {required: true})} />
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