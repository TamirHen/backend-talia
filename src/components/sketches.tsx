import React, { useContext } from 'react'
import '../assets/styles/components/sketches.scss'
import { DataContext } from '../providers/DataProvider'
import { ImagesGridSettings } from './images/imagesGridSettings'

const Sketches = () => {
  const {
    database: {
      pages: { sketches },
    },
  } = useContext(DataContext)
  const { grid, images } = sketches

  return (
    <div className={'sketches-container'}>
      <section className={'sketches-section'}>
        <h4 className={'section-header'}>Sketches</h4>
        <ImagesGridSettings
          grid={grid}
          images={images}
          dbPath={'/pages/sketches'}
        />
      </section>
    </div>
  )
}

export default Sketches
