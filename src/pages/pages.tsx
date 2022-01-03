import React, { useContext } from 'react'
import { v4 as uuid } from 'uuid'
import { Link, Route, Routes } from 'react-router-dom'
import { DataContext } from '../providers/DataProvider'
import '../assets/styles/pages/pages.scss'
import About from '../components/about'
import Contact from '../components/contact'
import DemoReel from '../components/demoReel'

const Pages = () => {
  const {
    database: { pages },
  } = useContext(DataContext)

  return (
    <div className={'page-container'}>
      <section>
        <button className={'back-button'}>
          <Link to={'/'}>{'Back'}</Link>
        </button>
        <h1 className='page-title'>Pages</h1>
        <ul className='page-list'>
          {pages &&
            Object.keys(pages).map((key) => (
              <li key={uuid()} className='db-object'>
                <Link to={`/pages/${key}`}>{key}</Link>
              </li>
            ))}
        </ul>
      </section>
      <section className={'inline-settings'}>
        <Routes>
          <Route path={'/about'} element={<About />} />
          <Route path={'/contact'} element={<Contact />} />
          <Route path={'/demoReel'} element={<DemoReel />} />
        </Routes>
      </section>
    </div>
  )
}

export default Pages
