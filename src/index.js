import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import MultiStepForm from './multistepform';
import Orders from './Orders';
import Login from './Login';
import OrdersVendor from './OrdersVendor';
import Navbar from './navbar';
import reportWebVitals from './reportWebVitals';
import Cart from './Cart';
import Products from './products';
import NotFound from './404'
import Profile from './profile';

//const access = 1;
const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(localStorage.getItem('UserID'), localStorage.getItem('User_type'));
root.render(
    <>

        { /*{access ? <Navbar type={access} /> : <NavbarVendor />}*/}
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            transition={Slide}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <Router>
            {localStorage.getItem('UserID') == null ? "" : <Navbar type={localStorage.getItem('User_type')} />}
             <Routes>
            <Route path="msf" element={<MultiStepForm/> }/>
            {localStorage.getItem('UserID') == null ? <Route path="/*" element={<Login />} /> : 
                    <>
                    <Route path="/" element={localStorage.getItem('User_type') == "1" ?
                        <OrdersVendor userid={localStorage.getItem('UserID')} toast={toast} /> :
                            <App userid={localStorage.getItem('UserID')} toast={toast} />} />
                        <Route path="/products" element={localStorage.getItem('User_type') == "1" ? <Products userid={localStorage.getItem('UserID')} /> : <NotFound />} />
                        <Route path="/cart" element={localStorage.getItem('User_type') == "1" ? <NotFound /> : <Cart userid={localStorage.getItem('UserID')} toast={toast} />} />
                        <Route path="/orders" userid={localStorage.getItem('UserID')} element={localStorage.getItem('User_type') == "1" ? <NotFound /> : <Orders userid={localStorage.getItem('UserID')} />} />
                        <Route path="/profile" element={<Profile/>}/>
                   </>
                }
                </Routes>
            }
            </Router>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
