import React from 'react'
import scholarData from '../../mockData/scholarData'
import employerData from '../../mockData/employerData'

export default function Navbar() {

  return (
    <div className=''>
      <ul className=''>
        <li>{name}</li>
        <li>Employers</li>
        <li>Favourites</li>
        <li>Contact Us</li>
      </ul>
    </div>
  )
}

const name = scholarData.data.getScholars[0].name