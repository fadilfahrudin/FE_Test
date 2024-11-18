import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Layouts from '../components/Layouts'
import Dashboard from '../pages/Dashboard'
import Lalin from '../pages/Lalin'
import NotFound from '../pages/NotFound'
import MasterDataGerbang from '../pages/MasterGerbang'
import PublicRoute from '../components/PublicRoute'
import { Toaster } from "react-hot-toast";
const MainRoutes: React.FC = () => {
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
                <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />

                <Route element={<Layouts />}>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='lalin' element={<Lalin />} />

                    <Route path='master-data-gerbang' element={<MasterDataGerbang />} />
                </Route>

                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    )
}

export default MainRoutes