import img from "../Images/user.avif";
import { BiMessageDetail } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";

export default function UserPanel() {
  return (
    <div className="flex flex-col w-[7vw]">
        <div className="h-[12vh] bg-[#141a26] flex items-center justify-center">
            <img className="h-12 w-12 rounded-full ring-2 ring-white" src={img} alt=""/>
        </div>
        <div className="h-[70vh] bg-[#181f2e]">
            <ul className="h-auto flex flex-col items-center">
                <li className="py-3">
                    <BiMessageDetail color="white" size={25}/>
                </li>
                <li className="py-3">
                    <BiUser color="white" size={25}/>
                </li>
            </ul>
        </div>
        <div className="h-[18vh] bg-[#202a3f]">
            <ul className="h-auto flex flex-col items-center mt-4">
                <li className="py-3">
                    <AiOutlineSetting color="white" size={25}/>
                </li>
                <li className="py-3">
                    <MdOutlineLogout color="white" size={25}/>
                </li>
            </ul>
        </div>
    </div>
  )
}