import React from 'react'


const Navbar = () => {
  
  return (
    <nav className='navbar shadow  align-content-center px-sm-4 m-auto pb-0 px-2'>

      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCN1E_bHzcgtJxGQtPm13BuXSF2pLjUHbFYw&usqp=CAU" alt="Bootstrap" width="30" height='35'/>


      <p className='fs-3 text-danger fw-medium pt-1'>Welcome to School</p>
      <div>
        <i className="bi bi-person-circle" style={{fontSize: "1.3rem",color: "cornflowerblue"}}></i>
      </div>
    </nav>
  )
}

export default Navbar