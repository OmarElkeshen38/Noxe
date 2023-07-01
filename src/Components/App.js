import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Home from '../Components/Home/Home';
import About from '../Components/About/About';
import Tvshows from '../Components/Tvshows/Tvshows';
import Movies from '../Components/Movies/Movies';
import Details from '../Components/Details/Details';
import People from '../Components/People/People';
import Notfound from '../Components/Notfound/Notfound';
import Register from '../Components/Register/Register';
import Login from '../Components/Login/Login';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';


export default function App() {

  const [userData, setUserData] = useState(null);
  let navigate=useNavigate();

  function saveUserData() {
    let userToken = localStorage.getItem('userToken');
    setUserData(userToken);
  }

  function logout() {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('./login');
  }

  useEffect(() => {
    if(localStorage.getItem('userToken')!=null) {
      saveUserData();
    }
  }, []);

  function ProtectedRoute(props) {
    if(localStorage.getItem('userToken')===null) {
      return <Navigate to='/login' />
    } else {
      return props.children;
    }
  }

  return (
    <>
      <Navbar userData={userData} logout={logout} />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='home' element={<Home />}></Route>
        <Route path='movies' element={<ProtectedRoute><Movies /></ProtectedRoute>}></Route>
        <Route path='about' element={<About />}></Route>
        <Route path='tvshows' element={<ProtectedRoute><Tvshows /></ProtectedRoute>}></Route>
        <Route path='details' element={<ProtectedRoute><Details /></ProtectedRoute>}></Route>
        <Route path='people' element={<ProtectedRoute><People /></ProtectedRoute>}></Route>
        <Route path='login' element={<Login saveUserData={saveUserData} />}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path='*' element={<Notfound />}></Route>
      </Routes>
    </>
  )
}
