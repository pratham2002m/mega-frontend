import '../ComponentsStyling/DashboardPage.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import UpdateExpensepage from './UpdateExpensepage';
import GaugeComponent from './GauageComponent';



const DashboardPage = () => {

  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValue2, setSelectedValue2] = useState('');
  const [data, setData] = useState([]);
  const [currentValue, setCurrentValue] = useState(0);
  const [limitValue, setLimitValue] = useState(0);
  

  const update = async(val1, val2) =>{

    try{
        const storedToken = localStorage.getItem('userToken');
        let obj = {
          "username": storedToken,
          "type": val1,
          "sortby": val2
        }

        const response = await axios.post('http://localhost:8000/api/listexpense/', obj );
        setData(response.data.response);

        
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
      };


  }





  

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    update(event.target.value, selectedValue2)

  };

  const handleFilterChange = (event) => {
    setSelectedValue2(event.target.value);
    update(selectedValue, event.target.value)
  };

  


  



  useEffect(() => {



    const fetchData = async () => {
      try {

        localStorage.removeItem("idd");
        const storedToken = localStorage.getItem('userToken');
        let obj = {
          "username": storedToken,
          "type": selectedValue,
          "sortby": selectedValue2
        }

        const response = await axios.post('http://localhost:8000/api/listexpense/', obj );
        setData(response.data.response);
        console.log(response.data.response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try {
        const storedToken = localStorage.getItem('userToken');

        const response = await axios.post('http://localhost:8000/api/monthlyexpense/', { username: storedToken });
        setCurrentValue(response.data.currexpense);
        setLimitValue(response.data.budget)
      } catch (error) {
        console.error('Error fetching data:', error);
      }


    };

    fetchData();
  }, []);

  const setIDD = (id) =>{
    console.log("setidd called");
    localStorage.setItem('idd', id);

  }
  
  const handleDeleteClick = async(id) => {
    console.log(`Deleting with parameter: ${id}`);

  
    
    try {
      const response = await axios.delete(`http://localhost:8000/api/deleteexpense/${id}`,);
      console.log('Delete successful', response);
    } catch (error) {
      console.error('Error deleting', error);
    };

    window.location.reload();





  };










  return (
    <>
    <div className="container-fluid mt-5">
      
      <h6><strong>Dashboard</strong></h6>
      <hr/>


{/* Row for budget */}
      <div className="row">
        
        <div className="col-sm-5 offset-1" >

          <h6><Link to="/add_expense"> New Expense</Link></h6>
          <img style={{height: "200px", width: "200px"}} src="https://cdn-icons-png.flaticon.com/128/10243/10243547.png" alt="Icon" />
          
        </div>

        <div className="col-sm-5 offset-1">
        <h6>Budget Cycle</h6>
          <GaugeComponent currentValue={currentValue} limitValue={limitValue}/>
        </div>

          
      </div>

      <hr/>

      {/* Row for filters and categories */}

      <div className="row mt-1">
        
        <div className="col-sm-4">
               
                <select className="form-control" id="dropdown" value={selectedValue} onChange={handleChange}>
                  <option value="">Select Category</option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                  <option value="">None</option>
                </select>
                <h6 className="mt-3"><b>Selected Category</b>: {selectedValue}</h6>

        </div>

        <div className="col-sm-4 offset-3">
               
               <select className="form-control" id="dropdown" value={selectedValue2} onChange={handleFilterChange}>
                 <option value="">Sort By</option>
                 <option value="amount">Amount</option>
                 <option value="date">Date</option>
                 <option value="category">Category</option>
                 <option value="">None</option>
               </select>
               <h6 className="mt-3"><b>Selected Sorted Category</b>: {selectedValue2}</h6>

       </div>

        <div className="col-sm-5 offset-1 ">

              {/* <form className="form-inline">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form> */}

          
      </div>


    </div>


  
     
     



    
    
    </div>



    <div className="mt-3 mb-5 ">
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Amount</th>
          <th>Date and Time</th>
          <th>Text</th>
          <th>Category</th>
          <th>Payment Mode</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((entry) => (
          <tr key={entry.id}>
            <td>{entry.amount}</td>
            <td>{new Date(entry.date).toLocaleString()}</td>
            <td>{entry.text}</td>
            <td>{entry.category}</td>
            <td>{entry.payment_mode}</td>
            <td className='row m-0' style={{ width: "230px" }}>
            <div className="col m-0 p-0">
              <Link to={`/update_expense/${entry.id}`} className="m-0 p-0">
                <button className="btn btn-success">Open</button>
              </Link>
            </div>
            <div className="col m-0 p-0">
              <button className="btn btn-danger m-0" onClick={() => handleDeleteClick(`${entry.id}`)}>
                Delete
              </button>
            </div>
          </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    
    
    </>
  )
}

export default DashboardPage