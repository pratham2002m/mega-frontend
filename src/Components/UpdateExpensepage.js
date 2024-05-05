import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const UpdateExpensepage = () => {

    const { eid } = useParams();
    const navigate = useNavigate();
    const targetRoute = '/dashboard';
    const [fetch,setFetch]=useState('');


    
    const [formData, setFormData] = useState({
      username: '',
      amount: 0,
      id : '',
      text: '',
      payment_mode: '',
      category: '',
      subcategory : '',
      transtype: ''
    });
  



    useEffect(() => {

       

      const fetchData = async () => {
        

        const storedToken = localStorage.getItem('userToken');
        const storedIDD = localStorage.getItem('idd');




          try
          {
              

              const response = await axios.post('http://localhost:8000/api/listspecificexpense/', 
              {
                id : storedIDD, 
                username : storedToken,              
              }, 

              {
                headers: 
                {
                  'Content-Type': 'multipart/form-data', 
                },
              }

            );

            setFormData({
              username: response.data.response[0].username,
              amount: response.data.response[0].amount,
              id: response.data.response[0].id,
              text: response.data.response[0].text,
              payment_mode: response.data.response[0].payment_mode,
              category: response.data.response[0].category,
              subcategory: response.data.response[0].subcategory,
              transtype: response.data.response[0].transtype
            });


            console.log(response.data.response);


          }
          catch(e)
          {

            console.log("error : ", e);

          };

      }
        
  
      fetchData();
    }, []);









      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
    
    
            const storedToken = localStorage.getItem('userToken');
            formData.username = storedToken;

            formData.id = eid;
    
            const response = await axios.post('http://localhost:8000/api/updateexpense/', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data', 
                },
            });

            


        
            console.log('update Expense Success:', response.data);
            localStorage.removeItem('idd');
            navigate('/dashboard');



            

          } catch (error) {
            console.error('Error:', error);
          };
      }
    
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      return (
        <div className="container mt-5"> 
          <h5><strong>Update Expenses </strong></h5>
          <hr/>
    
          <form onSubmit={handleSubmit}>
            <div className="">
              <label className="form-label">
                <input type="hidden" className="form-control" name="username" value={formData.username} onChange={handleChange} />
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label">
                <input type="hidden" className="form-control" name="id" value={formData.id} onChange={handleChange} />
              </label>
            </div>
    
            <div className="mb-3">
              <label className="form-label">
                Amount:
                <input type="number" className="form-control" name="amount" value={formData.amount} onChange={handleChange} />
              </label>
            </div>
    
            <div className="mb-3">
              <label className="form-label">
                Text:
                <input type="text" className="form-control" name="text" value={formData.text} onChange={handleChange} />
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Category:
                <input type="text" className="form-control" name="category" value={formData.category} onChange={handleChange} />
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Sub category:
                <input type="text" className="form-control" name="subcategory" value={formData.subcategory} onChange={handleChange} />
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Transaction Type:
                <input type="text" className="form-control" name="transtype" value={formData.transtype} onChange={handleChange} />
              </label>
            </div>
    
            <div className="mb-3">
              <label className="form-label">
                Payment Mode:
                <input type="text" className="form-control" name="payment_mode" value={formData.payment_mode} onChange={handleChange} />
              </label>
            </div>
    
    
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      );
}

export default UpdateExpensepage