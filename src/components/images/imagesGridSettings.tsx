import Grid from '../grid'
import { Image, Grid as GridInterface } from '../../common/types'
import Images from './images'
import React from 'react'
import '../../assets/styles/components/images/imagesGridSettings.scss'

interface ImagesGridSettingsProps {
  grid: GridInterface
  images?: Image[]
  dbPath: string
}

export function ImagesGridSettings(props: ImagesGridSettingsProps) {
  const { grid, images, dbPath } = props
  return (
    <div className={'images-grid-settings'}>
      <div className='grid-wrapper'>
        <Grid grid={grid} dbPathToGrid={`${dbPath}/grid`} />
      </div>
      <div className='images-wrapper'>
        <Images
          images={images}
          grid={grid}
          dbPathToImages={`${dbPath}/images`}
        />
      </div>
    </div>
  )
}
