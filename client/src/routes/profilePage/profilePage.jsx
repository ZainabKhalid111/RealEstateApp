import { useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import {axiosInstance} from '../../lib/apiRequest'
import "./profilePage.scss";
import { toast } from 'react-toastify'
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContextFile";

function ProfilePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
    const { currentUser, updateUser } = useContext(AuthContext)
  

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/auth/logout");
      // localStorage.clear("user");
      updateUser(null)
      toast.success("Logout Successful");
      navigate('/')

    } catch (error) {
      toast.error("Something went wrong. Try later!")
    } finally {
      setIsLoading(true);

    }
  }

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
               src={currentUser.avatar || "/noavatar.jpg"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout} disabled={isLoading}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
