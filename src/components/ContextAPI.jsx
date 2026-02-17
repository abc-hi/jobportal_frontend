
import React, { useState } from 'react'
import { createContext } from 'react'
export const myContext = createContext()
const ContextAPI = ({children}) => {
const[name,setName] =useState('')
const[loggedIn,setLoggedIn] = useState(false)
const [AllJobs, setAllJobs] = useState([])
  const [visibleFilteredJobs, setVisibleFilteredJobs] = useState([])

  return (
    <div>
      <myContext.Provider value={{name,setName,loggedIn,setLoggedIn,AllJobs, setAllJobs,visibleFilteredJobs, setVisibleFilteredJobs}} >
{children}
      </myContext.Provider>
    </div>
  )
}

export default ContextAPI