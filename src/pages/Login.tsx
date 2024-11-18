import React, { useEffect, useState } from 'react'
import HeroImg from "../assets/img/toll-road.jpg"
import LogoJasaMarga from "../assets/img/logo-jasamarga.png"
import { useAppDispatch, useAppSelector } from '../utils/reduxHooks';
import { login } from '../redux/slice/authSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const isFormValid = username.trim() !== "" && password.trim() !== "";
    const dispatch = useAppDispatch();
    const { status, isLoggedIn } = useAppSelector(state => state.auth)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const resultAction = await dispatch(login({ username, password }));
        if (login.fulfilled.match(resultAction)) {
            toast.success("Login successful!");
        } else {
            toast.error(resultAction.payload || "Login failed!");
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/"); 
        }
    }, [isLoggedIn, navigate]);
    return (
        <main className='flex justify-center items-center h-screen bg-yellow'>
            <form className='lg:w-6/12 flex flex-col gap-9' onSubmit={handleSubmit}>
                <img className='m-auto h-[80px] w-auto aspect-auto"]' src={LogoJasaMarga} alt="Jasamarga" width={1000} height={1000} />
                <div className='lg:w-3/6 flex-col flex gap-4 m-auto'>
                    <label htmlFor="username">
                        <span className='sr-only'>Username</span>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            autoComplete='off'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='outline-none focus:outline-none focus:shadow-sm transition-all ease-in-out w-full p-4 rounded-md text-dark shadow-md'
                        />
                    </label>
                    <label htmlFor="password">
                        <span className='sr-only'>Password</span>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='outline-none focus:outline-none focus:shadow-sm transition-all ease-in-out w-full p-4 rounded-md text-dark shadow-md'
                        />
                    </label>
                    <button type='submit' disabled={!isFormValid} className='disabled:opacity-75 transition-all ease-in-out disabled:cursor-not-allowed w-full p-4 bg-blue rounded-md font-semibold text-light shadow-md'> {status === "loading" ? "Logging in..." : "Login"}</button>
                </div>
            </form>

            <div className='lg:w-6/12 lg:h-screen relative'>
                <span className='absolute w-4/6 h-full top-0 left-0 bg-gradient-to-r from-yellow to-transparent '></span>
                <span className='absolute w-full h-full top-0 left-0 bg-yellow opacity-15 '></span>
                <img className='w-full h-full object-cover' src={HeroImg} alt="Toll Road" width={"100%"} height={"100%"} />
            </div>
        </main>
    )
}

export default Login