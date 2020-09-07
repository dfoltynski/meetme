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

  const validate = (values) => {
    const errors = {};

    if (values.password.length < 3) {
      errors.password = "Password length must be greater than 3";
    }

    if (values.name.length < 2) {
      errors.name = "Name length must be greater than 2";
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

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
    },
    validate,
    onSubmit: async (values) => {
      const data = new FormData();
      data.append("file", selectedFile);

      Object.keys(values).forEach((key) => data.append(key, values[key]));
      await axios.post("http://localhost:8080/v1/users/", data);
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
            required
          />
          {formik.errors.email ? (
            <p style={{ color: "red", fontSize: "14px" }}>
              {formik.errors.email}
            </p>
          ) : null}
          <Input
            id="name"
            type="text"
            placeholder="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            required
          ></Input>
          {formik.errors.name ? (
            <p style={{ color: "red", fontSize: "14px" }}>
              {formik.errors.name}
            </p>
          ) : null}
          <Input
            id="password"
            type="password"
            placeholder="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          ></Input>
          {formik.errors.password ? (
            <p style={{ color: "red", fontSize: "14px" }}>
              {formik.errors.password}
            </p>
          ) : null}
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
                required
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
                required
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
                required
              />
              none of above
            </label>
          </div>
          <Input
            id="age"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.age}
            required
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
              onDrop={(acceptedFile) => createImagePreview(acceptedFile)}
              accept="image/png, image/jpeg, image/jpg"
            >
              {({ getRootProps, getInputProps }) => (
                <Section {...getRootProps()}>
                  <input {...getInputProps()} name="file" required />
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
