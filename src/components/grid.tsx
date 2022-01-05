import React, { ChangeEvent, useState } from 'react'
import '../assets/styles/components/grid.scss'
import { Grid as GridInterface, GridLayout } from '../common/types'
import { Resolution } from '../common/enums'
import { updateDB } from '../utils/firebase/Firebase'

interface GridProps {
  grid: GridInterface
  dbPathToGrid: string
}

const Grid = ({ grid, dbPathToGrid }: GridProps) => {
  const [message, setMessage] = useState<string>()
  const [updatedGrid, setUpdatedGrid] = useState<GridInterface>(grid)

  const setResolutionsLayout = (
    resolution: Resolution,
    unit: string,
    newValue: number
  ) => {
    updatedGrid[resolution][unit as keyof GridLayout] = newValue
    setUpdatedGrid(updatedGrid)
  }

  const onSubmitHandler = async (
    event: React.SyntheticEvent
  ): Promise<void> => {
    setMessage(undefined)
    event.preventDefault()
    const message = await updateDB(dbPathToGrid, updatedGrid)
    setMessage(message)
  }

  return (
    <div className={'grid-form-wrapper'}>
      <form className={'grid-form'} onSubmit={onSubmitHandler}>
        <h4 className={'grid-header'}>Grid Layout</h4>
        {grid && (
          <>
            <GridLayoutInput
              resolution={Resolution.desktop}
              layout={grid.desktop}
              setResolutionsLayout={setResolutionsLayout}
            />
            <GridLayoutInput
              resolution={Resolution.tablet}
              layout={grid.tablet}
              setResolutionsLayout={setResolutionsLayout}
            />
            <GridLayoutInput
              resolution={Resolution.mobile}
              layout={grid.mobile}
              setResolutionsLayout={setResolutionsLayout}
            />
          </>
        )}
        <button className={'update-button'} type={'submit'}>
          Save
        </button>
        {message && (
          <p
            className={'message'}
            style={{ color: message === 'saved' ? 'green' : 'red' }}
          >
            {message}
          </p>
        )}
      </form>{' '}
    </div>
  )
}

export default Grid

interface GridLayoutProps {
  resolution: Resolution
  layout: GridLayout
  setResolutionsLayout: (
    resolution: Resolution,
    unit: string,
    newValue: number
  ) => void
}

function GridLayoutInput({
  resolution,
  layout,
  setResolutionsLayout,
}: GridLayoutProps) {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const target = event.target as typeof event.target
    const [resolution, unit] = target.name.split('-')
    setResolutionsLayout(resolution as Resolution, unit, Number(target.value))
  }
  return (
    <div className={'grid-layout-input-wrapper'}>
      <h5>{resolution}</h5>
      <div className={'field-wrapper'}>
        <label htmlFor={`${resolution}-rows`}>Rows</label>
        <input
          type='number'
          name={`${resolution}-rows`}
          defaultValue={layout.rows}
          onChange={onChangeHandler}
        />
      </div>
      <div className={'field-wrapper'}>
        <label htmlFor={`${resolution}-columns`}>Columns</label>
        <input
          type='number'
          name={`${resolution}-columns`}
          defaultValue={layout.columns}
          onChange={onChangeHandler}
        />
      </div>
    </div>
  )
}
