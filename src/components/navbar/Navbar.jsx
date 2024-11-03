import React from 'react'
import "./Navbar.css"
import { useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { Link } from 'react-router-dom'
function Navbar() {
    const dispatch = useDispatch()
    const handleLogout = ()=>{
  dispatch(logout())
 }
  return (
<>
<div className="navbar">
    <button className='add-btn'><Link to="/notes">Add Notes</Link>
    </button>
    <button onClick={handleLogout}>Logout</button>
</div>

</>  )
}

export default Navbar