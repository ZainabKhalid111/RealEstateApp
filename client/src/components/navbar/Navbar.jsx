import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

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

  const user = true;
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
        {user ? (
          <div className="user">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <span>John Doe</span>
            <Link to="/profile" className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/">Sign in</Link>
            <Link to="/" className="register">
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
          <Link to="/">Sign in</Link>
          <Link to="/">Sign up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
