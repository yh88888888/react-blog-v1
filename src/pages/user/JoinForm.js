import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const JoinForm = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    Username: "",
    passwrod: "",
    email: "",
  });

  function changeValue(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function submitJoin(e) {
    e.preventDefault(); // 새로고침 막기 (action 발동 막기)

    //let response = await axios 로 처리 가능하지만 try catch가 더 깔끔끔
    try {
      await axios({
        method: "POST",
        url: "http://localhost:8080/join",
        data: user, //body부분으로 json을 넣어야 한다. e는 자바스크립트 오브젝트
        // axios는 javascript object를 전달하면 json으로 변환해서 전달됨
        headers: {
          "Content-Type": "application/json",
        },
      });

      navigate("/login-form");
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  }

  console.log(user);
  return (
    <Form>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
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

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={changeValue}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={submitJoin}>
        회원가입
      </Button>
    </Form>
  );
};

export default JoinForm;
