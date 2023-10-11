import { Link } from "react-router-dom"

export default function LoggedOutCard() {
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