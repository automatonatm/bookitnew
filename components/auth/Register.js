import React, {useState, useEffect} from 'react';

import {useRouter} from "next/router";

import {useSelector, useDispatch} from "react-redux";

import {toast} from "react-toastify";

import {clearErrors, registerUser} from "../../redux/actions/userActions";
import ButtonLoader from "../layout/ButtonLoader";


const Register = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const {name, email, password} = user;

    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');

    const router = useRouter();

    const dispatch = useDispatch();

    const {loading, success, errors} = useSelector(state => state.auth);

    useEffect(() => {
        if(success) {
            router.push('/login')
        }
        if(errors) {
            toast.error(errors)
            dispatch(clearErrors())
        }
    }, [dispatch, success, errors]);


    const onchangeHandler = (e) => {
        if(e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2) {
                    setAvatar(reader.result)
                    setAvatarPreview(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])

        }else {
            setUser({...user, [e.target.name]: e.target.value})
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if(!password || !name || !password) {
                toast.error('Please all form fields');
                return
        }


        const data = {
            name, email, password, avatar
        };
        dispatch(registerUser(data))
    };


    return (
        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Join Us</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Full Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                onChange={onchangeHandler}
                                name="name"
                                value={name}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                onChange={onchangeHandler}
                                name="email"
                                value={email}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                onChange={onchangeHandler}
                                name="password"
                                value={password}
                            />
                        </div>

                       <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='image'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept="images/*"
                                        onChange={onchangeHandler}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>


                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading}
                        >
                            { loading ? <ButtonLoader/> : 'REGISTER'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
