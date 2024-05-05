import { Link } from 'react-router-dom'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const AllContributors = () => {

  const [data, setData] = useState({});

  useEffect(() => {



    const fetchData = async () => {
      try {

        const storedToken = localStorage.getItem('userToken');
        var obj = {
          username: storedToken
        }
        const response = await axios.post('http://localhost:8000/api/getdebts/', obj);
        console.log(response.data.response);
        setData(response.data.response);


      } catch (error) {
        console.error('Error fetching data:', error);
      }



    };

    fetchData();
  }, []);




  const handleInputChange = (value, key, contributionId) => {
    // Find the index of the contribution in the data array
    const contributionIndex = data[key].findIndex(contribution => contribution.id === contributionId);
    if (contributionIndex !== -1) {
      // Create a copy of the data state
      const newData = { ...data };
      // Update the value of the contribution in the copy
      newData[key][contributionIndex].contri = value;
      // Update the data state with the modified copy
      setData(newData);
    }
  };
  

  async function handleUpdate(usern, contridata, updat) {

    console.log(contridata)

    const storedToken = localStorage.getItem('userToken');
    const url = 'http://localhost:8000/api/updatedebts/';
    const obj = {
      username: storedToken,
      contributor: usern,
      contri: {"contri": Number(contridata["contri"]), "transid": contridata["id"]},
      update: updat
    }

    try {
      const response = await axios.post(url, obj, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response:', response.data);
      window.location.reload();


    } catch (error) {
      console.error('Error:', error);
    }
  }


  const renderTableData = () => {
    let tableRows = []; // Array to accumulate table rows
  
    Object.keys(data).forEach((key, index) => {
      for (let i = 0; i < data[key].length; i++) {
        // Generate table row for each item in the list
        tableRows.push(
          <tr key={`${data[key][i]["id"]}_${i}_${key}`}>
            <td>{key}</td>
            <td>
              <input
                type="text"
                value={data[key][i]["contri"]}
                onChange={(e) => handleInputChange(e.target.value, key, data[key][i]["id"])}

              />
            </td>
            <td>
            {data[key][i]["date"]}
            </td>
            <td>
            {data[key][i]["text"]}
            </td>
            <td>
              <button className="btn btn-success" onClick={async () => handleUpdate(key, data[key][i], 'True')}>Update</button>
            </td>
          </tr>
        );
      }
    });
  
    return tableRows; // Return the accumulated table rows
  };
  



  return (
    <div className="container-fluid mt-5 mb-5">
      <h6><b>Contributors</b></h6>
      <table className="table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Date</th>
            <th>Description</th>
            <th>Action</th>


          </tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  )
}

export default AllContributors