import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useCookies } from "react-cookie";

import { Wrapper, FormContainer, Form, Input } from "./styledcomponents";

const Login = () => {
  const [userError, setUserError] = useState("");
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  const validate = (values) => {
    const errors = {};

    if (values.password.length < 3) {
      errors.password = "Password length must be greater than 3";
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const token = await axios.post(
          "http://localhost:8080/v1/users/login/",
          values
        );
        let d = new Date();
        d.setTime(d.getTime() + 30 * 60 * 1000);
        setCookie("token", token.data.token, { expires: d });
        setCookie("email", values.email, { expires: d });
        setUserError(null);
        const res = await axios.get("http://localhost:8080/v1/auth-me/", {
          headers: {
            "Bearer-Authorization": token.data.token,
          },
        });
        if (res.status === 200) {
          window.location = "/dashboard";
        }
      } catch (err) {
        console.log("Error: ", err);
        setUserError("Invalid email or password");
        removeCookie("token");
        removeCookie("io");
        removeCookie("email");
      }
    },
  });

  return (
    <Wrapper>
      <FormContainer style={{ minHeight: "11em" }}>
        <h1>Login</h1>
        <Form onSubmit={formik.handleSubmit}>
          {userError ? (
            <p style={{ color: "red", fontSize: "14px" }}>{userError}</p>
          ) : null}
          <Input
            id="email"
            type="text"
            placeholder="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          />
          {formik.errors.email ? (
            <p style={{ color: "red", fontSize: "14px" }}>
              {formik.errors.email}
            </p>
          ) : null}
          <Input
            id="password"
            type="password"
            placeholder="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          />
          {formik.errors.password ? (
            <p style={{ color: "red", fontSize: "14px" }}>
              {formik.errors.password}
            </p>
          ) : null}
          <Input
            type="submit"
            value="Log in"
            style={{
              backgroundColor: "#6400fa",
              color: "white",
              border: "none",
              padding: "1em",
              cursor: "pointer",
              borderRadius: "10px",
              fontWeight: "bolder",
            }}
          ></Input>
        </Form>
      </FormContainer>
    </Wrapper>
  );
};

export default Login;
