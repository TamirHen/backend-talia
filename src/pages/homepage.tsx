import React, { useContext } from 'react'
import '../assets/styles/pages/hompage.scss'
import { DataContext } from '../providers/DataProvider'
import { v4 as uuid } from 'uuid'
import { Link, Route, Routes } from 'react-router-dom'
import BreakPoints from '../components/breakPoints'
import FooterText from '../components/footerText'
import HeaderLinks from '../components/headerLinks'
import SocialMedia from '../components/socialMedia'
import Subtitle from '../components/subtitle'
import Cubes from '../components/cubes'

const Homepage = () => {
  const { database } = useContext(DataContext)
  return (
    <div className={'page-container'}>
      <section>
        <h1 className='page-title'>Database</h1>
        <ul className='page-list'>
          {database &&
            Object.keys(database).map((key) => (
              <li key={uuid()} className='db-object'>
                <Link to={`/${key}`}>{key}</Link>
              </li>
            ))}
        </ul>
      </section>
      <section className={'inline-settings'}>
        <Routes>
          <Route path={'/breakPoints'} element={<BreakPoints />} />
          <Route path={'/cubes'} element={<Cubes />} />
          <Route path={'/footerText'} element={<FooterText />} />
          <Route path={'/headerLinks'} element={<HeaderLinks />} />
          <Route path={'/socialMedia'} element={<SocialMedia />} />
          <Route path={'/subtitle'} element={<Subtitle />} />
        </Routes>
      </section>
    </div>
  )
}

export default Homepage
