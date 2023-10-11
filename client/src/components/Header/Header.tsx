import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom"

import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { updateUser, userDetailsType } from "../../redux/userSlice";

import LoggedInCard from "./LoggedInCard";
import LoggedOutCard from "./LoggedOutCard";


// let the coding begin
let userDts: userDetailsType = {loggedIn: 'no'}
const cached_user_dts  = localStorage.getItem('userDts')

if (cached_user_dts) {
    // const cached_user_parsed = JSON.parse(cached_user_dts) as unknown as userDetailsType
    const cached_user_parsed = JSON.parse(cached_user_dts)

    userDts.loggedIn = 'yes'
    userDts = {...userDts, ...cached_user_parsed}
}



type headerProps = {
    must_be_logged_in: boolean
}
export default function Header(props: headerProps) {
    const userInfo = useAppSelector(state => state.user)
    const reduxDispatch = useAppDispatch()
    const navigate = useNavigate()

    // console.log(userInfo, 'i1', userDts)
    useLayoutEffect(() => {
        if (userDts.loggedIn === 'yes' && userInfo.loggedIn === 'no') {
            reduxDispatch(updateUser(userDts))
        }

        if (props.must_be_logged_in === true) {
            // navigate('/login')
        }
    }, [navigate, props.must_be_logged_in, reduxDispatch, userInfo.loggedIn])


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
            
            {userInfo.loggedIn === 'no' && <LoggedOutCard />}
            {userInfo.loggedIn === 'yes' && <LoggedInCard />}
            
        </header>
    )
}