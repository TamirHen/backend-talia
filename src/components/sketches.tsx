import React, { useContext, useState } from 'react'
import '../assets/styles/components/sketches.scss'
import { DataContext } from '../providers/DataProvider'
import { v4 as uuid } from 'uuid'
import Grid from './grid'
import { updateDB } from '../utils/firebase/Firebase'
import {
  Grid as GridInterface,
  GridLayout,
  Sketches as SketchesInterface,
} from '../common/types'
import { Resolution } from '../common/enums'
import { Image } from './image'

const Sketches = () => {
  const {
    database: {
      pages: { sketches },
    },
  } = useContext(DataContext)
  const { grid, images } = sketches
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
    const newSettings: SketchesInterface = {
      ...sketches,
      grid: updatedGrid,
    }
    const message = await updateDB('/pages/sketches', newSettings)
    setMessage(message)
  }

  return (
    <div className={'sketches-container'}>
      <form className={'sketches-form'} onSubmit={onSubmitHandler}>
        <h4 className={'form-header'}>Sketches</h4>
        <div className={'sketches-content'}>
          <Grid
            grid={updatedGrid}
            setResolutionsLayout={setResolutionsLayout}
            onSubmitHandler={onSubmitHandler}
          />
          <div className={'image-cards-container'}>
            {images.map((image) => (
              <Image key={uuid()} image={image} grid={grid} />
            ))}
          </div>
        </div>
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
      </form>
    </div>
  )
}

export default Sketches
