import { Link } from "react-router-dom"

export default function Header() {
    return (
        <div>
            <div className="">TODO</div>
            <div className="">
                <div className="">
                    <div className=""></div>
                    <div className=""></div>
                </div>
            </div>
            <div className="">
                <div className="">
                    <Link to="/register">Register</Link>
                </div>
                <div className="">
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    )
}