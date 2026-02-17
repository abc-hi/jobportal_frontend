import React, { useContext,useState,useEffect } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import {Link, useParams } from 'react-router-dom'
import ApplyJob from './ApplyJob.jsx'
import Login from './Login.jsx'
import {myContext} from './ContextAPI.jsx'

const GetEachJobsDetails = () => {
    const{AllJobs, setAllJobs,visibleFilteredJobs, setVisibleFilteredJobs} = useContext(myContext)
  
  const navigate=useNavigate()
const[showForm,setShowForm] = useState(false)
const [message, setMessage] = useState('')
const{loggedIn,setLoggedIn} = useContext(myContext)
  const[eachJobs,setEachJobs] = useState()
  const {_id} = useParams()

  //fetchalljobs
const fetchEachJob = async(_id)=>{
  try {
  //  const res = await axios.get(`http://localhost:4000/api/getEach-Job/${_id}`)
      const res = await axios.get(`https://jobportal-backend-x18f.onrender.com/api/getEach-Job/${_id}`)

  
    setEachJobs(res.data.data)
    console.log(res.data.data)
   
  } catch (error) {
    console.log(error)
  }}

useEffect(()=>{
  fetchEachJob(_id)
},[_id])


const handleApplyClick=(()=>{
  if(loggedIn){

setShowForm(true)
 setTimeout(() => {
            document
                .getElementById("apply-form")
                ?.scrollIntoView({ behavior: "smooth" });
        }, 100);

  }
else
  navigate("/Login")

})

//savejobs
const saveJobs = async () => {

         try {
        const res=await axios.post(
            // "http://localhost:4000/api/save-job",
                        "https://jobportal-backend-x18f.onrender.com/api/save-job",

            { jobId: _id },
            {
                headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
                }
                }
            
        );
           setMessage(res.data.message)
            console.log(res.data.message)

    alert("Job saved successfully");
          
    } 
    
    catch (error) {
  if (error.response && error.response.status === 400) {
    // Already applied
    alert(error.response.data.message);
  } else {
    alert("Failed to save job");
  }
}
};

//sharejobs
 const shareTypeOptions=[{value:"linkedIn",label:"linkedIn"},{value:'twitter',label:'twitter'}]

const shareJobs = (platform) => {
  const jobUrl = window.location.href;

  if (platform === "linkedin") {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`,
      "_blank"
    );
  }

  if (platform === "twitter") {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(jobUrl)}`,
      "_blank"
    );
  }
};
const relatedJobs = AllJobs.filter(j =>
  j.jobtitle === eachJobs.jobtitle && j._id !== eachJobs._id
);



  return (
  <div>
{/* //applybottonontop */}
    <div style={{ display: 'flex', justifyContent: 'flex-end',fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize:'19px'}}>
           <button
  style={{
    backgroundColor: '#4668b3',
    borderRadius: '3px',
    color: '#fff',
    padding: '8px 16px',
    border: 'none'
  }}
  onClick={handleApplyClick}
>
  Apply
</button></div>


    <div>
      {!eachJobs ?
    (
    <p>No jobs found</p>
  ) :
    (
      // job details
       <div style={{fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize:'19px'}}>
                    <p><strong>Job Title: </strong>{eachJobs.jobtitle}</p>
                    <p><strong>Company Name: </strong>{eachJobs.companyname}</p>
                    <p><strong>Location: </strong>{eachJobs.location}</p>
                    <p><strong>JobType: </strong>{eachJobs.jobtype}</p>
                    <p><strong>Experience Level: </strong>{eachJobs.experienceLevel}</p>
                    <p><strong>Salary Range: </strong>{eachJobs.salaryRange}</p>
                    <p><strong>JobDescription: </strong>{eachJobs.jobDescription}</p>
                    <p><strong>Required Skills: </strong>{eachJobs.requiredSkills}</p>
                    <p><strong>Preferred Skills: </strong>{eachJobs.preferredSkills}</p>
                    <p><strong>JobCatagory: </strong>{eachJobs.jobcategory}</p>
                    <p><strong>Job Posted Date: </strong>{eachJobs.jobPostedDate}</p>
                    <p><strong>Application DeadLine: </strong>{eachJobs.applicationDeadline}</p>
                    <p><strong>Number Of Openings: </strong>{eachJobs.numberOfOpenings}</p>
                    <p><strong>Status: </strong>{eachJobs.status}</p>


                </div>

            )}


<br />
{/* job summary */}
            {/* bottom left part of geteachjobdetails */}
            <hr className="my-4"/>
            {/* my-4 = margin top & bottom (spacing) */}
{/* fw-bold mb-3- for line */}
            <div style={{display:'flex',gap:'14rem'}}>

            <div><h4 className="fw-bold mb-3" style={{fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize:'20px', color:'red'}}>Job Summary</h4>
            {!eachJobs ? (
                <p>No jobs found</p>
            ) : (
            <div style={{fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize:'16px'}}><p><strong>Job Title: </strong>{eachJobs.jobtitle}</p>
                    <p><strong>Company Name: </strong>{eachJobs.companyname}</p>
                    <p><strong>Location: </strong>{eachJobs.location}</p>
                    <p><strong>JobType: </strong>{eachJobs.jobtype}</p>
                    <p><strong>Experience Level: </strong>{eachJobs.experienceLevel}</p>
                    <p><strong>Salary Range: </strong>{eachJobs.salaryRange}</p>
                    <p><strong>JobCatagory: </strong>{eachJobs.jobcategory}</p>
                    <p><strong>Number Of Openings: </strong>{eachJobs.numberOfOpenings}</p>
                    <p><strong>Status: </strong>{eachJobs.status}</p></div>
            )}</div>

  {/*bottom right part of geteachjobdetails -buttons for apply,save,share*/}
<div style={{display:'flex',gap:'2rem',alignItems:'center',fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize:'19px'}}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end',fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize:'19px'}}>
           {/* apply button */}
           <button
  style={{
    backgroundColor: '#4668b3',
    borderRadius: '3px',
    color: '#fff',
    padding: '8px 16px',
    border: 'none'
  }}
  onClick={handleApplyClick}
>
  Apply
</button></div>
 {/* saveJobs()-This calls the function immediately when React renders, instead of waiting for the click. */}

{/* share button */}
<div className="dropdown">
  <button 
    className="btn btn-primary dropdown-toggle"style={{ backgroundColor: '#4668b3',
    borderRadius: '3px',
    color: '#fff',
    padding: '8px 16px',
    border: 'none'}}
    //btn btn-primary dropdown-toggle"- It adds a little caret (arrow) and tells Bootstrap that this button toggles a dropdown menu.
    type="button"
    id="shareDropdown"
    data-bs-toggle="dropdown"
    // data-bs-toggle="dropdown"-Tells Bootstrap’s JavaScript that clicking this button should toggle the dropdown menu.
    aria-expanded="false"
    //  aria-expanded="false"- Indicates whether the dropdown menu is currently open (true) or closed (false).
  >
    Share
  </button>
  <ul className="dropdown-menu" aria-labelledby="shareDropdown">
    <li>
      <button className="dropdown-item" onClick={() => shareJobs("linkedin")}>
        LinkedIn
      </button>
    </li>
    <li>
      <button className="dropdown-item" onClick={() => shareJobs("twitter")}>
        Twitter
      </button>
    </li>
  </ul>
</div>

{/* save button */}
{loggedIn  ? ( <button style={{backgroundColor:'#4668b3', borderRadius:'3px',color:'#FFFFFF', padding: '8px 16px',border:'none'}}onClick={()=>saveJobs()}>Save</button>) :  (<button
    style={{
       backgroundColor: '#4668b3',
    borderRadius: '3px',
    color: '#fff',
    padding: '8px 16px',
    border: 'none'
    }}
    onClick={() => navigate("/login")}
  >
  Save
  </button>)} </div>

</div>
       </div>

    
{/* related filtered jobs */}
 <div>
      <h4 className="fw-bold mb-3" style={{fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize:'20px', color:'red'}}>Related Jobs</h4>
      {relatedJobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        relatedJobs.map(job => (
          <div key={job._id}>
           <Link
          to={`/${job._id}`} // <-- route to this job's details
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <p>
            <strong>{job.jobtitle}</strong> - {job.companyname}
          </p>
        </Link>
        <p>{job.location} | {job.jobtype}</p>
          </div>
        ))
      )}
    </div>


<ApplyJob showForm={showForm} setShowForm={setShowForm} message={message} setMessage={setMessage}/>
           

    </div>
    
    )}
    
  
  

export default GetEachJobsDetails