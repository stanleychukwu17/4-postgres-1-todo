import {BsCheckCircle, BsExclamationCircle} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'

export type MessageCompProps = {
    msg_type: 'okay'|'bad'|'';
    msg_dts: string;
    closeAlert?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MessageComp({msg_type, msg_dts, closeAlert}: MessageCompProps) {

    const timeToCloseThisAlert = () => {
        if (closeAlert) {
            closeAlert(false)
        }
    }

    return (
        <div className="fixed z-10 top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.8)] shadow-2xl">
            <div
                className='absolute top-0 right-5 bottom-auto left-auto bg-white text-4xl p-3 cursor-pointer hover:bg-[#f1f2f6] active:top-1'
                onClick={timeToCloseThisAlert}
            >
                <AiOutlineClose />
            </div>
            <div className="w-1/2 m-auto mt-20 bg-[#fffefb] rounded flex">
                <div className="w-[150px] text-8xl p-5">
                    {msg_type === 'okay' && <p className="text-[#00b894]"><BsCheckCircle /></p>}
                    {msg_type === 'bad' && <p className="text-[#df0e3a]"><BsExclamationCircle /></p>}
                </div>
                <div className="pt-5">
                    <div className="text-2xl font-semibold">
                        {msg_type === 'okay' && <p className="text-[#00b894]">Success</p>}
                        {msg_type === 'bad' && <p className="text-[#df0e3a]">Error</p>}
                    </div>
                    <div className="text-lg font-semibold pt-2 pb- first-letter:capitalize text-black">
                        {msg_dts}
                    </div>
                </div>
            </div>
        </div>
    )
}