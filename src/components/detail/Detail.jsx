import "./detail.css"
import { auth } from "../../lib/firebase"
import { useChatStore } from "../../lib/chatStore"
import { useUserStore } from "../../lib/userStore";
import { arrayRemove, arrayUnion, updateDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
const Detail = () => {
    const {chatId, user, isCurrentUserBlocked, isReceiverBlocked,changeBlock}= useChatStore();
    const {currentUser} = useUserStore();
    const handleBlock = async () => {
      if(!user) return;
        const userDocRef= doc(db,"users",currentUser.id)
      try{
        await updateDoc(userDocRef,{
            blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
        });
        changeBlock()
      }catch(err){
        console.log(err)
      }
    }

    return(
     <div className="detail"> 
        <div className="user">
            <img src={user?.avatar || "./avatar.png"} alt=""/>
            <h2>{user?.username}</h2>
            
        </div>

        <div className="info"> 
         <div className="option">
            <div className="title">
                <span>Cài đặt</span>
                <img src="./arrowUp.png" alt=""/>
            </div>
         </div>
         <div className="option">
            <div className="title">
                <span>Điều khoản & Hỗ trợ</span>
                <img src="./arrowUp.png" alt=""/>
            </div>
         </div>
         <div className="option">
            <div className="title">
                <span>Chia sẻ ảnh</span>
                <img src="./arrowUp.png" alt=""/>
            </div>
            <div className="photos">
                <div className="photoItem">
                 <div className="photoDetail">
                    <img src="https://cdn.vjshop.vn/tin-tuc/nhiep-anh-my-thuat-fine-art-photography-la-gi/fine-art-photography-la-gi-1.jpg"/>
                    <span>photo_2024_2.png</span>
                    </div>
                    <img src="./download.png" alt="" className="icon"/>                   
                </div>              
            </div>
         </div>
         <div className="option">
            <div className="title">
                <span>Chia sẻ tệp</span>
                <img src="./arrowUp.png" alt=""/>
            </div>
         </div>
         <button onClick={handleBlock}>{
            isCurrentUserBlocked ? "Bạn đã bị chặn!" : isReceiverBlocked ? "Người dùng bị chặn" : "Chặn người dùng"
         }
         </button>
         <button className="logout" onClick={()=>auth.signOut()}>Đăng xuất</button>
        </div>
     </div>
    )
}

export default Detail