// import HomeComp from "./components/HomeComp"
import { useAppSelector } from "../redux/hook"

export default function App() {
    const userDts = useAppSelector((state) => state.user)

    console.log(userDts)

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <a href={`/contacts/1`}>Your Name</a>
                    </li>
                    <li>
                        <a href={`/contacts/2`}>Your Friend</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}