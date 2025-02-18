import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../../lib/apiRequest";
import {toast} from 'react-toastify'

function Register() {

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("")

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(username, email, password);
    try {
      const res = await axiosInstance.post("/auth/register", {
        username,
        email,
        password
      });

      console.log(res.data);
      toast.success("User registered successfully")

      navigate('/login')
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message)
    }finally{
    setIsLoading(false);
    }
  }

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" required min={3} max={20} />
          <input name="email" type="text" placeholder="Email" required min={3} max={20} />
          <input name="password" type="password" placeholder="Password" required min={3} max={20} />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
