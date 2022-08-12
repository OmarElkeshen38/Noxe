import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

export default function Login(props) {
  let [user, setUser] = useState({
    email: "",
    password: ""
  });
  let [errorMsg, setErrorMsg] = useState('');
  let [errors, setErrors] = useState([]);
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function goToHome() {
    navigate('/home');
  }

  function validateForm() {
    const schema = Joi.object({
      email: Joi.string().required().email({ tlds: { allow: ['net', 'com'] } }),
      password: Joi.string().required().pattern(new RegExp(/^[a-z][0-9]{3,7}$/)),
    });
    return schema.validate(user, { abortEarly: false });
  }

  async function submitFormData(e) {
    e.preventDefault();
    setLoading(true);
    let validateResponse = validateForm();
    if (validateResponse.error) {
      // console.log(validateResponse.error.details);
      setErrors(validateResponse.error.details);
    } else {
      let { data } = await axios.post('https://routeegypt.herokuapp.com/signin', user);
      if (data.message === "success") {
        localStorage.setItem('userToken', data.token);
        props.savaUserData();
        goToHome();
      }
      else {
        // console.log(data.message);
        setErrorMsg(data.message.split(" ").splice(4, 20).join(" "));
      }
    }
    setLoading(false);
  }

  function getFormValue(e) {
    let myUser = { ...user }; //deep copy
    myUser[e.target.name] = e.target.value;
    setErrorMsg('');
    setErrors([]);
    setUser(myUser);
    // console.log(myUser);
  }

  function currError(key) {
    for (const err of errors) {
      if (err.context.key === key) {
        return err.message;
      }
    }
    return '';
  }

  return (
    <>
      <div className="register w-75 m-auto pt-5">
        <h1>
          Login Form
        </h1>
        <form onSubmit={submitFormData}>
          <div className="inp-gp my-4">
            <label htmlFor="email">Email:</label>
            <input onChange={getFormValue} type="email" name='email' className='form-control my-2' id='email' />
            {currError("email").length === 0 ? '' : <div className="text-danger">{currError("email")}</div>
            }
            {errorMsg ? <div className="text-danger">{errorMsg}</div> : " "}
          </div>
          <div className="inp-gp my-4">
            <label htmlFor="password">Password:</label>
            <input onChange={getFormValue} type="password" name='password' className='form-control my-2' id='password' />
            {currError("password").length === 0 ? '' :
              <div className="text-danger">
                <p>password must contain letters and numbers like "d123"</p>
              </div>
            }
          </div>
          <button className='btn btn-info'>
            {loading ? <i className='fas fa-spinner fa-spin'></i> : "Login"}
          </button>
          <p className='d-flex justify-content-center mt-3'>
            <span>
              New at NOXE ?
            </span>
            <span>
              
              <Link className="nav-link mx-2 text-info" to="/Register">Register</Link>
            </span>
          </p>
          {/* <div className="clr"></div> */}
        </form>
      </div>
    </>
  );
}
