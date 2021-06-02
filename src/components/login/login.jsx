import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import {useForm} from "react-hook-form";

const Login = () => {

    const {login, errors, handleSubmit, reset} = useForm();
    const onSubmit = (data) => {

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
                                        {...login("name", {
                                            required: "This is required."
                                        })}
                                    ></input>


                                    <input
                                        placeholder="Apellido"
                                        className="form-control mb-2 form-input"
                                        name="surname"
                                        {...login("surname", {
                                            required: {value: true, message: 'Ingrese apellido'},
                                        })}
                                    ></input>

                                </form>
                                <Button className="submit-button" variant="dark" onClick={handleSubmit(onSubmit)}
                                        type="submit">
                                    Ingresar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Login;