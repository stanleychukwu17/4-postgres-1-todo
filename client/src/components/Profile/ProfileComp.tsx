import {BsTrash} from 'react-icons/bs'
import {FaPencilAlt} from 'react-icons/fa'
import {FiChevronsDown} from 'react-icons/fi'

import Header from "../Header/Header";
import { InputComponent } from './ProfileMini';
import './Profile.scss'

export default function ProfileComp() {
    return (
        <div className="profile_Cvr1">
            <Header />
            <div className="padding-x flex">
                <div className="w-[60%]">
                    <InputComponent />
                    <div className="">
                        <div className="p-6 bg-[#f5f6fa] font-semibold"><h2>Get busy</h2></div>
                        <div className="">
                            <div className="todoEch flex py-5">
                                <div className="flex space-x-3 items-center mr-4 w-[80px]">
                                    <div className="icons"><FaPencilAlt /></div>
                                    <div className="icons"><BsTrash /></div>
                                </div>
                                <div className="">
                                    <div className="">Take out the trash and call Mr ade to come and fix all the fans down stairs tomorrow morning, Take out the trash and call Mr ade to come and fix all the fans down stairs tomorrow morning</div>
                                    <div className="text-xs font-semibold text-[#a4b0be] mt-2">Added 20mins ago</div>
                                </div>
                            </div>

                            <div className="todoEch flex py-5">
                                <div className="flex space-x-3 items-center mr-4 w-[80px]">
                                    <div className="icons"><FaPencilAlt /></div>
                                    <div className="icons"><BsTrash /></div>
                                </div>
                                <div className="">
                                    <div className="">Take out the trash and call Mr ade to come and fix all the fans down stairs tomorrow morning</div>
                                    <div className="text-xs font-semibold text-[#a4b0be] mt-2">Added 20mins ago</div>
                                </div>
                            </div>

                            <div className="todoEch flex py-5">
                                <div className="flex space-x-3 items-center mr-4 w-[80px]">
                                    <div className="icons"><FaPencilAlt /></div>
                                    <div className="icons"><BsTrash /></div>
                                </div>
                                <div className="">
                                    <div className="">Take out the trash and call Mr ade to come and fix all the fans down stairs tomorrow morning</div>
                                    <div className="text-xs font-semibold text-[#a4b0be] mt-2">Added 20mins ago</div>
                                </div>
                            </div>

                            <div className="todoEch flex py-5">
                                <div className="flex space-x-3 items-center mr-4 w-[80px]">
                                    <div className="icons"><FaPencilAlt /></div>
                                    <div className="icons"><BsTrash /></div>
                                </div>
                                <div className="">
                                    <div className="">Take out the trash and call Mr ade to come and fix all the fans down stairs tomorrow morning</div>
                                    <div className="text-xs font-semibold text-[#a4b0be] mt-2">Added 20mins ago</div>
                                </div>
                            </div>

                        </div>
                    I</div>
                </div>
                <div className="w-[35%] ml-[4%] flex justify-center text-center">
                    <div className="mt-10">
                        <div className="w-[230px] h-[230px] bg-[#f5f6fa] rounded-full"></div>
                        <div className="py-5 pb-3 text-base">Stanley Chukwu</div>
                        <div className="flex justify-center text-sm font-extrabold">
                            <FiChevronsDown />
                        </div>
                        <div className="py-3 text-sm">15 items todo</div>
                    </div>
                </div>
            </div>
        </div>
    )
}