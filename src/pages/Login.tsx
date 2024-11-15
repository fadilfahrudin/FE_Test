import React from 'react'
import HeroImg from "../assets/img/toll-road.jpg"
import LogoJasaMarga from "../assets/img/logo-jasamarga.png"
const Login: React.FC = () => {
    return (
        <main className='flex justify-center items-center h-screen bg-light'>
            <form className='lg:w-6/12 flex flex-col gap-9'>
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
                            className='outline-none focus:outline-none focus:shadow-sm transition-all ease-in-out w-full p-4 rounded-md text-dark shadow-md'
                        />
                    </label>
                    <button type='submit' disabled className='disabled:opacity-50 transition-all ease-in-out disabled:cursor-not-allowed w-full p-4 bg-yellow rounded-md font-semibold text-dark shadow-md'>Login</button>
                </div>
            </form>

            <div className='lg:w-6/12 lg:h-screen relative'>
                <span className='absolute w-3/6 h-full top-0 left-0 bg-gradient-to-r from-light to-transparent '></span>
                <span className='absolute w-full h-full top-0 left-0 bg-light opacity-15 '></span>
                <img className='w-full h-full object-cover' src={HeroImg} alt="Toll Road" width={"100%"} height={"100%"} />
            </div>
        </main>
    )
}

export default Login