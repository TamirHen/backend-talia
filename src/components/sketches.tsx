import React, { useContext } from 'react'
import '../assets/styles/components/sketches.scss'
import { DataContext } from '../providers/DataProvider'
import { v4 as uuid } from 'uuid'
import Grid from './grid'
import Images from './images/images'

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
        <div className={'sketches-content'}>
          <Grid grid={grid} dbPathToGrid={'/pages/sketches/grid'} />
          <Images
            images={images}
            grid={grid}
            dbPathToImages={'/pages/sketches/images'}
          />
        </div>
      </section>
    </div>
  )
}

export default Sketches
