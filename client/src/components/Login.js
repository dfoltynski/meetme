import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import {
    Wrapper,
    FormContainer,
    Form,
    Input,
    SubmitForm,
} from "./styledcomponents";

import "../App.css";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address"),
    password: Yup.string()
        .required("Required")
        .min(3, "Password length must be greater than 3"),
});

const Login = () => {
    const [userError, setUserError] = useState("");
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validateOnChange: false,
        validationSchema,
        onSubmit: async (values) => {
            try {
                const res = await axios.post(
                    "http://localhost:8080/v1/users/login/",
                    values
                );

                const authMe = await axios.get(
                    "http://localhost:8080/v1/auth-me/",
                    {
                        headers: {
                            "Bearer-Authorization": res.data.token,
                        },
                    }
                );
                let d = new Date();
                d.setTime(d.getTime() + 30 * 60 * 1000);
                setCookie("token", res.data.token, { expires: d });
                setCookie("email", values.email, { expires: d });
                setCookie("name", res.data.name, { expires: d });

                setUserError(null);
                console.log(authMe.status);
                if (authMe.status === 200 || authMe.status === 304) {
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
                        <p className="validation__error" style={{}}>
                            {userError}
                        </p>
                    ) : null}
                    <Input
                        name="email"
                        type="text"
                        placeholder="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        required
                    />
                    {formik.errors.email ? (
                        <p className="validation__error">
                            {formik.errors.email}
                        </p>
                    ) : null}
                    <Input
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        required
                    />
                    {formik.errors.password ? (
                        <p className="validation__error">
                            {formik.errors.password}
                        </p>
                    ) : null}
                    <SubmitForm type="submit" value="Log in"></SubmitForm>
                </Form>
            </FormContainer>
        </Wrapper>
    );
};

export default Login;
