import { useForm, SubmitHandler } from "react-hook-form"
import './LoginComp..scss'

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
    const { register: registerLogin, handleSubmit: handleLogin, formState: {errors:loginError} } = useForm<LoginForRHF>()
    const { register: registerReg, handleSubmit: handleRegister, formState: {errors:regError} } = useForm<RegisterRHF>()

    const submitLogin: SubmitHandler<LoginForRHF> = (data) => {
        console.log(data, 'Login lets do dis!!!')
    }

    const submitRegistration: SubmitHandler<RegisterRHF> = (data) => {
        console.log(data, 'Register lets do dis!!!')
    }

    return (
        <div className="block relative my-14 padding-x">
            <div className="pb-10 text-4xl">Hi there! Welcome to Todo</div>
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
                                <input type="text" {...registerReg("name", { required: true })} />
                                {regError.name && <p>This field is required!!!</p>}
                            </div>
                        </div>
                        <div className="inputCover">
                            <div className="inpTitle font-bold">username</div>
                            <div className="inpInput">
                                <input type="text" {...registerReg("username", { required: true })} />
                                {regError.username && <p>This field is required!!!</p>}
                            </div>
                        </div>
                        <div className="inputCover">
                            <div className="inpTitle font-bold">email</div>
                            <div className="inpInput">
                                <input type="text" {...registerReg("email", { required: true })} />
                                {regError.email && <p>This field is required!!!</p>}
                            </div>
                        </div>
                        <div className="inputCover">
                            <div className="inpTitle font-bold">gender</div>
                            <div className="inpInput">
                                <select {...registerReg("gender", { required: true })}>
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
                                <input type="password" {...registerReg("password", { required: true })} />
                                {regError.password && <p>This field is required!!!</p>}
                            </div>
                        </div>
                        <div className="inputCover">
                            <div className="inpTitle">Re-enter Password</div>
                            <div className="inpInput">
                                <input type="password" {...registerReg("confirm_password", { required: true })} />
                                {regError.confirm_password && <p>This field is required!!!</p>}
                            </div>
                        </div>
                        <div className="btnCvr"><button type="submit">Register</button></div>
                    </form>
                </div>
            </div>
        </div>
    )
}