import React, { useEffect, useState } from "react";
import { Button, Typography, TextField, FormHelperText } from "@mui/material";
import { globalStyles } from "../styles/globalStyles";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import authService from "../services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Form1 = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");

    const [userData, setUserData] = useState();

    const getData = () => {
        const id = 1984;
        axios
            .get(
                `https://book-e-sell-node-api.vercel.app/api/user/byId?id=${id}`
            )
            .then((res) => {
                setUserData(res.data.result);
            });
    };
    useEffect(() => {
        // console.log("Use Effect called");
        getData();
    }, []);
    console.log("Data: ", userData);

    const validationSchema = Yup.object().shape({
        userName: Yup.string().required("Username should not be empty"),
        age: Yup.number().min(18),
        email: Yup.string().email().required("Email should not be empty"),
        password: Yup.string().min(8).required("Password should not be empty"),
    });

    const handleSubmit = async (values) => {
        console.log(`Username: ${userName}`);
        console.log(`Password: ${password}`);

        const payload = {
            firstName: values.userName,
            lastName: "test",
            email: values.email,
            roleId: 2,
            password: values.password,
        };

        await authService
            .Register(payload)
            .then((res) => {
                if (res && res.data.code === 200) {
                    // toast("Data submitted successfully");
                    console.log("response: ", res.data);
                    toast("Data Sent Successfully");
                }
            })
            .catch((error) => {
                if (error.response.status === 409) {
                    console.log("error: ", error);
                    // toast("Error! Data couldn't be sent");
                    toast("User already exists!");
                } else {
                    console.log("error: ", error);
                    toast("Error! Data couldn't be sent");
                }
            });
        // .catch((error) => {
        //     toast("Error! Data could not be submitted");
        //     console.log("Error: ", error);
        // });
    };

    return (
        <Formik
            initialValues={{ userName: "", age: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {({ values, errors, handleBlur, setFieldValue }) => {
                // console.log("error: ", errors);
                return (
                    <Form>
                        <div style={{ ...globalStyles.formDemo }}>
                            <Typography variant="h3">Login Here</Typography>
                            <TextField
                                label="Username"
                                name="userName"
                                variant="outlined"
                                error={Boolean(errors.userName)}
                                value={values.userName}
                                onChange={(e) =>
                                    setFieldValue("userName", e.target.value)
                                }
                                onBlur={handleBlur}
                            />
                            <FormHelperText error>
                                <ErrorMessage name="userName" />
                            </FormHelperText>
                            <TextField
                                label="Age"
                                name="age"
                                variant="outlined"
                                error={Boolean(errors.age)}
                                value={values.age}
                                onChange={(e) =>
                                    setFieldValue("age", e.target.value)
                                }
                                onBlur={handleBlur}
                            />
                            <FormHelperText error>
                                <ErrorMessage name="age" />
                            </FormHelperText>
                            <TextField
                                label="Email"
                                name="email"
                                variant="outlined"
                                error={Boolean(errors.email)}
                                value={values.email}
                                onChange={(e) =>
                                    setFieldValue("email", e.target.value)
                                }
                                onBlur={handleBlur}
                            />
                            <FormHelperText error>
                                <ErrorMessage name="email" />
                            </FormHelperText>
                            <TextField
                                label="Password"
                                name="password"
                                variant="outlined"
                                error={Boolean(errors.password)}
                                value={values.password}
                                onChange={(e) =>
                                    setFieldValue("password", e.target.value)
                                }
                                onBlur={handleBlur}
                            />
                            <FormHelperText error>
                                <ErrorMessage name="password" />
                            </FormHelperText>
                            <Button variant="contained" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default Form1;
