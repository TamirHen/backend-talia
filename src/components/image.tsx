import React, { ChangeEvent, useContext, useState } from 'react'
import '../assets/styles/components/image.scss'
import { DataContext } from '../providers/DataProvider'
import {
  Cube,
  Grid,
  Image as ImageInterface,
  ImagePosition,
} from '../common/types'
import { v4 as uuid } from 'uuid'
import { Resolution } from '../common/enums'

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
  const [updatedImage, setUpdatedImage] = useState<ImageInterface>(image)

  const onOptionSelectedHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCube(cubes.find((cube) => cube.id === event.target.value))
  }

  const onPositionSelectedHandler = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const newValue = Number(event.target.value)
    const [resolution, position] = event.target.name.split('-')
    updatedImage[resolution as Resolution][position as keyof ImagePosition] =
      newValue
    setUpdatedImage(updatedImage)
    console.log(updatedImage)
  }

  return (
    <div
      className={'image-card'}
      style={{ backgroundImage: `url(${selectedCube?.image})` }}
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
      </div>
      <div className={'select-image-positions-wrapper'}>
        <SelectImagePosition
          grid={grid}
          resolution={Resolution.desktop}
          onPositionSelectedHandler={onPositionSelectedHandler}
          imagePosition={image.desktop}
        />
        <SelectImagePosition
          grid={grid}
          resolution={Resolution.tablet}
          onPositionSelectedHandler={onPositionSelectedHandler}
          imagePosition={image.tablet}
        />
        <SelectImagePosition
          grid={grid}
          resolution={Resolution.mobile}
          onPositionSelectedHandler={onPositionSelectedHandler}
          imagePosition={image.mobile}
        />
      </div>
    </div>
  )
}

interface SelectImagePositionProps {
  grid: Grid
  resolution: Resolution
  onPositionSelectedHandler: (event: ChangeEvent<HTMLSelectElement>) => void
  imagePosition: ImagePosition
}

function SelectImagePosition(props: SelectImagePositionProps) {
  const { grid, resolution, onPositionSelectedHandler, imagePosition } = props
  const createPositionOptions = (num: number) => (
    <option key={uuid()} value={num + 1}>
      {num + 1}
    </option>
  )

  return (
    <div className={'select-image-position'}>
      <h4>{resolution}</h4>
      <div className={'select-coordinates-container'}>
        <div className={'select-coordinates-wrapper'}>
          <select
            className={'select-coordinates'}
            name={`${resolution}-rowStart`}
            onChange={onPositionSelectedHandler}
            defaultValue={imagePosition.rowStart}
          >
            {Array.from(Array(grid[resolution].rows).keys()).map(
              createPositionOptions
            )}
          </select>
          <select
            className={'select-coordinates'}
            name={`${resolution}-columnStart`}
            onChange={onPositionSelectedHandler}
            defaultValue={imagePosition.columnStart}
          >
            {Array.from(Array(grid[resolution].columns).keys()).map(
              createPositionOptions
            )}
          </select>
        </div>
        <div className={'select-coordinates-wrapper'}>
          <select
            className={'select-coordinates'}
            name={`${resolution}-rowEnd`}
            onChange={onPositionSelectedHandler}
            defaultValue={imagePosition.rowEnd}
          >
            {Array.from(Array(grid[resolution].rows).keys()).map(
              createPositionOptions
            )}
          </select>
          <select
            className={'select-coordinates'}
            name={`${resolution}-columnEnd`}
            onChange={onPositionSelectedHandler}
            defaultValue={imagePosition.columnEnd}
          >
            {Array.from(Array(grid[resolution].columns).keys()).map(
              createPositionOptions
            )}
          </select>
        </div>
      </div>
    </div>
  )
}
