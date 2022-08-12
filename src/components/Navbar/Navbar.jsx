import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <nav className={`${styles.navbarbgcolor} navbar navbar-expand-lg`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">NOXE</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {props.userData?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link btn" to="home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn" to="movies">Movies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn" to="tvshows">Tv shows</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn" to="people">People</Link>
            </li>
          </ul>:''}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <div className="social-icons d-flex align-items-center">
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-spotify'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-youtube'></i>
            </div>
            {props.userData?
            <li className="nav-item">
              <a onClick={props.logout} className="nav-link btn">Logout</a>
            </li>:
            <>
            <li className="nav-item">
              <Link className="nav-link btn" to="login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn" to="register">Register</Link>
            </li>
            </>
            }
          </ul>
        </div>
      </div>
</nav>
  );
}
