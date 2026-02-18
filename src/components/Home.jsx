import React from 'react';
// import GetAllJobs from './GetAllJobs.jsx';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import GetEachJobsDetails from './GetEachJobsDetails.jsx';
import { useState,useContext} from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import JobFilter from './JobFilter.jsx';
import {myContext} from './ContextAPI.jsx'
import Loading from './Loading.jsx';

const Home = () => {
  const navigate = useNavigate()
  const{AllJobs, setAllJobs,visibleFilteredJobs, setVisibleFilteredJobs} = useContext(myContext)
  

  const { _id } = useParams()
 

// At first:-visibleFilteredJobs = AllJobs
  // React Router stores dynamic URL values inside params,
  // 👉 and useParams() is the only way to read them inside a component.

  useEffect(() => {

    // axios.get("http://localhost:4000/api/getAll-Jobs/")
        axios.get("https://jobportal-backend-x18f.onrender.com/api/getAll-Jobs/")

      .then(res => {
        const jobs = res.data.data
        setAllJobs(jobs)
        setVisibleFilteredJobs(jobs)

        if (jobs.length > 0 && !_id)
          navigate(`${jobs[0]._id}`)
      })

      .catch(err => console.log("error"))
    // console.log(AllJobs)
  }, [])

  useEffect(() => {
    if (visibleFilteredJobs.length > 0) {
      navigate(`${visibleFilteredJobs[0]._id}`)
    }
  }, [visibleFilteredJobs])


    // const jobsToShow = visibleFilteredJobs.length > 0 ? visibleFilteredJobs : AllJobs;

  return (
    <div>
      <div
  style={{
    width: '100%',
    height: '400px',
    overflow: 'hidden',
    
  }}
>
  <img
    src="https://res.cloudinary.com/ddzertu1j/image/upload/c_crop,w_1280,h_650/v1768397351/ai-generated-8881552_1280_fjt4qa.jpg"
    className='flex border-2 rounded-md'
    alt="Banner"
    style={{
      display:'block',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center 5%'
    }}
  />
</div>

        <div className="page-container" style={{ backgroundColor: '#a6d8db71', padding: "20px" }}>
        <h1 style={{FontFamily: 'Roboto, sans-serif', fontWeight: 700,fontSize:'40px'}}>Welcome to JobConnect</h1><br />
        <p className="margin" style={{ marginLeft: "7rem" ,fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize:'20px'}}>Your gateway to exciting career opportunities!</p>
        <p className="margin" style={{ marginLeft: "7rem" ,fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize:'20px'}}>Whether you're looking to apply for positions or showcase your skills to top employers, you've come to the right place.</p>
        <p className="margin" style={{ marginLeft: "7rem" ,fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize:'20px'}}>Explore job listings, connect with employers, and take the next step in your career journey.</p>
        <p className="margin" style={{ marginLeft: "7rem" ,fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize:'20px'}}>Start your search now.!!!</p>        </div>
   
      {/* filter */}
      <JobFilter AllJobs={AllJobs} setAllJobs={setAllJobs} visibleFilteredJobs={visibleFilteredJobs} setVisibleFilteredJobs={setVisibleFilteredJobs} />
      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '40% 60%' ,backgroundColor:'#a6d8db71'}}>
      

        {/* LEFT SIDE – JOB LIST */}
        <div style={{ border: '1px solid gray',fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize:'19px' }}>
          {visibleFilteredJobs.length === 0 ? (
            <p style={{ padding: "10px" }}><Loading /></p>
          ) : (
            visibleFilteredJobs.map(job => (
              <div key={job._id}>
                <Link
                  to={`${job._id}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <p>{job.jobtitle} - {job.companyname}</p>
                  <p style={{ color: "grey", borderBottom: '1px solid #ccc' }}>
                    {job.jobtype} | {job.location}
                  </p>
                </Link>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE – JOB DETAILS */}
        <div style={{ border: '1px solid gray', padding: '20px' }}>
          <Outlet />
        </div>

  </div>
    </div>
  );
};

export default Home;


             









             




{/* grid start */ }
{/* <div style={{ display: 'grid', gridTemplateColumns:'40% 60%'}}>
    {/* letft side start */}
{/* <div style={{border:'1px gray solid'}}>
      {AllJobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        AllJobs.map((item, index) => {
          return (
            <div key={index}>
              <Link style={{textDecoration:'none', color:'black'}}to={`${item._id}`}><p>{item.jobtitle}-{item.companyname}</p> 
              <p style={{color:"grey",borderBottom:'2px solid #ccc'}}>{item.jobtype} {item.location}</p></Link> */} 

{/* //route path and link to both refer to path in url element tells component */ }
{/* Don’t render Home manually inside <BrowserRouter> — use it as a route layout.
Nested routes require Outlet to show children.
Links inside nested routes should be relative (to={${item._id}}) instead of absolute (to={/${item._id}}). */}
{/* 
            </div>
          )
        })
      )}
      </div> */}
{/* letft side end */ }


{/* right side start */ }
{/* <div style={{border:'1px gray solid',padding:'20px'}}>
      <Outlet />
      </div> */}
{/* right side end */ }

{/* </div> */ }
{/* grid ends */ }

