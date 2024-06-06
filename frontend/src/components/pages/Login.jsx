import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import TopLoadingBar from "../../shared/TopLoadingBar";

import loginImg from "../../assets/images/login.png";
import userIcon from "../../assets/images/user.png";

import { BASE_URL } from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_PENDING" });
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
      }
      if (res.ok) {
        dispatch({ type: "LOGIN_FULFILLED", payload: result.data });
        navigate("/");
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILED", payload: error.message });
    }
  };
  return (
    <section>
      <TopLoadingBar />
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login_container d-flex justify-content-between">
              <div className="login_img">
                <img src={loginImg} alt="" />
              </div>
              <div className="login_form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                      autoComplete="current-password"
                    />
                  </FormGroup>

                  <Button className="btn secondary_btn auth_btn" type="submit">
                    Login
                  </Button>
                </Form>
                <p>
                  Don't have an account? <Link to="/register">Create</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
