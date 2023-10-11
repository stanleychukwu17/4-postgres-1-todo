import { Link } from 'react-router-dom'

import bigBackDrop from '../../assets/images/original_edited.png'
import background_image from '../../assets/images/background_image.png'
import logo from '../../assets/images/logo3.png'
import sign_up from '../../assets/images/sign_up.png'
import './HomeComp.scss'

export default function HomeComp() {
    return (
        <div className="">
            <div className="bgImgCvr_1"><img src={background_image} alt="" /></div>
            <div className="bgImgCvr_2"><img src={bigBackDrop} alt="" /></div>
            <div className="logoImg"><img src={logo} alt="" /></div>
            <div className="signUp">
                <Link to="/login">
                    <img src={sign_up} alt="" />
                </Link>
            </div>
        </div>
    )
}