import { useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom"

import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { updateUser, userDetailsType } from "../../redux/userSlice";


// let the coding begin
let userDts: userDetailsType = {loggedIn: 'no'}
const cached_user_dts  = localStorage.getItem('userDts')

if (cached_user_dts) {
    // const cached_user_parsed = JSON.parse(cached_user_dts) as unknown as userDetailsType
    const cached_user_parsed = JSON.parse(cached_user_dts)

    userDts.loggedIn = 'yes'
    userDts = {...userDts, ...cached_user_parsed}
}



const Reg_and_Login = () => {
    return (
        <div className="flex space-x-8 font-semibold text-[16.5px]">
            <div className="">
                <Link to="/register">Register</Link>
            </div>
            <div className="">
                <Link to="/login">Login</Link>
            </div>
        </div>
    )
}

const User_mini_profile = () => {
    return (
        <div className="">
            <div className=""></div>
            <div className="">
                <div className="">Stanley Edward</div>
                <div className=""></div>
            </div>
        </div>
    )
}

type headerProps = {
    must_be_logged_in: boolean
}
export default function Header(props: headerProps) {
    const userInfo = useAppSelector(state => state.user)
    const reduxDispatch = useAppDispatch()
    const navigate = useNavigate()

    console.log(userInfo, 'i1', userDts)
    useLayoutEffect(() => {
        if (userDts.loggedIn === 'yes' && userInfo.loggedIn === 'no') {
            reduxDispatch(updateUser(userDts))
        }

        if (props.must_be_logged_in === true) {
            // navigate('/login')
        }
    }, [navigate, props.must_be_logged_in])


    return (
        <header className="flex justify-between items-center py-5 px-5 bg-[#e9f2ff]">
            <div className="text-2xl font-bold">TODO</div>
            <div className="">
                <div className="">
                    <div className="">
                        <input
                            type="text"
                            className="px-3 py-4 rounded shadow-inner border w-[500px]"
                            placeholder="Search items in TODO"
                        />
                    </div>
                </div>
            </div>
            
            {userInfo.loggedIn === 'no' && <Reg_and_Login />}
            {userInfo.loggedIn === 'yes' && <User_mini_profile />}
            
        </header>
    )
}