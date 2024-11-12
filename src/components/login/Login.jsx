import { useState } from "react"
import { toast } from 'react-toastify';
import { auth, db } from "../../lib/firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"; 
import upload from "../../lib/upload";
import "./login.css"
const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: "",
    })
    const [loading,setLoading] = useState(false)
    const handleAvatar = (e) =>{
        if(e.target.files[0]){
        setAvatar({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        });
    }
    };
    
const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);  
  
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const imgUrl = await upload(avatar.file);
      await setDoc(doc(db, "users", userCredential.user.uid),
      {
        username,
        email,
        avatar:imgUrl,
        id: userCredential.user.uid,
      });
      await setDoc(doc(db, "userchats", userCredential.user.uid),
   {
        chats: [],
      });
      toast.success('Đăng ký thành công!');
    } catch (error) {
      console.error(error);
      toast.error('Đăng ký thất bại. Vui lòng thử lại.');
    } finally{
        setLoading(false);
    }
  };
    const handleLogin = async (e) =>{
        e.preventDefault()
        setLoading(true);

        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);  
        try{
          await signInWithEmailAndPassword(auth,email,password);
        }catch(err){
          console.log(err);
          toast.error(err.message);
        } finally{
          setLoading(false);
        }
    }
    return(
        <div className='login'>
            <div className="item">
                <h2>Đăng nhập</h2>
                <form onSubmit={handleLogin}>
                 <input type="text" placeholder="Email" name="email" />
                 <input type="password" placeholder="Mật Khẩu" name="password" />
                 <button disabled={loading}> {loading ? "Đang tải..." : "Đăng nhập"} </button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
              <h2>Tạo tài khoản</h2>
                <form onSubmit = {handleRegister}>
                 <label htmlFor="file">
                   <img src={avatar.url || "./avatar.png"} alt=""/>
                  Chọn ảnh đại diện
                 </label>
                 <input 
                   type ="file"
                    id="file"
                    style ={{display:"none"}}
                    onChange = {handleAvatar}
                   />
                 <input type="file" id="file" style={{display:"none"}} onChange={handleAvatar}/>
                 <input type="text" placeholder="Tên tài khoản" name="username" />
                 <input type="text" placeholder="Email" name="email" />
                 <input type="password" placeholder="Mật khẩu" name="password" />
                 <button disabled={loading}> {loading ? "Đang tải..." : "Đăng kí"} </button>
                </form>
                </div>
        </div>
    )
}

export default Login