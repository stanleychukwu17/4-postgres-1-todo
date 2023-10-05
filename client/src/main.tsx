import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import App from './App.tsx'
import ErrorComp from './components/PageNotFound.tsx'
import LoginComp from "./components/LoginComp/LoginComp.tsx"
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
        <main className="_d5H min-h-screen bg-[#fffefb] text-[#3c2f41] padding-x">
            <RouterProvider router={router} />
        </main>
    </React.StrictMode>,
)