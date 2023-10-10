import { useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom"

const user_dts = {loggedIn: 'no'}
const cached_user_dts = localStorage.getItem('user');
if (cached_user_dts) {
    console.log('no user here!')
    user_dts.loggedIn = 'yes'
}
console.log(cached_user_dts)


type headerProps = {
    must_be_logged_in: boolean
}
export default function Header(props: headerProps) {
    const navigate = useNavigate()

    useLayoutEffect(() => {
        if (props.must_be_logged_in === true) {
            navigate('/login')
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
                    <div className=""></div>
                </div>
            </div>
            <div className="flex space-x-8 font-semibold text-[16.5px]">
                <div className="">
                    <Link to="/register">Register</Link>
                </div>
                <div className="">
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </header>
    )
}