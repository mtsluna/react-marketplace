import React, {Component} from 'react';
import {useForm} from "react-hook-form";
import "./register.css";
import Button from "react-bootstrap/Button";
import {auth} from "../../firebaseconfig";
import {postUser, getUsers} from "../../adapters/userAdapter";


const Register = () => {

    const {register, errors, handleSubmit, reset} = useForm();
    const onSubmit = (data) => {
        const user = {
            name: data.name,
            surname: data.surname,
            username: data.username,
            password: data.password,
            brand: data.brand
        }
        console.log(user);
        /*auth.createUserWithEmailAndPassword(user.username,user.password).then(response => {
            console.log(data)
            postUser(user).then(response => {
                console.log("User created successfully")
            }).catch(e => {
                console.log(e);
            })
        }).catch(e => {
            console.log(e)
        })*/
        getUsers().then(response => {
            console.log(response.data)
        }).catch(e => {
            console.log(e)
        })
        postUser(user).then(response => {
            console.log("User created successfully")
        }).catch(e => {
            console.log(e);
        })
        //reset()

    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            );

            }

            export default Register;