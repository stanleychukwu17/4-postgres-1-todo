import { Link } from "react-router-dom"

export default function Header() {
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