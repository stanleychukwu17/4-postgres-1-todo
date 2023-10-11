import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'

import bigBackDrop from '../../assets/images/original_edited.png'
import background_image from '../../assets/images/background_image.png'
import logo from '../../assets/images/logo3.png'
import sign_up from '../../assets/images/sign_up.png'
import dbs from '../../assets/images/dbs.png'
import './HomeComp.scss'

//--start-- framerMotion variants
import { logoVariant, mainCvr_1variant, phoneImgVariant, signUpVariant, dbsVariant } from './Home.variants'
//--end--

export default function HomeComp() {
    return (
        <motion.div className="" variants={mainCvr_1variant} initial="initial" animate="animate">
            <motion.div className="bgImgCvr_1">
                <img src={background_image} alt="" />
            </motion.div>
            <motion.div className="bgImgCvr_2" variants={phoneImgVariant}>
                <img src={bigBackDrop} alt="" />
            </motion.div>
            <motion.div className="logoImg" variants={logoVariant}>
                <img src={logo} alt="" />
            </motion.div>
            <motion.div className="signUp" variants={signUpVariant}>
                <Link to="/login">
                    <img src={sign_up} alt="" />
                </Link>
            </motion.div>
            <motion.div className="dbs_stanley" variants={dbsVariant}>
                <img src={dbs} alt="" />
            </motion.div>
        </motion.div>
    )
}