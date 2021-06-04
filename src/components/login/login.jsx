import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {auth} from "../../firebaseconfig";
import Button from "react-bootstrap/Button";
import {Alert} from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Login = () => {
    const history = useHistory()
    const {register, errors, handleSubmit, reset} = useForm();
    const [msgError, setMsgError] = useState(null);
    const onSubmit = (data) => {
        setMsgError(null)
        const user = {
            email: data.email,
            password: data.password
        }
        auth.signInWithEmailAndPassword(user.email, user.password).then(response => {
            history.push("home");
        }).catch(e => {
            if(e.code === "auth/wrong-password")setMsgError('Contraseña incorrecta')
            if(e.code === "auth/user-not-found") setMsgError("Este usuario no existe");
            if(e.code === "auth/invalid-email") setMsgError("Email no valido");
        })
    }

    return(
      <div className="container">
          <div className="row justify-content-center mt-5">
              <div className="col-md-6">
                  <div className="card">
                      <div className="title">
                          <h3>Iniciar sesión</h3>
                      </div>
                      <div className="form-body">
                          <form onSubmit={handleSubmit(onSubmit)}>
                              <input
                                  type="email"
                                  placeholder="Correo electronico"
                                  className="form-control mb-2 form-input"
                                  name="email"
                                  {...register("email", {
                                      required: "This is required."
                                  })}
                              ></input>
                              <input
                                  type="password"
                                  placeholder="Contraseña"
                                  className="form-control mb-2 form-input"
                                  name="password"
                                  {...register("password", {
                                      required: "This is required."
                                  })}
                              ></input>
                          </form>
                          <Button className="submit-button" variant="dark" onClick={handleSubmit(onSubmit)} type="submit">
                              Iniciar
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
    );
}

export default Login;