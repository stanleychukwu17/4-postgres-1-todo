import './LoginComp..scss'

export default function LoginComp() {
    return (
        <div className="block relative my-14 padding-x">
            <div className="pb-10 text-4xl">Hi there! Welcome to Todo</div>
            <div className="ovrCover flex">
                <div className="w-1/2">
                    <div className="titleUp">Login</div>
                    <form  className="">
                        <div className="inputCover">
                            <div className="inpTitle font-bold">Username or Email</div>
                            <div className="inpInput">
                                <input type="text" />
                            </div>
                        </div>
                        <div className="inputCover">
                            <div className="inpTitle">Password</div>
                            <div className="inpInput">
                                <input type="password" />
                            </div>
                        </div>
                        <div className="btnCvr"><button>Login</button></div>
                    </form>
                </div>
                <div className="w-1/2">
                    <div className="titleUp">Register</div>
                    <form className="">
                        <div className="inputCover">
                            <div className="inpTitle font-bold">name</div>
                            <div className="inpInput"><input type="text" /></div>
                        </div>
                        <div className="inputCover">
                            <div className="inpTitle font-bold">username</div>
                            <div className="inpInput"><input type="text" /></div>
                        </div>
                        <div className="inputCover">
                            <div className="inpTitle font-bold">email</div>
                            <div className="inpInput"><input type="text" /></div>
                        </div>
                        <div className="inputCover">
                            <div className="inpTitle font-bold">gender</div>
                            <div className="inpInput"><input type="text" /></div>
                        </div>
                        <div className="inputCover">
                            <div className="inpTitle">Password</div>
                            <div className="inpInput"><input type="password" /></div>
                        </div>
                        <div className="inputCover">
                            <div className="inpTitle">Re-enter Password</div>
                            <div className="inpInput"><input type="password" /></div>
                        </div>
                        <div className="btnCvr"><button>Register</button></div>
                    </form>
                </div>
            </div>
        </div>
    )
}