import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfilePic } from "../actions";
import { useHistory } from "react-router-dom";

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
    const dispatch = useDispatch();
    const profile_pic = useSelector((state) => state.profile_pic);
    const history = useHistory();

    const createImagePreview = async (bufferArray) => {
        let imgBinary = Array.prototype.map
            .call(bufferArray, (ch) => {
                return String.fromCharCode(ch);
            })
            .join("");

        return btoa(imgBinary);
    };

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

                console.log(
                    await createImagePreview(res.data.profile_pic.data)
                );

                setUserError(null);
                let imageBase64 = await createImagePreview(
                    res.data.profile_pic.data
                );
                localStorage.setItem("profile_pic", imageBase64);
                // dispatch(setUserProfilePic(imageBase64));
                if (authMe.status === 200 || authMe.status === 304) {
                    history.push("/dashboard");
                }
            } catch (err) {
                console.error("Error: ", err);
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
                    <Link
                        style={{
                            color: "#787878",
                            fontFamily: "Poppins",
                            fontSize: "13px",
                        }}
                        to="/register"
                    >
                        Don't have an account? <br />
                        Register
                    </Link>
                </Form>
            </FormContainer>
        </Wrapper>
    );
};

export default Login;
