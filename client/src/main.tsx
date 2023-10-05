import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import App from './App.tsx'
import ErrorComp from './components/ErrorComp.tsx'
import LoginComp from "./components/LoginComp"
import './index.css'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorComp />,
    },
    {
        path: "/login",
        element: <LoginComp />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <main className="bg-[#fffefb] h-screen relative text-[#3c2f41]">
            <RouterProvider router={router} />
        </main>
    </React.StrictMode>,
)