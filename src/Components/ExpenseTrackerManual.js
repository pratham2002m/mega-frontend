import React from 'react';
import '../ComponentsStyling/ExpenseTrackerManual.css'


const ExpenseTrackerManual = () => {
  return (
    <div className="container-fluid">

      <section className="section mt-5">
        <h5>1. Introduction</h5>
        <hr className="thick-line" />

        <div className="subsection mt-5">
          <h6>1.1 Purpose of the App</h6>
          <p>The Expense-desire is Expense Tracker App which is designed to help you manage your finances efficiently by tracking your income and expenses. It provides insights into your spending patterns, assists in budgeting, and offers a user-friendly interface for a seamless experience.</p>
        </div>

        <div className="subsection">
          <h6>1.2 Key Features</h6>
          <ol>
            <li>Expense Tracking: Easily log your daily expenses.</li>
            <li>Budgeting: Set and monitor monthly budgets.</li>
            {/* Add other features */}
          </ol>
        </div>

        <div className="subsection">
          <h6>1.3 Getting Started</h6>
          <p>To get started, download and install the app from the App Store or Google Play. Once installed, follow the steps in the subsequent sections to set up your account and start managing your expenses.</p>
        </div>
      </section>

      <section className="section mt-5">
        <h5>2. Account Setup</h5>
        <hr className="thick-line" />

        <hr/>


        <div className="subsection mt-5">
          <h6>2.1 Creating an Account</h6>
          <ol>
            <li>Open the app and click on "Create Account."</li>
            <li>Enter your email address and create a secure password.</li>
            {/* Add other steps */}
          </ol>
        </div>

        <div className="subsection">
          <h6>2.2 Logging In</h6>
          <ol>
            <li>Open the app and click on "Log In."</li>
            <li>Enter your registered email and password.</li>
            {/* Add other steps */}
          </ol>
        </div>

        <div className="subsection">
          <h6>2.3 Resetting Password</h6>
          <ol>
            <li>On the login screen, click on "Forgot Password."</li>
            <li>Enter your email address.</li>
            {/* Add other steps */}
          </ol>
        </div>
      </section>



      <section className="section mt-5">
        <h5>3. Dashboard</h5>
        <hr className="thick-line" />

    

        <div className="subsection mt-5">
          <h6>3.1 Overview</h6>
          <p>The dashboard provides a quick overview of your financial status, including total expenses, income, and budget progress.</p>
        </div>

        <div className="subsection">
          <h6>3.2 Total Expenses</h6>
          <p>Monitor your total expenses for the current month and view a breakdown by category.</p>
        </div>

        <div className="subsection">
          <h6>3.3 Monthly Summary</h6>
          <p>Access a summary of your monthly income, expenses, and savings.</p>
        </div>
      </section>

      <section className="section mt-5">
        <h5>4. Adding Expenses</h5>
        <hr className="thick-line" />

        


        <div className="subsection mt-5">
          <h6>4.1 Manual Entry</h6>
          <p>Manually enter your daily expenses by providing details such as amount, category, and notes.</p>
        </div>

        <div className="subsection">
          <h6>4.2 Photo Receipts</h6>
          <p>Take photos of your receipts to keep a visual record of your expenses.</p>
        </div>

        <div className="subsection">
          <h6>4.3 Categorizing Expenses</h6>
          <p>Categorize your expenses to easily track where your money is going.</p>
        </div>

        <div className="subsection mb-5">
          <h6>4.4 Adding Notes</h6>
          <p>Add additional notes to your expenses for better context and organization.</p>
        </div>
      </section>






    </div>
  );
};

export default ExpenseTrackerManual;
