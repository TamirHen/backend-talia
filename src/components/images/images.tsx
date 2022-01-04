import { Grid, Image as ImageInterface } from '../../common/types'
import { Image } from './image'
import { v4 as uuid } from 'uuid'
import React from 'react'
import '../../assets/styles/components/images/images.scss'

interface ImagesProps {
  images: ImageInterface[]
  grid: Grid
  dbPathToImages: string
}

const Images = (props: ImagesProps) => {
  const { images, grid, dbPathToImages } = props
  return (
    <div className={'image-cards-container'}>
      {images.map((image) => (
        <Image key={uuid()} image={image} grid={grid} />
      ))}
    </div>
  )
}

export default Images
