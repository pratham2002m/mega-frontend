import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './Components/NavPage';
import DashboardPage from './Components/DashboardPage';
import RegisterUserPage from './Components/RegisterUserPage';
import LoginUserPage from './Components/LoginUserPage';
import AddExpensePage from './Components/AddExpensePage';
import AllExpenses from './Components/AllExpenses';
import UpdateExpensepage from './Components/UpdateExpensepage';
import ExpenseTrackerManual from './Components/ExpenseTrackerManual';
import FileUpload from './Components/FileUpload';
import AllContributors from './Components/AllContributors';
import ShowPieChart from './Components/ShowPieChart';


function App() {
  return (
    <>
  <Router>
     


      <div className="d-flex flex-row">
        <div className="col-3">
          <Nav />
        </div>
        <div className="col-9">
          <div className="row">
            <Routes>

            {/* User creation and authentication */}
            <Route path="/register" exact element={<RegisterUserPage />} />
            <Route path="/login" exact element={<LoginUserPage/>} />

            {/* Expense stuffs */}
            <Route path="/dashboard" exact element={<DashboardPage />} />

            {/* Crud for expenses */}
            <Route path="/add_expense" exact element={<AddExpensePage/>} />
            <Route path="/add_pdf" exact element={<FileUpload/>} />
            <Route path="/all_expenses" exact element={<AllExpenses/>} />
            <Route path="/all_contributors" exact element={<AllContributors/>} />
            <Route path="/update_expense/:eid" exact element={<UpdateExpensepage/>} />
            <Route path="/pie" exact element={<ShowPieChart/>} />



            {/* Usermanual */}

            <Route path="/user_manual" exact element={<ExpenseTrackerManual/>} />



            </Routes>
          </div>
        </div>
      </div>
    </Router> 

     </>

  );
}

export default App;
