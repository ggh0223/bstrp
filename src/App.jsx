import React, { lazy, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { themeChange } from 'theme-change';
import checkAuth from './app/auth';
import initializeApp from './app/init';
// import RegisterCompany from "./pages/RegisterCompany";

// Importing pages
const Layout         = lazy(() => import('./containers/Layout'))
const Login          = lazy(() => import('./pages/Login'))
// const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
// const ResetPassword  = lazy(() => import('./pages/ResetPassword'))
// const Register       = lazy(() => import('./pages/Register'))


// Initializing different libraries
initializeApp()


// Check for login and initialize axios
const token = checkAuth()


function App() {
    useEffect(() => {
        // 👆 daisy UI themes initialization
        themeChange(false)
    }, []);

    return (<>
            <Router>
                <Routes>
                    <Route path="/login" element={ <Login/> }/>
                    {/*<Route path="/forgot-password" element={ <ForgotPassword/> }/>*/}
                    {/*<Route path="/reset-password/:token" element={ <ResetPassword/> }/>*/}
                    {/*<Route path="/register" element={ <Register/> }/>*/}
                    {/*<Route path="/register-company" element={ <RegisterCompany/> }/>*/}

                    {/* Place new routes over this */ }
                    <Route path="/app/*" element={ <Layout/> }/>

                    <Route path="*" element={ <Navigate to={ token ? "/app/ad-complete" : "/login" } replace/> }/>

                </Routes>
            </Router>
        </>)
}

export default App