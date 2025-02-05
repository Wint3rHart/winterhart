import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Home() {

let nav=useNavigate()

  return (
    <div style={{color:'cyan',cursor:'pointer'}} onClick={()=>{nav('/movies')}}>Home</div>
  )
}

export default Home