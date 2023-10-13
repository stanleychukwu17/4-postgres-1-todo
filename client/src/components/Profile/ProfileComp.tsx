import {BsFillCheckCircleFill, BsTrash} from 'react-icons/bs'
import {FaPencilAlt} from 'react-icons/fa'

import Header from "../Header/Header";

export default function ProfileComp() {
    return (
        <div className="profile_Cvr1">
            <Header />
            <div className="padding-x flex">
                <div className="">
                    <div className="my-10">
                        <div className="text-2xl"><h2>Add items to your todo list</h2></div>
                        <div className="py-4 flex">
                            <input
                                type="text" placeholder="start adding items here..."
                                className="border border-[#f1f2f6] bg-[#fff] py-4 px-8 mr-5 w-[400px] rounded-full shadow-inner"
                            />
                            <button className='text-4xl text-[#00a8ff] cursor-pointer'>
                                <BsFillCheckCircleFill />
                            </button>
                        </div>
                    </div>
                    <div className="">
                        <div className=""><h2>Get busy</h2></div>
                        <div className="">
                            <div className="flex">
                                <div className="relative">
                                    <div className=""><FaPencilAlt /></div>
                                    <div className=""><BsTrash /></div>
                                </div>
                                <div className="">
                                    <div className="">Take out the trash and call Mr ade to come and fix all the fans down stairs tomorrow morning</div>
                                    <div className="">added 20mins ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=""></div>
            </div>
        </div>
    )
}