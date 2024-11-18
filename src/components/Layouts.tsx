import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import RouterProtector from './RouterProtector'

const Layouts: React.FC = () => {
    return (
        <RouterProtector>
            <section className='bg-gradient-to-br from-light to-white flex w-full min-h-screen'>
                <Sidebar />
                <section className='w-10/12 h-full'>
                    <Header />
                    <Outlet />
                </section>
            </section>
        </RouterProtector>
    )
}

export default Layouts