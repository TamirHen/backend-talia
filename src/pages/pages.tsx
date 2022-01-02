import React, { useContext } from 'react'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom'
import { DataContext } from '../providers/DataProvider'

const Pages = () => {
  const {
    database: { pages },
  } = useContext(DataContext)

  return (
    <div className={'page-container'}>
      <h1 className='page-title'>Pages</h1>
      <ul className='page-list'>
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

export default Pages
