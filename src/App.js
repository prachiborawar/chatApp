import ChatBox from "./Components/ChatBox";
import Container from "./Components/Container";
import UserChats from "./Components/UserChats";
import UserPanel from "./Components/UserPanel";
import { signInAnonymously , updateProfile } from "firebase/auth";
import { Auth , Db } from "./firebase.js";
import { useEffect } from "react";
import { doc , setDoc } from "firebase/firestore";
import { useContext } from "react";
import { Context } from "./Context/MyContext"

function App() {
  const MyContext = useContext(Context);
  useEffect(()=>{
    signInAnonymously(Auth).then((resp) => {
      const displayName = "Admin"
      updateProfile(resp.user , {
        displayName : displayName
      })
      setDoc(doc(Db , "Admins" , resp.user.uid),{
        uid: resp.user.uid,
        websiteURL : "http://localhost:3000",
        websiteId : "testing_harshit",
        displayName: displayName
      }).catch((error)=>{
        console.log(error)
      })
      MyContext.getUserId(resp.user.uid , displayName)                // Sending info into context
    }).catch((error) => {
      console.log(error)
    })
  },[])

  return (
    <Container>
      <UserPanel/>
      <UserChats/>
      <ChatBox/>
    </Container>
  )
}

export default App;