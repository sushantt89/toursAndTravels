import React, { useRef, useEffect, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./header.css";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const nav_links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const { dispatch, user } = useContext(AuthContext);

  // Pull id from localStorage
  const accessStorage = user ? localStorage.getItem("user") : null;
  const storageObject = accessStorage ? JSON.parse(accessStorage) : null;
  const id = storageObject ? storageObject._id : null;

  // Fetch user data
  const { data: singleUser } = useFetch(id ? `${BASE_URL}/users/${id}` : null);
  console.log(singleUser);

  const role = singleUser?.role;
  console.log("role:", role);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const headerRef = useRef(null);
  const stickyHeaderFunc = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current.classList.add("sticky_header");
    } else {
      headerRef.current.classList.remove("sticky_header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickyHeaderFunc);
    return () => {
      window.removeEventListener("scroll", stickyHeaderFunc);
    };
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            {/* ============== logo start ============= */}
            <div className="logo">
              <Link to={"/"}>
                <img src={logo} alt="logo" />{" "}
              </Link>
            </div>
            {/* ============== logo end ============= */}
            {/* ============== menu start ============= */}
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {nav_links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active_link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
                {singleUser?.role === "admin" && (
                  <li className="nav_item">
                    <NavLink
                      to="/admin/Dashboard"
                      className={(navClass) =>
                        navClass.isActive ? "active_link" : ""
                      }
                    >
                      Admin
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
            {/* ============== menu end ============= */}
            <div className="nav_right d-flex align-items-center gap-4">
              <div className="nav_btns d-flex align-items-center gap-4">
                {user ? (
                  <>
                    <h6 className="mb-0">
                      Welcome {user.username} {role === "user" ? "(User)" : "(Admin)"}
                    </h6>
                    <Button className="btn primary_btn mb-0" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary_btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary_btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
              <span className="mobile_menu">
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
