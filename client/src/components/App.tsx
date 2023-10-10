// import HomeComp from "./components/HomeComp"
import { useAppSelector } from "../redux/hook"

import Header from "./Header/Header"

export default function App() {
    const userDts = useAppSelector((state) => state.user)

    console.log(userDts)

    return (
        <div className="">
            <Header must_be_logged_in={true} />
            <div className="">
                
            </div>
            <div className=""></div>
        </div>
    )
}