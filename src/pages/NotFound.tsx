import React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
    return (
        <section className='flex flex-col justify-center items-center h-screen'>
            <div className='text-3xl text-dark'>404</div>
            <Link to="/">Home</Link>
        </section>
    )
}

export default NotFound