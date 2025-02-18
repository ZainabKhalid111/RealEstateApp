import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../../lib/apiRequest";
import {toast} from "react-toastify";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("")
    const formData = new FormData(e.target);
    // const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(email, password);
    try {
      const res = await axiosInstance.post("/auth/login", {
        // username,
        email,
        password,
      });

      console.log(res.data);
      localStorage.setItem("user", JSON.stringify(res.data))
      toast.success("Login successfully");
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(true);
    }
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="email" type="email" placeholder="Email" required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
