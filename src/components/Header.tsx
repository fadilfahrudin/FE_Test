import { ArrowRightEndOnRectangleIcon, UserIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../utils/reduxHooks';
import { logout } from '../redux/slice/authSlice';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isHovered, setIsHovered] = useState({ logout: false, profile: false });
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login", { replace: true });
    };

    const onHovered = ({ isHovered, menu }: { isHovered: boolean, menu: "logout" | "profile" }) => {

        if (menu === "logout") {
            setIsHovered({ logout: isHovered, profile: false });
        } else if (menu === "profile") {
            setIsHovered({ logout: false, profile: isHovered });
        }
    }

    useEffect(() => {
        setUsername(user.username);
    }, [])


    return (
        <header className='w-full h-auto sticky top-0 z-10 flex items-center justify-between p-5 backdrop-blur-md'>
            <div>
                <h1 className='text-2xl text-dark font-bold'>Welcome, {username}</h1>
                <p className='text-sm text-dark'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, autem!</p>
            </div>
            <div className='w-[50px] relative h-auto rounded-lg  flex flex-col gap-2 items-center justify-center '>
                <button type='button' onClick={() => setIsOpen(!isOpen)} className='relative z-[2] w-[50px] h-[50px] rounded-full bg-yellow shadow-md flex flex-col items-center justify-around p-3'>
                    <span className={` ${isOpen ? "rotate-45 translate-y-0" : "rotate-0 -translate-y-1"} transition-all ease-in duration-300 w-4/6 h-[2px] absolute rounded-sm bg-darkGrey block opacity-75`}></span>
                    <span className={`${isOpen ? "-rotate-45 translate-y-0" : "rotate-0 translate-y-1"}  transition-all ease-in duration-300 w-4/6 h-[2px]  absolute rounded-sm  bg-darkGrey block opacity-75`}></span>
                </button>
                <button type='button' onMouseEnter={() => onHovered({ isHovered: true, menu: "profile" })} onMouseLeave={() => onHovered({ isHovered: false, menu: "profile" })} style={{ transform: isOpen ? "translateY(50px) rotate(0deg)" : "translateY(0) rotate(45deg)" }} className='shadow-md absolute rotate-45 z-[1]  m-auto p-2 bg-yellow rounded-full transition-all ease-in duration-300'>
                    <UserIcon className='w-6 h-6' />
                    {isHovered.profile && (
                        <div className="absolute w-max -translate-x-[120px] -translate-y-[30px] bg-light border  rounded shadow-md px-3 py-1">
                            <p className="text-sm text-gray-700">Your Profile</p>
                            <span className='absolute top-0 right-0 translate-x-[20px]  p-2 rotate-90'>
                                <svg fill="#E9E9E9" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlSpace="http://www.w3.org/1999/xlink" viewBox="0 0 511.509 511.509" stroke="#E9E9E9"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinejoin="round" ></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M498.675,493.845L265.16,5.568c-3.541-7.424-15.701-7.424-19.243,0L11.251,496.235c-1.579,3.307-1.344,7.189,0.597,10.283 s5.355,4.992,9.024,4.992h469.76c5.888,0,10.667-4.779,10.667-10.667C501.299,498.176,500.317,495.723,498.675,493.845z"></path> </g> </g> </g></svg>
                            </span>
                        </div>
                    )}
                </button>
                <button type='button' onMouseEnter={() => onHovered({ isHovered: true, menu: "logout" })} onMouseLeave={() => onHovered({ isHovered: false, menu: "logout" })} onClick={handleLogout} style={{ transform: isOpen ? "translateY(100px) rotate(0deg)" : "translateY(0) rotate(45deg)" }} className='shadow-md absolute rotate-45 z-[1]  m-auto p-2 bg-yellow rounded-full transition-all ease-in duration-300'>
                    <ArrowRightEndOnRectangleIcon className='w-6 h-6' />
                    {isHovered.logout && (
                        <div className="absolute -translate-x-[90px] -translate-y-[30px]  bg-light border  rounded shadow-md px-3 py-1">
                            <p className="text-sm text-gray-700">Logout</p>
                            <span className='absolute top-0 right-0 translate-x-[20px]  p-2 rotate-90'>
                                <svg fill="#E9E9E9" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlSpace="http://www.w3.org/1999/xlink" viewBox="0 0 511.509 511.509" stroke="#E9E9E9"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinejoin="round" ></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M498.675,493.845L265.16,5.568c-3.541-7.424-15.701-7.424-19.243,0L11.251,496.235c-1.579,3.307-1.344,7.189,0.597,10.283 s5.355,4.992,9.024,4.992h469.76c5.888,0,10.667-4.779,10.667-10.667C501.299,498.176,500.317,495.723,498.675,493.845z"></path> </g> </g> </g></svg>
                            </span>
                        </div>
                    )}
                </button>
            </div>
        </header>
    )
}

export default Header