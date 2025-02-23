import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextFile";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext)

  const tabs = [
    {
      navItem: "Home",
      path: "/"
    },
    {
      navItem: "About",
      path: "/"
    },
    {
      navItem: "Contact",
      path: "/"
    },
    {
      navItem: "Agents",
      path: "/"
    },

  ];


  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/favicon.ico" alt="" />
          <span>RealEstate</span>
        </Link>
        {tabs.map((tab, index) => (
          <Link to={tab.path} key={index}>{tab.navItem}</Link>
        ))}

      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              src={currentUser.avatar || "/user.png"}
              alt=""
            />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/register" className="register">
              Sign up
            </Link>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          {tabs.map((tab, index) => (
            <Link to={tab.path} key={index}>{tab.navItem}</Link>
          ))}
          <Link to="/login">Sign in</Link>
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
