// import { Routes, Route } from "react-router-dom"
// import HomeComp from "./components/HomeComp"
// import LoginComp from "./components/LoginComp"


export default function App() {
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