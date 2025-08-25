import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store";

const LoginForm = (props) => {
  const dispatch = useDispatch(); //reducar 호출
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  async function submitLogin(e) {
    e.preventDefault();
    try {
      let response = await axios({
        method: "POST",
        url: "http://localhost:8080/login",
        data: user, //body부분으로 json을 넣어야 한다. e는 자바스크립트 오브젝트
        // axios는 javascript object를 전달하면 json으로 변환해서 전달됨
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response); // 이제 정상 출력됨

      let jwt = response.headers["authorization"];
      localStorage.setItem("jwt", jwt);

      dispatch(login(jwt));

      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  }

  const changeValue = (e) => {
    //통신해서 유효성 검사
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  console.log(user);
  return (
    <Form>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Username"
          name="username"
          onChange={changeValue}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={changeValue}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={submitLogin}>
        로그인
      </Button>
    </Form>
  );
};

export default LoginForm;
