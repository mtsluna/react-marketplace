import React, {Component, useState} from 'react';
import {useForm} from "react-hook-form";
import "./register.css";
import Button from "react-bootstrap/Button";
import {auth} from "../../firebaseconfig";
import {postUser} from "../../adapters/userAdapter";
import {Alert} from "react-bootstrap";
import {useHistory} from "react-router-dom";


const Register = () => {
    const history = useHistory()
    const {register, errors, handleSubmit, reset} = useForm();
    const [msgError, setMsgError] = useState(null);
    const onSubmit = (data) => {
        setMsgError(null)
        const user = {
            name: data.name,
            surname: data.surname,
            username: data.username,
            password: data.password,
            brand: data.brand
        }
        console.log(user);
        auth.createUserWithEmailAndPassword(user.username,user.password).then(async response => {
            const data = await response.user;
            console.log(data)
            postUser(data.uid, user).then(response => {
                console.log("User created successfully")
                reset()
                history.push("home");
            }).catch(e => {
                console.log(e);
            })
        }).catch(e => {
            if(e.code === "auth/weak-password") setMsgError("La contraseña debe tener mas de 5 caracteres");
            if(e.code === "auth/email-already-in-use") setMsgError("Ese email ya ha sido registrado anteriormente");

        })

    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="title">
                                <h3>Registro</h3>
                            </div>
                            <div className="form-body">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <input
                                        placeholder="Nombre"
                                        className="form-control mb-2 form-input"
                                        name="name"
                                        {...register("name", {
                                            required: "This is required."
                                        })}
                                    ></input>


                                    <input
                                        placeholder="Apellido"
                                        className="form-control mb-2 form-input"
                                        name="surname"
                                        {...register("surname", {
                                            required: {value: true, message: 'Ingrese apellido'},
                                        })}
                                    ></input>

                                    <input
                                        placeholder="Correo electrónico"
                                        className="form-control mb-2 form-input"
                                        name="username"
                                        {...register("username", {
                                            required: {value: true, message: 'Ingrese nombre de usuario'},
                                        })}
                                    ></input>

                                    <input
                                        type="password"
                                        placeholder="Contraseña"
                                        className="form-control mb-2 form-input"
                                        name="password"
                                        {...register("password", {
                                            required: {value: true, message: 'Ingrese contraseña'},
                                        })}
                                    ></input>

                                    <input
                                        placeholder="Marca"
                                        className="form-control mb-2 form-input"
                                        name="brand"
                                        {...register("brand", {
                                            required: {value: true, message: 'Ingrese marca'},
                                        })}
                                    ></input>

                                </form>
                                <Button className="submit-button" variant="dark" onClick={handleSubmit(onSubmit)} type="submit">
                                    Registrar
                                </Button>
                                {
                                    msgError ?
                                        (
                                            <Alert variant="danger">
                                                {msgError}
                                            </Alert>
                                        )
                                        :
                                        (
                                            <span></span>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            );

            }

            export default Register;