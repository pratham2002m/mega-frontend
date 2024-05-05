import '../ComponentsStyling/DashboardPage.css'
import React, { useState, useEffect } from "react";
import axios from "axios";

import {
    LineChart,
    ResponsiveContainer,
    Legend,
    Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";





import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AllExpenses = () => {

        const [pdata, setPdata] = useState([]);
        const [minval, setMinval] = useState(0);
        const [maxval, setMaxval] = useState(0);
        const [selectedDate, setSelectedDate] = useState(null);


        const fetchData = async () => {

          const storedToken = localStorage.getItem('userToken');

            try {
              const response = await axios.post("http://localhost:8000/api/graphdata/", {
                username: 'pratham2002m',
              });
              // Assuming your API response has a 'data' property containing the data
              setPdata(response.data.response);
              setMinval(response.data.minval);
              setMaxval(response.data.maxval);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };

        const fetchDateData = async (date) => {

          const storedToken = localStorage.getItem('userToken');

            try {
              const response = await axios.post("http://localhost:8000/api/graphdatedata/", {
                username: storedToken,
                date: date,
              });
              console.log(date)
              setPdata(response.data.response);
              setMinval(response.data.minval);
              setMaxval(response.data.maxval);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };

        const handleDateChange = (date) => {
    
            if (date !== null) {
                setSelectedDate(date) ;
                fetchDateData(date);
                // You can perform additional actions with the selected date if needed
              } else {
                // Handle the case when the date is null (e.g., clear the selected date)
                fetchData();
              }
            // You can perform additional actions with the selected date if needed
          };
       
        useEffect(() => {
      
          fetchData();
        }, []); // Empty dependency array means this effect runs once when the component mounts
      
  return (
    <div className="container-fluid mt-5">
      
      <h6><strong>Expenses</strong></h6>
      <hr/>


      <div className="row mt-5">
        
        <div className="col-sm-5 offset-1">
        <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a date"
      />

    </div>
    </div>



{/* Row for budget */}
      <div className="row mt-5">
        
      
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={pdata} margin={{ right: 100 }}>
          <CartesianGrid />
          <XAxis dataKey="date" />
          <YAxis domain={[minval-1000, maxval+1000]} />
          <Legend />
          <Tooltip />
          <Line dataKey="amount" stroke="black" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

 
      </div>

      <hr/>

      {/* Row for filters and categories */}

      
    <hr/>




    
    
    </div>
    
    
    
  )
}

export default AllExpenses