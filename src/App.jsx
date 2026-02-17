import React from 'react';
import Navbar from './components/Navbar.jsx';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import GetEachJobsDetails from './components/GetEachJobsDetails.jsx';
import ApplyJob from './components/ApplyJob.jsx';
import ContextAPI from './components/ContextAPI.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  return (
    <div>
      <BrowserRouter> 
      <ContextAPI>
      <Navbar />
                  <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
     

        <Route path="/" element={<Home />} >
        <Route path=':_id' element={< GetEachJobsDetails/>} /> 
         {/* // it means inside GetAllJobs with id goes to GetEach  JobsDetails */}
                {/* //route path and link to both refer to path in url element tells component */}
               
               <Route path="apply/:_id" element={<ApplyJob />} />
                {/* insteadof id we can use anyothr name nd that need nto tobe match with backend ..becaue in frontend and backedn we use them as paramenter to catch mongodb id..how it recognize menas by using : symbol it recognize it should be mongodb idof each document */}
                                                  
        
      
        <Route path="/GetEachJobsDetails/ApplyJob" element={<ApplyJob />} />
        </Route>

        </Routes>
        
        
        </ContextAPI>
        <Footer />

      </BrowserRouter>
     
    </div>
  );
};

export default App;