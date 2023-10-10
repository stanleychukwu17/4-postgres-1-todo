import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { Provider } from 'react-redux';

//--start-- importing of components
import App from './components/App.tsx'
import ErrorComp from './components/PageNotFound/PageNotFound.tsx'
import LoginComp from "./components/LoginComp/LoginComp.tsx"
import './index.css'
//--end--

//--start-- importing of others
import store from './redux/reduxStore.ts';
//--end--


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
    {
        path: "/register",
        element: <LoginComp />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <main className="_d5H min-h-screen bg-[#fffefb] text-[#3c2f41]">
                <RouterProvider router={router} />
            </main>
        </Provider>
    </React.StrictMode>,
)