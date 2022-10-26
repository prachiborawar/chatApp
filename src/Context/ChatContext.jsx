import { createContext, useState } from "react";

export const Chat = createContext();

export default function ChatContext({children}) {
    
    const [userId, setUserId] = useState(null)
    const [currentUserId, setCurrentUserId] = useState(null)
    const [inboxId, setinboxId] = useState(null)
    
    function getChat(adminId, userId) {
        setUserId(userId)
        setCurrentUserId(adminId)
        setinboxId(adminId + userId)
    }

    return (
        <Chat.Provider value={{ getChat, userId, inboxId, currentUserId }}>
            {children}
        </Chat.Provider>
    )
}