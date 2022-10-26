import Messages from "./Messages";
import img from "../Images/user.avif";
import { useContext, useState, useEffect } from "react";
import { Chat } from "../Context/ChatContext";
// icons
import { GoPrimitiveDot } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { BsEmojiLaughing } from "react-icons/bs";
import { FiPaperclip } from "react-icons/fi";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsMic } from "react-icons/bs";
// icons
import { updateDoc, doc, onSnapshot, arrayUnion, serverTimestamp, Timestamp } from "firebase/firestore";
import { Db } from "../firebase";
import { v4 as uuid } from "uuid"


export default function ChatBox(props) {
    const { userId, currentUserId, inboxId } = useContext(Chat);

    const [active, setActive] = useState(true)

    const [text, setText] = useState("");
    const [chats, setChats] = useState([])

    async function sendMessage(event) {

        event.preventDefault();

        const currentUser = await currentUserId
        const user = userId
        const inbox = inboxId

        await updateDoc(doc(Db, "Chats", inbox), {

            messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser,
                date: Timestamp.now()
            }),

        })

        await updateDoc(doc(Db, "userChats", currentUser), {

            [inboxId + ".lastMessage"]: {
                text
            },
            [inbox + ".date"]: serverTimestamp()

        })

        await updateDoc(doc(Db, "userChats", user), {

            [inboxId + ".lastMessage"]: {
                text
            },
            [inbox + ".date"]: serverTimestamp()

        })

        setText("")
    }

    useEffect(() => {

        async function getChats() {

            onSnapshot(doc(Db, "Chats", inboxId), (doc) => {
                if (doc.exists()) {
                    let array = []
                    doc.data().messages.forEach((res) => {
                        const data = {
                            text: res.text,
                            id: res.senderId,
                            uid: res.id
                        }
                        array.push(data)
                    })
                    setChats(array)
                }
            })

        }

        if (inboxId) {
            getChats()
        }

    }, [chats, inboxId])

    return (
        <div className="w-[66vw] flex flex-col items-center">
            <div className="w-[60vw] h-[12vh] flex flex-row items-center">
                <div className="w-[5vw]">
                    <img className="h-12 w-12 rounded-full ring-2 ring-white" src={img} alt="" />
                </div>
                <div className="w-[45vw]">
                    <div className="text-xl font-bold pb-3">USERNAME</div>
                    <ul className="text-sm font-semibold text-[#97a3ad] inline-flex justify-around items-center">
                        <li><GoPrimitiveDot size={20} color={active ? `limegreen` : `red`} /></li>
                        <li>Active Now</li>
                    </ul>
                </div>
                <ul className="w-[10vw] flex flex-row">
                    <li className="p-3 mr-7 bg-[#e5e9ed] rounded-full"><HiOutlineVideoCamera size={25} /></li>
                    <li className="p-3 bg-[#e5e9ed] rounded-full"><FiPhoneCall size={25} /></li>
                </ul>
            </div>
            <div className="w-[60vw] border-y-[3px] h-[76vh] flex flex-col justify-end ">
                <div className="overflow-y-auto">
                    {
                        chats.map((res) => {
                            return <Messages key={res.uid} id={res.id} message={res.text} />
                        })
                    }
                </div>
            </div>
            <div className="w-[60vw] h-[12vh] flex flex-row items-center ">
                <ul className="flex flex-row mr-5">
                    <li className="p-3 bg-[#e5e9ed] rounded-full mr-3"><BsEmojiLaughing size={25} /></li>
                    <li className="p-3 bg-[#e5e9ed] rounded-full"><FiPaperclip size={25} /></li>
                </ul>
                <form onSubmit={sendMessage} className="w-[52vw] flex flex-row justify-around items-center">
                    <input
                        className="w-[40vw] h-[6vh] px-8 outline-none ring-2 ring-[#d1dee9] rounded-full"
                        type="text"
                        placeholder="Your message here..."
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                        required
                    />
                    <div className="p-3 bg-[#e5e9ed] rounded-full">
                        <BsMic size={25} />
                    </div>
                    <button
                        className="p-4 bg-[#3930d8] rounded-full"
                        type="submit"><RiSendPlaneFill
                            size={25}
                            color="white" />
                    </button>
                </form>
            </div>
        </div>
    )
}