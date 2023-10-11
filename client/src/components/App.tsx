import { useAppSelector } from "../redux/hook"
import HomeComp from "./Home/HomeComp"

import Header from "./Header/Header"
import ProfileComp from "./Profile/ProfileComp"

export default function App() {
    const loggedIn = useAppSelector(state => state.user.loggedIn)

    return (
        <div className="">
            <Header must_be_logged_in={true} />
            <div className="">
                {loggedIn === 'no' && <HomeComp />}
                {loggedIn === 'yes' && <ProfileComp />}
            </div>
        </div>
    )
}