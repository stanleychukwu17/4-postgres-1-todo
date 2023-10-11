import { useCallback, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../redux/hook"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { updateUser } from "../../redux/userSlice"

const backEndPort = import.meta.env.VITE_BACKEND_PORT
const config = {
    headers: {'Content-Type': 'application/json'},
};
console.log(backEndPort)

export default function LogOutComp() {
    const userInfo = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const log_this_user_out = useCallback(() => {
        axios.post(`${backEndPort}/users/logout`, userInfo, config)
        .then((res) => {
            if (res.data.msg === 'okay') {
                localStorage.removeItem('userDts') // delete the localStorage cached user info
                dispatch(updateUser({loggedIn:'no', name:'', session_fid:0})) // delete the redux item
                navigate('/') // navigate back to home page
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [])

    useEffect(() => {
        if (userInfo.loggedIn === 'yes') {
            // console.log(userInfo, typeof log_this_user_out)
            log_this_user_out()
        } else {
            // send them man back to the home page
            navigate('/')
        }
    }, [])

    return (
        <div>

        </div>
    )
}