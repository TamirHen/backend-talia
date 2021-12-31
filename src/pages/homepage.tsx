import React, { useContext } from 'react'
import { v4 as uuid } from 'uuid'
import '../assets/styles/hompage.scss'
import { DataContext } from '../providers/DataProvider'
import { Link } from 'react-router-dom'

const Homepage = () => {
  const {
    database: { pages },
  } = useContext(DataContext)
  return (
    <div className={'homepage-container'}>
      <h1 className='hp-title'>Pages</h1>
      <ul className='pages-list'>
        {pages &&
          Object.keys(pages).map((key, index) => (
            <li key={uuid()} className='page'>
              <Link to={`/${key}`}>{key}</Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Homepage
