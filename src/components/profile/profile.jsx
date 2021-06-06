import React, {Component, useEffect, useState} from 'react';
import "./profile.css";
import {set, useForm} from "react-hook-form";
import Button from "react-bootstrap/Button";
import {auth} from "../../firebaseconfig";
import {getUserById, updateUserById} from "../../adapters/userAdapter";
import axios from "axios";

const Profile = () => {

    const [user, setUser] = useState({});
    const {register, errors, handleSubmit, reset, formState, setValue} = useForm({mode: 'onBlur'});
    const {
        register: register2,
        errors: errors2,
        handleSubmit: handleSubmit2,
        reset: reset2,
        formState: formState2,
        setValue: setValue2} = useForm();

    const onSubmitProfile = (data) => {
        const userData = {
            name: data.name,
            surname: data.surname,
            username: user.username,
            id: user.id,
            brand: user.brand
        }
        setUser(userData)
        updateUserById(user.id, userData).then(response => {
            console.log("User updated");
            reset(userData, {keepDirty: false, keepTouched: false})
        }).catch(e => console.log("Error updating user"))
    }
    const onSubmitStore = (data) => {
        console.log(data)
    }

    useEffect(() => {
        auth.onAuthStateChanged(data => {
            const userId = data.uid;
            getUserData(userId).then(response => {
                console.log(response)
                setUser(response)
                setProfileData(response)
            })
        })
    },[])

    const getUserData = async (userId) => {
        const { data } = await axios.get("http://localhost:8080/api/marketplace/users")
        const newUser = data.filter(user => {return user.id === userId})
        return newUser[0];
    }

    const setProfileData = async (userData) => {
            [{ name: 'name', value: userData.name},
            {name: "surname", value: userData.surname},
            {name: "username", value: userData.username}
            ].forEach(({ name, value }) => setValue(name, value))
    }

        return (
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-md-6">
                        <div className="profile-title">
                            <h3>Mi Perfil</h3>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div class="form-body">
                            <form onSubmit={handleSubmit(onSubmitProfile)}>
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
                                        required: "This is required."
                                    })}
                                ></input>
                                <input
                                    readOnly
                                    placeholder="Correo Electronico"
                                    className="form-control mb-2 form-input"
                                    name="username"
                                    {...register("username", {
                                        required: "This is required."
                                    })}
                                ></input>
                            </form>
                            <Button disabled={!formState.isDirty && !formState.isValid} className="submit-button" variant="dark" onClick={handleSubmit(onSubmitProfile)} type="submit">
                                Guardar
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="row mt-5 justify-content-center">
                    <div className="col-md-6">
                        <div className="profile-title">
                            <h3>Mi tienda</h3>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="form-body">
                            <form key={2} onSubmit={handleSubmit(onSubmitStore)}>
                                <input
                                    placeholder="Dirección"
                                    className="form-control mb-2 form-input"
                                    name="address"
                                    {...register2("address", {
                                        required: "This is required."
                                    })}
                                ></input>
                                <input
                                    placeholder="Nombre"
                                    className="form-control mb-2 form-input"
                                    name="name"
                                    {...register2("name", {
                                        required: "This is required."
                                    })}
                                ></input>
                                <input
                                    type="file"
                                    className="form-control mb-2 form-input"
                                    name="image_url"
                                    {...register2( "image_url", {
                                        required: "Required"
                                    })}
                                ></input>
                            </form>
                            <Button disabled={!formState2.isDirty && !formState2.isValid} className="submit-button"
                                    variant="dark" onClick={handleSubmit(onSubmitStore)} type="submit">
                                Guardar Tienda
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );

}

export default Profile;