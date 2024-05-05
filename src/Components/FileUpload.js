import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [data, setData] = useState([]);


    const handleAddExpense = async () => {

      const username = localStorage.getItem('userToken');


      try {
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          let formData = {
            "username": username,
            "amount": element["amount"],
            "text": element["description"],
            "transtype": element["transtype"],
            "category": "Miscellaneous",
            "subcategory": "Bank Transaction",
            "payment_mode": "online"
          }
          const response = await axios.post('http://localhost:8000/api/createexpense/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        });
        console.log(response.data);
        
        }
      } catch (error) {
        console.error('Error adding expense:', error);
      }
    };

    const handleInputChange = (value, index, field) => {
      // Create a copy of the data state
      const newData = [...data];
      // Update the value of the specified field for the item at the given index
      newData[index][field] = value;
      // Update the data state with the modified copy
      setData(newData);
    };
    

  const renderTableData = () => {
    let tableRows = []; // Array to accumulate table rows
  
    for (let i = 0; i < data.length; i++) {
        // Generate table row for each item in the list
        tableRows.push(
          <tr key={`${data[i]}`}>
            <td><input
                type="text"
                value={data[i]["description"]}
                onChange={(e) => handleInputChange(e.target.value, i, "description")}
                style={{ width: "500px" }}
              /></td>
            <td>
              <input
                type="text"
                value={data[i]["amount"]}
                onChange={(e) => handleInputChange(e.target.value, i, "amount")}
                style={{ width: "100px" }}
              />
            </td>
            <td>
            <input
                type="text"
                value={data[i]["transtype"]}
                onChange={(e) => handleInputChange(e.target.value, i, "transtype")}
                style={{ width: "100px" }}
              />
            </td>
          </tr>
        );
      }
    ;
  
    return tableRows; // Return the accumulated table rows
  };

  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (selectedFile) 
      {
        const formData = new FormData();
        formData.append('file', selectedFile);
        const storedToken = localStorage.getItem('userToken');
        formData.append('username', storedToken);
  
        try {
          const response = await axios.post('http://localhost:8000/api/pdfextract/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
  
          console.log('Upload successful:', response.data);
          setData(response.data.response)
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    };
  
    return (
      <div className="container mt-5">
        <h6><b>Upload Transaction PDF</b></h6>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className="form-control mt-5"
              type="file"
              onChange={handleFileChange}
              accept=".pdf"
              required
            />
          </div>
          <button className="btn btn-success mt-5" type="submit">Upload PDF</button>
        </form>


        <div className="container-fluid mt-5 mb-5">
          <h6><b>Bank Transactions</b></h6>
          <table className="table">
            <tbody>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Type</th>
              </tr>
              {renderTableData()}
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={handleAddExpense}>Add Expense</button>

        </div>


      </div>

      

    );
}

export default FileUpload