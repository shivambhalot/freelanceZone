import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { useState, useEffect } from "react";
import newRequest from "../../utils/newRequest";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  // const currentUser = {
  //   id: 1,
  //   username: "Saumya",
  //   isSeller: true,
  // };
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">FreelanceZone</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
        
          {/* <span>sign in</span> */}
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {/* {!currentUser && <button>Join</button>} */}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              {/* <img 
                    src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                    alt="" /> */}
              <img
                src={currentUser.img || "../public/img/noavatar.jpg"}
                alt=""
              />
              <span>{currentUser.username}</span>
              {/* why ? in currentUser?.username*/}
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
              </div>
              ):(
                <>
                  <Link to="/login" className="link">Sign in</Link>
                  <Link className="link" to="/register">
                    <button>Join</button>
                  </Link>
                </>
            
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
            UI/UX Design
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
           
            </Link>
            <Link className="link menuLink" to="/">
            Data Analysis
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;
