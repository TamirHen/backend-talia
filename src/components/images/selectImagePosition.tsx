import { v4 as uuid } from 'uuid'
import React, { ChangeEvent } from 'react'
import { Grid, ImagePosition } from '../../common/types'
import { Resolution } from '../../common/enums'
import '../../assets/styles/components/images/selectImagePosition.scss'

interface SelectImagePositionProps {
  grid: Grid
  resolution: Resolution
  onPositionSelectedHandler: (event: ChangeEvent<HTMLSelectElement>) => void
  imagePosition: ImagePosition
}

export function SelectImagePosition(props: SelectImagePositionProps) {
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
            value={imagePosition.rowStart}
          >
            {Array.from(Array(grid[resolution].rows).keys()).map(
              createPositionOptions
            )}
          </select>
          <select
            className={'select-coordinates'}
            name={`${resolution}-columnStart`}
            onChange={onPositionSelectedHandler}
            value={imagePosition.columnStart}
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
            value={imagePosition.rowEnd}
          >
            {Array.from(Array(grid[resolution].rows + 1).keys()).map(
              createPositionOptions
            )}
          </select>

          <select
            className={'select-coordinates'}
            name={`${resolution}-columnEnd`}
            onChange={onPositionSelectedHandler}
            value={imagePosition.columnEnd}
          >
            {Array.from(Array(grid[resolution].columns + 1).keys()).map(
              createPositionOptions
            )}
          </select>
        </div>
      </div>
    </div>
  )
}
