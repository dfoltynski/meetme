import React, { useState } from "react";
import {
    Wrapper,
    Form,
    Input,
    FormContainer,
    Section,
} from "./styledcomponents";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Register() {
    const [selectedFile, setSelectedFile] = useState();
    const [previewImage, setPreviewImage] = useState("");

    const createImagePreview = (file) => {
        setSelectedFile(file[0]);
        setPreviewImage(URL.createObjectURL(file[0]));
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            password: "",
            age: "",
            sex: "",
            relationship_status: "",
        },
        onSubmit: async (values) => {
            const data = new FormData();
            data.append("file", selectedFile);
            const jsonValues = JSON.stringify(values);
            // data.append("data", {
            //     email: values.email,
            //     name: values.name,
            //     password: values.password,
            //     age: values.age,
            //     sex: values.sex,
            //     relationship_status: values.relationship_status,
            // });
            console.log(values);
            // data.append("data", [dick]);
            Object.keys(values).forEach((key) => data.append(key, values[key]));
            await axios.post("http://localhost:8080/v1/users/", data);
            // POST http://localhost:8080/v1/users/ values and data
        },
    });

    return (
        <Wrapper>
            <FormContainer>
                <h1>Register</h1>
                <Form onSubmit={formik.handleSubmit}>
                    <Input
                        id="email"
                        type="text"
                        placeholder="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <Input
                        id="name"
                        type="text"
                        placeholder="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    ></Input>
                    <Input
                        id="password"
                        type="text"
                        placeholder="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    ></Input>
                    <br></br>
                    <b>Sex</b>
                    <div>
                        <label style={{ margin: "0 0.2em" }}>
                            <Input
                                id="sex"
                                name="sex"
                                value="male"
                                type="radio"
                                onChange={formik.handleChange}
                                defaultChecked={formik.values.sex}
                            />
                            male
                        </label>
                        <label style={{ margin: "0 0.2em" }}>
                            <Input
                                id="sex"
                                name="sex"
                                value="female"
                                type="radio"
                                onChange={formik.handleChange}
                                defaultChecked={formik.values.sex}
                            />
                            female
                        </label>
                        <label style={{ margin: "0 0.2em" }}>
                            <Input
                                id="sex"
                                name="sex"
                                value="none of the above"
                                type="radio"
                                onChange={formik.handleChange}
                                defaultChecked={formik.values.sex}
                            />
                            none of above
                        </label>
                    </div>
                    <b style={{ marginTop: "0.5em" }}>Relationship status</b>
                    <div style={{ marginBottom: "0.5em" }}>
                        <label style={{ margin: "0 0.2em" }}>
                            <Input
                                id="relationship_status"
                                name="relationship_status"
                                value="single"
                                type="radio"
                                onChange={formik.handleChange}
                                defaultChecked={
                                    formik.values.relationship_status
                                }
                            />
                            single
                        </label>
                        <label style={{ margin: "0 0.2em" }}>
                            <Input
                                id="relationship_status"
                                name="relationship_status"
                                value="taken"
                                type="radio"
                                onChange={formik.handleChange}
                                defaultChecked={
                                    formik.values.relationship_status
                                }
                            />
                            taken
                        </label>
                        <label style={{ margin: "0 0.2em" }}>
                            <Input
                                id="relationship_status"
                                name="relationship_status"
                                value="none of the above"
                                type="radio"
                                onChange={formik.handleChange}
                                defaultChecked={
                                    formik.values.relationship_status
                                }
                            />
                            none of above
                        </label>
                    </div>
                    <Input
                        id="age"
                        type="date"
                        onChange={formik.handleChange}
                        value={formik.values.age}
                    ></Input>
                    {previewImage ? (
                        <img
                            style={{
                                objectFit: "cover",
                                width: "15em",
                                maxHeight: "15em",
                                borderRadius: "10px",
                            }}
                            src={previewImage}
                        ></img>
                    ) : (
                        <Dropzone
                            onDrop={(acceptedFile) =>
                                createImagePreview(acceptedFile)
                            }
                            accept="image/png, image/jpeg, image/jpg"
                        >
                            {({ getRootProps, getInputProps }) => (
                                <Section {...getRootProps()}>
                                    <input {...getInputProps()} name="file" />
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faImages}
                                        color="#292929"
                                        opacity="0.8"
                                        size="2x"
                                    />
                                    <p
                                        style={{
                                            fontSize: "12px",
                                            textAlign: "center",
                                        }}
                                    >
                                        {
                                            "Drag 'n' drop your profile picture, or click to select. Only jpg and png. Max size 16MB"
                                        }
                                    </p>
                                </Section>
                            )}
                        </Dropzone>
                    )}
                    <Input
                        type="submit"
                        value="Register"
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
}

export default Register;
