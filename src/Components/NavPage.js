import React, { useEffect } from 'react'
import '../ComponentsStyling/NavPage.css'
import { Link } from 'react-router-dom'


const Nav = () => {

    return(
   <>
    <div className="page-wrapper chiller-theme toggled">

  
  <nav id="sidebar" className="sidebar-wrapper">
    <div className="sidebar-content">
     
      <div className="sidebar-header">
        
        <div className="user-info">

        <h6>Expense-Tracker<img src="https://cdn-icons-png.flaticon.com/128/781/781831.png" 
        style={{
                width: '25px',
                height: '25px',
                marginLeft: '10px'
                }}/>
         </h6>

        </div>
      </div>
    
      <div className="sidebar-menu">

        <ul>

        <li className="sidebar-dropdown">
            <Link to="/login"><i className="fa fa-tachometer-alt"></i><span>Login</span></Link>
            <div className="sidebar-submenu">
            
            </div>
          </li>

          <li className="sidebar-dropdown">
            <Link to="/register"><i className="fa fa-tachometer-alt"></i><span>Register</span></Link>
            <div className="sidebar-submenu">
            
            </div>
          </li>

          <li className="sidebar-dropdown">
            <Link to="/dashboard"><i className="fa fa-tachometer-alt"></i><span>Dashboard</span></Link>
            <div className="sidebar-submenu">
            
            </div>
          </li>



          <li className="sidebar-dropdown">
            <Link to="/all_expenses"><i className="fa fa-shopping-cart"></i><span>All Expenses</span></Link>
            <div className="sidebar-submenu">
            </div>
          </li>

          <li className="sidebar-dropdown">
            <Link to="/all_contributors"><i className="fa fa-shopping-cart"></i><span>All Contributors</span></Link>
            <div className="sidebar-submenu">
            </div>
          </li>

          <li className="sidebar-dropdown">
            <Link to="/add_expense"><i className="fa fa-shopping-cart"></i><span>Add Expenses</span></Link>
            <div className="sidebar-submenu">
            </div>
          </li>

          <li className="sidebar-dropdown">
            <Link to="/pie"><i className="fa fa-shopping-cart"></i><span>Show Chart</span></Link>
            <div className="sidebar-submenu">
            </div>
          </li>


          <li className="sidebar-dropdown">
            <Link to="/add_pdf"><i className="fa fa-shopping-cart"></i><span>Add Expenses via PDF</span></Link>
            <div className="sidebar-submenu">
            </div>
          </li>
          

          <li className="sidebar-dropdown">
            <Link to="/user_manual"><i className="fa fa-shopping-cart"></i><span>User Manual</span></Link>
            <div className="sidebar-submenu">
            </div>
          </li>
          
      
          
          
        
        </ul>
      </div>

    </div>

    <p style={{color:'grey'}}><center>    </center></p>
    
  </nav>
    
  <main className="page-content">
    <div className="container-fluid">
      <hr/>
    </div>
  </main>
</div>
    
     </>
  )
}

export default Nav


