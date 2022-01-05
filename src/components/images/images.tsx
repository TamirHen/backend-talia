import { Grid, Image as ImageInterface } from '../../common/types'
import { Image } from './image'
import { v4 as uuid } from 'uuid'
import React, { useContext, useState } from 'react'
import '../../assets/styles/components/images/images.scss'
import { updateDB } from '../../utils/firebase/Firebase'
import { DataContext } from '../../providers/DataProvider'

interface ImagesProps {
  images: ImageInterface[]
  grid: Grid
  dbPathToImages: string
}

const Images = (props: ImagesProps) => {
  const { images, grid, dbPathToImages } = props
  const {
    database: { cubes },
  } = useContext(DataContext)
  const [key, setKey] = useState<string>(uuid())
  const rerenderImages = () => setKey(uuid())

  const onAddImageHandler = async () => {
    const newImage: ImageInterface = {
      id: uuid(),
      cubeId: (cubes && cubes[0].id) || '',
      desktop: {
        columnEnd: 1,
        columnStart: 1,
        rowEnd: 1,
        rowStart: 1,
      },
      tablet: {
        columnEnd: 1,
        columnStart: 1,
        rowEnd: 1,
        rowStart: 1,
      },
      mobile: {
        columnEnd: 1,
        columnStart: 1,
        rowEnd: 1,
        rowStart: 1,
      },
    }
    if (images) {
      images.unshift(newImage)
    } else {
      await updateDB(dbPathToImages, [newImage])
    }
    rerenderImages()
  }

  return (
    <div className={'image-cards-container'} key={key}>
      {
        <div onClick={onAddImageHandler} className={'add-image'}>
          +
        </div>
      }
      {images.map((image) => (
        <Image
          key={uuid()}
          image={image}
          images={images}
          grid={grid}
          dbPathToImages={dbPathToImages}
        />
      ))}
    </div>
  )
}

export default Images
