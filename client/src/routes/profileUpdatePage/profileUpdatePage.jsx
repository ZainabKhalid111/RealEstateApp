import { useContext } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContextFile";
import { toast } from "react-toastify";
import { axiosInstance } from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";

function ProfileUpdatePage() {

  const navigate = useNavigate();
  const { currentUser, updateUser } = useContext(AuthContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData); //can also destruct individual entries
    try {
      const response = await axiosInstance.put(`/users/${currentUser.id}`, {
        username,
        email,
        password
      })

      console.log(response.data)
      updateUser(response.data);
      toast.success('Profile updated successfully');
      navigate('/profile')
    } catch (error) {
      toast.error("Failed to update user. Try later!")
    }

  }
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password"
            />
          </div>
          <button>Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img src={currentUser.avatar || '/user.png'} alt="" className="avatar" />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
