import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Movies from './components/Movies/Movies';
import Tvshows from './components/Tvshows/Tvshows';
import People from './components/People/People';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Logout from './components/Logout/Logout';
import Details from './components/Details/Details';
import { Routes,Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

function App() {
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();

  function savaUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }
  function logout() {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login');
  }
  useEffect(() => {
    if (localStorage.getItem('userToken')!=null) {
      savaUserData();
    }
  }, []);
  
  function ProtectedRoute(props) {
    if (localStorage.getItem('userToken') == null) {
      return <Navigate to='/login'/>
    }
    else {
      return props.children;
    }
  }
  return (
    <>
      <Navbar userData={userData} logout={logout}/>
      <div className="container">
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
          <Route path='Noxe' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
          <Route path='home' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
          <Route path='movies' element={<ProtectedRoute><Movies/></ProtectedRoute>}></Route>
          <Route path='tvshows' element={<ProtectedRoute><Tvshows/></ProtectedRoute>}></Route>
          <Route path='people' element={<ProtectedRoute><People/></ProtectedRoute>}></Route>
          <Route path='login' element={<Login savaUserData={savaUserData}/>}></Route>
          <Route path='register' element={<Register/>}></Route>
          <Route path='logout' element={<Logout/>}></Route>
          <Route path='details' element={<Details/>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
