import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RegisterUserPage = () => {

  const navigate = useNavigate();
  const targetRoute = '/login';



  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    email :''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:8000/api/register/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        });
    
        console.log('Registration Success:', response.data);
        navigate('/login');

      } catch (error) {

        console.error('Error:', error);
        navigate('/register')
      };

    }


  return (
    <div className="container-fluid mt-5 mb-5 pt-5 pb-5" style={{background:'yellow',width:'90%'}}>

    <h6><strong>User Registration</strong></h6>
      <hr/>

      <div className="row">

      <div className="col-5 offset-1">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXZnyH2UXkXDTvVQMGN02MhPRsp3YtLdMPdw&usqp=CAU" style={{height:'90%', width: '100%'}}/>
      </div>

      <div className='col-4 offset-1'>

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
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          className="form-control"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
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
        Register
      </button>
      </form>

      </div>
      
      </div>

      <hr className='mt-5'/>

    </div>
  );
}

export default RegisterUserPage;
