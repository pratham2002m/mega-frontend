import { Link } from 'react-router-dom'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);


const ShowPieChart = () => {


    const [data, setData]=useState([]);
    const [choose, setChoose]=useState(false);

    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    const chartOptions = {
        animation: {
          duration: 0 // Disable animations
        },
        hover: {
            animationDuration: 0 // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0 ,
        responsive: false,
        maintainAspectRatio: true, // Set to false to allow custom height
        // height: 400 // Speci
      };
      

    useEffect(() => {



        const fetchData = async () => {
          try {
            
            const storedToken = localStorage.getItem('userToken');
            var obj={
                username : storedToken
            }
            const response = await axios.post('http://localhost:8000/api/getcategories/', obj);
            setOptions(response.data.response);
            // setData(response.data.response);



          } catch (error) {
            console.error('Error fetching getcategories:', error);
          }
    
         
    
        };
    
        fetchData();
      }, []);


      const call_pie=async(selectedVal)=>{

        try{

        const storedToken = localStorage.getItem('userToken');
        var obj={
            username : storedToken,
            category : selectedVal
        }
        const response = await axios.post('http://localhost:8000/api/categorydata/', obj);
        console.log(response.data.response);


        const arr=[];

        var data=response.data.response;

        Object.keys(data).map((key, index)=>{
                 
            const obj={
                label : key,
                percentage: data[key],
            }

            arr.push(obj);


        });

        console.log("arrays!")

        console.log(arr);

        setData(arr);





        setChoose(true);


      } catch (error) {
        console.error('Error fetching data:', error);
      }


      };

      const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        call_pie(event.target.value);

      };





      /////

      const generateRandomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
      };
    


      const chartData = {
        labels: data.map(item => item.label),
        datasets: [
          {
            data: data && data.map(item => item.percentage),
            backgroundColor: data.map(() => generateRandomColor()),
          },
        ],
      };


  return (
    <>
    <div className="container-fluid mt-5 mb-5">
     <h6><b>Show Chart</b></h6>

      <select className="form-control" value={selectedOption} onChange={handleSelectChange}>
        <option value="sel">--Select--</option>
        {options.map((option) => (
          <option key={option.id} value={option}>
            <h4 className='bg-info'>{option}</h4>
          </option>
        ))}
      </select>
      <h6 className="mt-3">{selectedOption && <p>Selected option: {selectedOption}</p>}</h6>
     </div>

     <div className="container-fluid mt-5 mb-5">
            <div className="row">  
            <div className="col-3 offset-3">
               {choose && data.length>0 && <Pie data={chartData} options={chartOptions} />}
            </div>
    </div>

     </div>


     </>


  )
}

export default ShowPieChart