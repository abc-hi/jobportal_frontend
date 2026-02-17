import React, { useEffect } from 'react'
import {useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import { useNavigate, useParams } from 'react-router-dom'


const ApplyJob = ({showForm,setShowForm,message,setMessage}) => {
    if (!showForm) return null;   // showForm === false → Apply form is hidden
const navigate = useNavigate()

    
// If showForm is false, the component renders nothing (null).Only when showForm is true (after you click the Apply button), the form will actually render.

const { _id } = useParams();   // get jobId from URL
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [exp, setExp] = useState('')
    const [location, setLocation] = useState('')
    const [age, setAge] = useState('');
    const [phoneNo, setPhoneno] = useState('')
   const [gender, setGender] = useState('')
    const [resume, setResume] = useState('')
    const [linkedIn, setLinkedIn] = useState('')
    const [portfolio, setPortfolio] = useState('')
    const [websites, setWebsites] = useState('')
    const [salary, setSalary] = useState('')
    const [expSummary, setExpSummary] = useState('')


    // to upload resume as file here we need to use formData, also in postman we go add details of applicant by form-data.if detials are text or numbers then we can use state or payload in frontend like in itemcatelog admin_create also in postman add applicant details by json

    const applyJobs = async (req, res) => {

        try {

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('exp', exp);
            formData.append('location', location);
            formData.append('age', age);
            formData.append('phoneNo', phoneNo);
            formData.append('gender', gender);
if (resume) formData.append('resume', resume);
            formData.append('linkedIn', linkedIn);
            formData.append('portfolio', portfolio);
formData.append('websites', websites); // backend splits comma into array
            formData.append('salary', salary);
            formData.append('expSummary', expSummary);
            formData.append('_id', _id); // job id
            

                const token = localStorage.getItem("token");

            // const res = await axios.post(`http://localhost:4000/api/apply-job/${_id}`, formData, {

                            const res = await axios.post(`https://jobportal-backend-x18f.onrender.com/api/apply-job/${_id}`, formData, {

                            headers: { Authorization: `Bearer ${token}`,'Content-Type': 'multipart/form-data' },

            })
            setMessage(res.data.message)
            console.log(res.data.message)

    alert("Job applied successfully");
        } catch (error) {
  if (error.response && error.response.status === 400) {
    // Already applied
    alert(error.response.data.message);
  } else {
    alert("Failed to submit application");
  }
}
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        applyJobs()
     

    }
    const handleCloseForm =(e)=>{
        setShowForm(false)
     
    }

    const countryOptions = [{ value: 'Ireland', label: 'ireland' }, { value: 'Island', label: 'Island' }, { value: 'Scotland', label: 'Scotland' }, { value: 'US', label: 'US' }, { value: 'UK', label: 'UK' }, { value: 'Netherland', label: 'Netherland' }, { value: 'Poland', label: 'Poland' }, { value: 'Scotland', label: 'Scotland' }]
    const genderOptions = [{ value: 'male', label: 'male' }, { value: "female", label: "female" }, { value: 'prefer not to say', label: 'prefer not to say' }]
               
return (
        <div style={{fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize:'19px'}}>
            {message}
            
            {/* Select is react Select not css select */}

                <form id='apply-form' onSubmit={handleFormSubmit}>
                <div style={{ display: 'grid' }}>
                    <label htmlFor="name">Enter your fullname:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    <label htmlFor="email">Enter your Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label htmlFor="exp">Enter your Experience:</label><input type="Number" value={exp} onChange={(e) => setExp(e.target.value)} required />
                    <label htmlFor="location">Select your location</label><Select options={countryOptions} onChange={(option) => setLocation(option.value)} required />
                    <label htmlFor="age">Enter your age:</label><input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
                    <label htmlFor="phoneNo"></label>Enter your PhoneNo<input type="number" value={phoneNo} onChange={(e) => setPhoneno(e.target.value)} required />
                    <label htmlFor="gender">Select your gender</label> <Select options={genderOptions} onChange={(option) => setGender(option.value)} required />
                   {resume? 'Change Resume' :  <label htmlFor="resume">Attach your resume</label>}
                                      <input type="file" onChange={(e) => setResume(e.target.files[0])} required />
                    <label htmlFor="linkedIn">Type your linkedIn URL:</label>
                    <input type="text" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} required />
                    <label htmlFor="portfolio">type your portfolio URL:</label>
                    <input type="text" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} required />
                    <label htmlFor="websites">Type your website URL:</label>
                    <input type="text" value={websites} onChange={(e) => setWebsites(e.target.value)} required />
                    <label htmlFor="salary">Enter your expected salary:</label>
                    <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required />
                    <label htmlFor="expSummary">Type your Experience Summary:</label>
                    <textarea value={expSummary} onChange={(e) => setExpSummary(e.target.value)} required />
                    <br />
                    <div style={{display:'flex',gap:'12px'}}>
                    <button style={{backgroundColor:'#4668b3',fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize:'19px', borderRadius:'3px',color:'#FFFFFF',padding: '14px',width: '120px',border:'none'}} type='submit'>Submit</button>
<button style={{backgroundColor:'#4668b3',fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize:'19px', borderRadius:'3px',color:'#FFFFFF',padding: '14px',width: '120px',border:'none'}} onClick={handleCloseForm} type='button'>Close</button>  </div>                                     

       
             
        </div>
      </form>
      {/* )} */}
    </div>
  )
}

export default ApplyJob