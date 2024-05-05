import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddExpensePage = () => {


  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [contributions, setContributions] = useState([]);


  const [formData, setFormData] = useState({
    username: '',
    amount: 0,
    text: '',
    transtype: 'expense',
    category: '',
    subcategory: '',
    payment_mode: 'None',
    expsentence:'',
    text:''

  });



  async function makePostRequest(usern, am) 
  {

    const storedToken = localStorage.getItem('userToken');
    const transid = localStorage.getItem('transid');
    const url = 'http://localhost:8000/api/updatedebts/';
    const obj={
      username:storedToken,
      contributor:usern,
      contri:{"contri": am, "transid":transid},

      update:JSON.stringify(false)
    }

    try {
        const response = await axios.post(url, obj,{
          headers: {
            'Content-Type': 'application/json', 
          },
        });

        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
}


  const handleClicks = async() => {

    const transformedContributions = [];


    contributions.length > 0 && contributions.map((contribution) => (
        contributions && Object.entries(contribution).map(([username, amount]) => (
               transformedContributions.push({username,amount})
        ))));

        console.log(transformedContributions);

        for (const contribution of transformedContributions) {
          await makePostRequest(contribution.username, contribution.amount);
      }

      alert("Collaboration added successfully!")

  }



  const handleKeyDown = async (e) => {

    if(e.key === 'Enter')
    {

    try {

      
        const storedToken = localStorage.getItem('userToken');


        const formsData={
          expsentence:e.target.value,
          username:storedToken
        }



        const response = await axios.post('http://localhost:8000/api/categorize/', formsData, {
          headers: {
            'Content-Type': 'application/json', 
          },
        });

        console.log(response.data.response.expenses[0]);

        const responses=response.data.response.expenses[0]




        const transactionData = {
          username: storedToken,
          amount: JSON.stringify(responses.amount),
          category:  responses.category,
          subcategory:  responses.subcategory,
          text:  responses.text,
          transtype:  responses.transtype,
          payment_mode:  responses.payment_mode
      };

       setFormData(transactionData);



       if(!Array.isArray(response.data.response.contributions))
       {
            setContributions([response.data.response.contributions]);
       }
       else
       {
            setContributions(response.data.response.contributions);
       }


        
        
      


    
      //   console.log('add Expense Success:', response.data);
      } catch (error) {
        console.error('Error:', error);
      };

    }
  }
  const handlesChange = (event) => {
    setInputValue(event.target.value);
  };
  





  ////////////////////////////////////////////////////

  const navigate = useNavigate();




 



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        console.log(typeof formData.amount);

        formData.text=inputValue;
        
        if(formData.payment_mode== ''){
            formData.payment_mode='online';
        }

        const storedToken = localStorage.getItem('userToken');
        formData.username = storedToken;

        const response = await axios.post('http://localhost:8000/api/createexpense/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        });

        localStorage.setItem("transid", response.data.id)

        console.log(localStorage.getItem("transid"))
    
        console.log('add Expense Success:', response.data);
        alert("Transaction added successfully!")

        //navigate('/dashboard');
      } catch (error) {
        console.error('Error:', error);
        navigate('/add_expense');
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
      <h6><strong>Add Expenses </strong></h6>
      <hr/>

      <div className="mb-3">
          <label className="form-label">
            Desc:
            <input type="text" className="form-control" onKeyDown={handleKeyDown} name="expsentence" value={inputValue} onChange={handlesChange} />
          </label>
        </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
<input type="hidden" className="form-control" name="username" value={formData.username}  onChange={handleChange} />
          </label>
        </div>

        <div className="mb-3">
        <label className="form-label">
          Trans Category:
          <select className="form-select" name="transtype" value={formData.transtype} onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
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
            Category:
            <input type="text" className="form-control" name="category" value={formData.category} onChange={handleChange} />
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Sub-Category:
            <input type="text" className="form-control" name="subcategory" value={formData.subcategory} onChange={handleChange} />
          </label>
        </div>

        <div className="mb-3">
        <label className="form-label">
          Payment Mode: &nbsp;&nbsp;
          <select className="form-select" name="payment_mode" value={formData.payment_mode} onChange={handleChange}>
            <option value="None">--Select--</option>
            <option value="hard cash">Hard Cash</option>
            <option value="online">Online</option>

          </select>
        </label>
      </div>


       
        <button type="submit" className="btn btn-success mb-5">Add</button>
      </form>


    
      {contributions.length > 0 && contributions.map((contribution, index) => (
        <div key={index}>
          {contributions && Object.entries(contribution).map(([username, amount]) => (
            <div className="tableDyna" key={username}>
              <label className htmlFor={username}>{username}</label>
              <input
                type="number"
                className="form-control"
                id={username}
                name={username}
                value={amount || ''}
                onChange={handleChange}
                placeholder="Enter amount"
              />
            </div>
          ))}
        </div>


      ))}

      <button className="btn btn-success mt-2" onClick={handleClicks}>
        Add Debts
      </button>




    </div>
  );
}

export default AddExpensePage;
