import React, { ChangeEvent } from 'react'
import '../assets/styles/components/grid.scss'
import { Grid as GridInterface, GridLayout } from '../common/types'
import { Resolution } from '../common/enums'

interface GridProps {
  grid: GridInterface
  setResolutionsLayout: (
    resolution: Resolution,
    unit: string,
    newValue: number
  ) => void
  onSubmitHandler: (event: React.SyntheticEvent) => Promise<void>
}

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

const Grid = ({ grid, setResolutionsLayout, onSubmitHandler }: GridProps) => {
  return (
    <section className={'grid-section'} onSubmit={onSubmitHandler}>
      <h4 className={'grid-section-header'}>Grid Layout</h4>
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
    </section>
  )
}

export default Grid
