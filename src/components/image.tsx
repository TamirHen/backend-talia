import React, { ChangeEvent, useContext, useState } from 'react'
import '../assets/styles/components/image.scss'
import { updateDB, uploadImage } from '../utils/firebase/Firebase'
import { DataContext } from '../providers/DataProvider'
import { Cube, Grid, Image as ImageInterface } from '../common/types'
import { v4 as uuid } from 'uuid'

interface ImageProps {
  image: ImageInterface
  grid: Grid
}

export const Image = (props: ImageProps) => {
  const { image, grid } = props
  const {
    database: { cubes },
  } = useContext(DataContext)
  const cube = cubes.find((cube) => cube.id === image.cubeId)
  const [selectedCube, setSelectedCube] = useState<Cube | undefined>(
    cube || undefined
  )

  const onOptionSelectedHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCube(cubes.find((cube) => cube.id === event.target.value))
  }

  return (
    <div
      className={'image-card'}
      style={{ backgroundImage: `url(${cube?.image})` }}
    >
      <div className='select-wrapper'>
        <select
          name='select-cube'
          defaultValue={selectedCube?.id}
          onChange={onOptionSelectedHandler}
        >
          {cubes.map((cube) => (
            <option key={uuid()} value={cube.id}>
              {cube.name}
            </option>
          ))}
        </select>
        <div className={'position-picker-wrapper'}></div>
      </div>
    </div>
  )
}
