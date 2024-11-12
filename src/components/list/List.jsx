import ChatList from "./chatList/ChatList"
import "./list.css"
import Userinfor from "./userInfo/Userinfo"
const List = () => {
    return(
        <div className='list'>
            <Userinfor/>
            <ChatList/>
        </div>
    )
}

export default List