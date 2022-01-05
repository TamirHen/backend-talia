import React, {
  ChangeEvent,
  EventHandler,
  useContext,
  useEffect,
  useState,
} from 'react'
import '../../assets/styles/components/images/image.scss'
import { DataContext } from '../../providers/DataProvider'
import {
  Cube,
  Grid,
  Image as ImageInterface,
  ImagePosition,
} from '../../common/types'
import { v4 as uuid } from 'uuid'
import { Resolution } from '../../common/enums'
import { SelectImagePosition } from './selectImagePosition'
import { updateDB, uploadImage } from '../../utils/firebase/Firebase'

interface ImageProps {
  image: ImageInterface
  images: ImageInterface[]
  grid: Grid
  dbPathToImages: string
}

export const Image = (props: ImageProps) => {
  const { image, images, grid, dbPathToImages } = props
  const {
    database: { cubes },
  } = useContext(DataContext)

  const [message, setMessage] = useState<string>()
  const [updatedImage, setUpdatedImage] = useState<ImageInterface>(image)
  const [selectedCube, setSelectedCube] = useState<Cube | undefined>(
    (): Cube => cubes?.find((cube) => cube.id === image.cubeId) as Cube
  )
  const [cardKey, setCardKey] = useState<string>(uuid())

  const onCubeSelectedHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setMessage(undefined)
    const newCube = cubes?.find(
      (cube) => cube.id === event.target.value
    ) as Cube
    setSelectedCube(newCube)
    updatedImage.cubeId = newCube.id
    setUpdatedImage(updatedImage)
  }

  const onPositionSelectedHandler = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    setMessage(undefined)
    const newValue = Number(event.target.value)
    const [resolution, position] = event.target.name.split('-')
    updatedImage[resolution as Resolution][position as keyof ImagePosition] =
      newValue
    setUpdatedImage(updatedImage)
    rerenderCard()
  }

  const onDeleteHandler = async (): Promise<void> => {
    setMessage(undefined)

    // extract the images without the deleted one to a new array
    const updatedImages = images.filter(
      (image) => image.id.toString() !== updatedImage.id.toString()
    )
    if (confirm('Are you sure you would like to delete this image?')) {
      await updateDB(dbPathToImages, updatedImages)
    }
  }

  const onSubmitHandler = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ): Promise<void> => {
    setMessage(undefined)
    event.preventDefault()

    for (const image of images) {
      if (image.id.toString() === updatedImage.id.toString()) {
        image.cubeId = updatedImage.cubeId
        image.desktop = updatedImage.desktop
        image.tablet = updatedImage.tablet
        image.mobile = updatedImage.mobile
      }
    }
    const message = await updateDB(dbPathToImages, images)
    alert(message)
  }

  const rerenderCard = () => setCardKey(uuid())

  return (
    <form
      onSubmit={onSubmitHandler}
      className={'image-card'}
      style={{ backgroundImage: `url(${selectedCube?.image})` }}
      key={cardKey}
    >
      <div className='select-wrapper'>
        <select
          name='select-cube'
          onChange={onCubeSelectedHandler}
          value={selectedCube?.id}
        >
          {cubes &&
            cubes.map((cube) => (
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
          imagePosition={updatedImage.desktop}
        />
        <SelectImagePosition
          grid={grid}
          resolution={Resolution.tablet}
          onPositionSelectedHandler={onPositionSelectedHandler}
          imagePosition={updatedImage.tablet}
        />
        <SelectImagePosition
          grid={grid}
          resolution={Resolution.mobile}
          onPositionSelectedHandler={onPositionSelectedHandler}
          imagePosition={updatedImage.mobile}
        />
      </div>
      <div className={'submit-wrapper'}>
        <button className={'update-button'} type={'submit'}>
          Save
        </button>
        <button
          className={'delete-button'}
          type={'button'}
          onClick={onDeleteHandler}
        >
          Delete
        </button>
        {message && (
          <p
            className={'message'}
            style={{ color: message === 'saved' ? 'green' : 'red' }}
          >
            {message}
          </p>
        )}
      </div>
    </form>
  )
}
