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
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
    

        <Route path="/" element={<Home />} >
        <Route path=':_id' element={< GetEachJobsDetails/>} /> 
         
         {/* // it means inside GetAllJobs with id goes to GetEach  JobsDetails */}
{/* 
Route path and Link to both refer to the URL path.

path="/login"  -> tells React Router which URL to match.
element={<Login />} -> tells React Router which component to render.

<Link to="/login"> -> changes the URL to /login.

It's best to use the same casing in both Link and Route
(e.g., /login everywhere).

Some setups/versions may still work when using /Login and /login,
but relying on that is not recommended.
*/}               
               {/* <Route path="apply/:_id" element={<ApplyJob />} /> */}
                {/* Links inside nested routes should be relative (to={${item._id}}) instead of absolute (to={/${item._id}}).  */}

                
                  {/* it(apply/:_id) should match to
                   navigate(`/apply/${id}`)
<Link to={`/apply/${id}`} />  
                               */}

                               {/* 
:_id is a URL parameter (dynamic value placeholder).
It does NOT automatically detect MongoDB id.
It just captures whatever is passed in the URL after /apply/.
We manually pass MongoDB _id from frontend and access it using useParams(). in backend we can use anyother name not necessary to use same name(_id) we use like /apply-job/:jobid and const jobId = req.params.jobid; 
*/}
        
      
        {/* <Route path="/GetEachJobsDetails/ApplyJob" element={<ApplyJob />} />                      */}
         {/* //same like above this router path should match with 'navigate' or 'Link to' if we use */}

        </Route>                          
        {/* //from Home to above </Route> nested route */}

        </Routes>
        
        
        </ContextAPI>
        <Footer />

      </BrowserRouter>
     
    </div>
  );
};

export default App;