import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const LoginUserPage = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:8000/api/login/', formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          console.log(formData.username)

          const userToken = formData.username;
          localStorage.setItem('userToken', userToken);
          
          console.log('Login Success:', response.data.response);        
          
        //   const usernameToken = response.data.response
        //   localStorage.setItem('authToken', authenticatedToken);

        navigate('/dashboard');


        } catch (error) {
          console.error('Error:', error);
        }



      };


    
      return (
        <div className="container-fluid mt-5 mb-5 pt-5 pb-5" style={{background:'yellow',width:'90%'}}>
          <h6>
            <strong>User Login</strong>
          </h6>
          <hr />

          <div className="row">

          <div className="col-5 offset-1">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXZnyH2UXkXDTvVQMGN02MhPRsp3YtLdMPdw&usqp=CAU" style={{height:'100%', width: '100%'}}/>
      </div>

          <div className="col-4 offset-1">

          
    
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
    
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>

           </div>
          </div>
          <hr className='mt-5'/>

        </div>
      );
}

export default LoginUserPage