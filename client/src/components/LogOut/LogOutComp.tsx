import { useCallback, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../redux/hook"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { updateUser } from "../../redux/userSlice"

const backEndPort = import.meta.env.VITE_BACKEND_PORT
const config = {
    headers: {'Content-Type': 'application/json'},
};

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

                // setTimeout allows redux to finish updating before we redirect to the homePage
                setTimeout(() => { navigate('/') }, 500)
            }
        })
        .catch((error) => {
            console.error('Error:', error.message);
            alert(error.message)
        });
    }, [dispatch, navigate, userInfo])

    // checks to make sure that the user is logged in
    useEffect(() => {
        if (userInfo.loggedIn === 'yes') {
            log_this_user_out()
        } else {
            navigate('/') // send them man back to the home page
        }
    }, [log_this_user_out, userInfo.loggedIn, navigate])

    return (
        <div> </div>
    )
}