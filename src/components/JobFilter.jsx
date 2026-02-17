import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'
import { Placeholder } from 'react-select/animated'


const JobFilter = ({AllJobs,setAllJobs,visibleFilteredJobs,setVisibleFilteredJobs}) => {
  const navigate = useNavigate()

const [jobLocation,setJobLocation] = useState(null)
const[jobType,setJobType] = useState(null)
const[jobTitle,setJobTitle] =useState('')

    const jobLocationOptions=[{value:'ireland', label:'ireland'},{value:'scotland', label:"scotland"},{value:'poland', label:"poland"},{value:'UK', label:"UK"},{value:'US', label:"US"},{value:'netherland', label:"netherland"},{value:'island', label:"island"}]
    const jobTypeOptions=[{value:"permanent",label:"permanent"},{value:'contract',label:'contract'}]

    const normalize = value => value?.toLowerCase().trim()


    const handleSearch = () => {
  const filteredJobs = AllJobs.filter(job => {
    const locationMatch =
      !jobLocation || normalize(job.location) === normalize(jobLocation)

    const typeMatch =
      !jobType || normalize(job.jobtype) === normalize(jobType)

    const titleMatch =
      !jobTitle || normalize(job.jobtitle).includes(normalize(jobTitle))

    return locationMatch && typeMatch && titleMatch
  })

  setVisibleFilteredJobs(filteredJobs)
}



const handleReset = () => {
setJobLocation(null)  
setJobType(null)
  setJobTitle('')
    setVisibleFilteredJobs(AllJobs);

}


  return (
    <div style={{ backgroundColor: '#a6d8db71'}}>

       <div style={{fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize:'19px',display:'flex', gap:'70px', alignItems:'center',padding:'25px', margin:'1px'}}><Select options={jobLocationOptions} value={jobLocationOptions.find(option => option.value === jobLocation) || null}
 onChange={(option)=>setJobLocation(option?.value)}/>
 <Select options={jobTypeOptions} value={jobTypeOptions.find(option => option.value === jobType) || null}
 onChange={(option)=>setJobType(option?.value)}/>
                   <input type="text" placeholder='Enter Job Title' style={{Hover:'#059669'}} value={jobTitle} onChange={(e)=>setJobTitle(e.target.value)}/>
           

            <button onClick={handleSearch} style={{backgroundColor:'#4668b3', borderRadius:'3px',padding: '8px 16px',color:'#FFFFFF',border:'none',fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize:'19px'}}>Search</button>
              <button onClick={handleReset} style={{backgroundColor:'#4668b3', borderRadius:'3px',color:'#FFFFFF',padding: '8px 16px',border:'none',fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize:'19px'}} >Reset</button></div> 

    </div>
  )
}

export default JobFilter