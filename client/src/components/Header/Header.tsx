import axios from "axios";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom"

import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { updateUser, userDetailsType } from "../../redux/userSlice";

import LoggedInCard from "./LoggedInCard";
import LoggedOutCard from "./LoggedOutCard";
const backEndPort = import.meta.env.VITE_BACKEND_PORT


//--start-- checks to see if there are any stored information about the user in the user's localStorage space
let userDts: userDetailsType = {loggedIn: 'no'}
const cached_user_dts  = localStorage.getItem('userDts') // the user details stored to the localStorage whenever a user logs in

if (cached_user_dts) {
    // const cached_user_parsed = JSON.parse(cached_user_dts) as unknown as userDetailsType
    const cached_user_parsed = JSON.parse(cached_user_dts)

    userDts.loggedIn = 'yes'
    userDts = {...userDts, ...cached_user_parsed}
}
//--end--

//--start-- validates the accessToken and Refresh token every 24_hour
function run_access_token_health_check () {
    axios.post(`${backEndPort}/healthCheck/accessToken`, userDts, {headers: {'Content-Type': 'application/json'}})
    .then(re => {
        // update the lastTime checked to be the current time
        localStorage.setItem('last_24hr_check', `${new Date()}`)

        // the below means the accessToken has expired and the refreshToken has also expired
        if (re.data.msg === 'bad' && re.data.action === 'logout') {
            location.href = '/logout'
            return true;
        }

        // the below means the accessToken has expired and so a new accessToken was generated
        if (re.data.msg === 'okay' && re.data.new_token === 'yes') {
            localStorage.setItem('userDts', JSON.stringify({...userDts, accessToken:re.data.dts.newAccessToken}));
            location.reload()
        }
    })
    .catch(err => {
        console.log(err)
    })
}

const last_24hr_check = localStorage.getItem('last_24hr_check')
if (last_24hr_check) {
    const storedDate = new Date(last_24hr_check).getTime() // .getTime() returns the number of milliseconds
    const currentDate = new Date().getTime() // .getTime() returns the number of milliseconds
    const hourDiff = (currentDate - storedDate) / (1000 * 60 * 60); // converts the difference to hours.. since i want to know if the last check has been older than an 24hours

    if (hourDiff >= 24 && userDts.loggedIn === 'yes') {
        console.log('time for use to check for a new accessToken', hourDiff)
        run_access_token_health_check()
    }
} else {
    const current_time = new Date()
    localStorage.setItem('last_24hr_check', `${current_time}`)
}
//--end--



type headerProps = {
    must_be_logged_in?: boolean
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