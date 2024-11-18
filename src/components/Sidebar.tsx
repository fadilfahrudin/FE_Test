import React from 'react'
import Logo from "../assets/img/logo-jasamarga.png"
import Accordion from './Accordion'
import { Link, useLocation } from 'react-router-dom'
import { CircleStackIcon, ClipboardDocumentListIcon, PresentationChartBarIcon } from '@heroicons/react/24/outline'
const Sidebar: React.FC = () => {
    const { pathname } = useLocation()

    return (
        <aside className='lg:w-2/12 h-screen sticky top-0 p-3 '>
            <div className='w-full h-full bg-yellow rounded-lg p-2 shadow-md'>
                <img className='m-auto h-[46px] w-auto aspect-auto ' src={Logo} alt="Jasamarga" width={1000} height={1000} />

                <ul className='flex flex-col gap-3 mt-12'>
                    <li className={`px-3 py-2 rounded-md hover:bg-light transition-all ease-in duration-300 ${pathname === "/" ? "bg-light" : ""}`}>
                        <Link to="/" className={`hover:opacity-100 flex items-center gap-2 text-sm font-semibold  ${pathname === "/" ? "text-darkBlue opacity-100" : "text-darkGrey opacity-75"}`}>
                            <PresentationChartBarIcon className='w-5 h-5' />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Accordion className={`px-3 py-2 rounded-md hover:opacity-100 hover:bg-light transition-all ease-in duration-300 flex items-center justify-between w-full ${pathname === "/lalin" ?"text-darkBlue opacity-100" : "text-darkGrey opacity-75"}`} title="Laporan Lalin" icon={<ClipboardDocumentListIcon className='w-5 h-5' />}>
                            <div className="relative px-5 my-2">
                                <span className='w-[2px] h-full opacity-35 bg-darkGrey absolute transition-all ease-in duration-300'></span>
                                <ul className='flex flex-col gap-2'>
                                    <li>
                                        <Link to="/lalin" className={`ml-2 px-3 py-2 text-sm font-semibold block rounded-md hover:bg-light hover:opacity-100 transition-all ease-in duration-300${pathname === "/lalin" ? "text-darkBlue opacity-100 bg-light" : "text-darkGrey opacity-75"}`}>Laporan Per Hari</Link>
                                    </li>
                                </ul>
                            </div>
                        </Accordion>
                    </li>
                    <li className={`px-3 py-2 rounded-md hover:bg-light transition-all ease-in duration-300 ${pathname === "/master-data-gerbang" ? "bg-light" : ""}`}>
                        <Link to="/master-data-gerbang" className={`hover:opacity-100 flex items-center gap-2 text-sm font-semibold  ${pathname === "/master-data-gerbang" ? "text-darkBlue opacity-100" : "text-darkGrey opacity-75"}`}>
                            <CircleStackIcon className='w-5 h-5' />
                            Master Gerbang
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar