import React, {Component, useEffect, useState} from 'react';
import "./profile.css";
import {set, useForm} from "react-hook-form";
import Button from "react-bootstrap/Button";
import {auth} from "../../firebaseconfig";
import {getUserById, updateUserById} from "../../adapters/userAdapter";
import axios from "axios";

const Profile = () => {

    const [user, setUser] = useState({});
    const [store, setStore] = useState({})
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
    const onSubmitStore = async (storeData) => {
        const storeAdd = {
            address: storeData.address,
            image_url: "",
            name: storeData.name,
            user_id: user.id
        }

        const file = storeData.image[0]
        let formData = new FormData();
        formData.append("image", file)

        uploadImage(formData).then(response => {
            storeAdd.image_url = response

            axios.post("http://localhost:8080/api/marketplace/stores", storeAdd).then(response => {

                console.log("Store created" + response)

            }).catch(e => {console.log("Error creating store")})

        }).catch(e => console.log(e))





    }
    const uploadImage = async (fileToUpload) => {
        const data = await axios.post("http://localhost:8080/api/marketplace/images/upload",fileToUpload)
        const image_url = data.data.url
        return image_url;
    }
    useEffect(() => {
        auth.onAuthStateChanged(data => {
            const userId = data.uid;
            getUserData(userId).then(response => {
                console.log(response)
                setUser(response)
                setProfileData(response)
            })
            getStoreData(userId).then(response => {
                console.log(response)
                if(response !== undefined){
                    setStoreData(response)
                    setStore(response)
                }else{
                    setStore(null)
                }

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

    const getStoreData = async (userId) => {
        const { data } = await axios.get("http://localhost:8080/api/marketplace/stores")
        const newStore = data.filter(store => {return store.user_id === userId})
        return newStore[0];
    }
    const setStoreData = async (storeData) => {

            [{ name: 'address', value: storeData.address},
             {name: 'name', value: storeData.name}
            ].forEach(({ name, value }) => setValue2(name, value))

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
                            <h3>Mi tienda {store ? (""):("- No ha sido creada")}</h3>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="form-body">
                            <form onSubmit={handleSubmit(onSubmitStore)}>
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
                                    name="image"
                                    {...register2( "image", {

                                    })}
                                ></input>
                            </form>
                            {
                                store != null ?
                                    (
                                        <div className="place-image">
                                            <img src={store.image_url} width="auto" height="200"/>
                                        </div>
                                    )
                                    :
                                    (
                                        <span></span>
                                    )
                            }

                            <Button disabled={!formState2.isDirty && !formState2.isValid} className="submit-button"
                                    variant="dark" onClick={handleSubmit2(onSubmitStore)} type="submit">
                                Guardar Tienda
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );

}

export default Profile;