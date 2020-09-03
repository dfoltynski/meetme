import React from "react";
import { Wrapper, Form } from "./styledcomponents";

function Login() {
  const onSubmit = (e) => {
    e.preventDefault();
    alert("submitted");
  };

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <input type="text"></input>
        <input type="submit" value="Submit"></input>
      </Form>
    </Wrapper>
  );
}

export default Login;
