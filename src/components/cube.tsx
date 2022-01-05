import { Cube as CubeInterface } from '../common/types'
import React, { ChangeEvent, useContext, useState } from 'react'
import '../assets/styles/components/cube.scss'
import { updateDB, uploadImage } from '../utils/firebase/Firebase'
import { DataContext } from '../providers/DataProvider'

interface CubeTarget {
  id: { value: string }
  name: { value: string }
}

export const Cube = (props: CubeInterface) => {
  const { id, name, image } = props
  const {
    database: { cubes },
  } = useContext(DataContext)

  const [message, setMessage] = useState<string>()
  const [imageFile, setImageFile] = useState<File>()

  const onImageUploadHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      setImageFile(event.currentTarget.files[0])
    }
  }

  const onDeleteHandler = async (): Promise<void> => {
    setMessage(undefined)
    if (cubes.length === 1) {
      alert('Could not delete the last cube in the database')
      return
    }
    // extract the images without the deleted one to a new array
    const updatedCubes = cubes.filter(
      (cube) => cube.id.toString() !== id.toString()
    )

    if (confirm('Are you sure you would like to delete this cube?')) {
      await updateDB('/cubes', updatedCubes)
    }
  }

  const onSubmitHandler = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ): Promise<void> => {
    setMessage(undefined)
    event.preventDefault()
    const target = event.target as typeof event.target & CubeTarget
    if (!imageFile) {
      setMessage('Could not find images to upload')
      return
    }
    const snapshot = await uploadImage('cubes', imageFile, target.name.value)
    const imageUrl = await snapshot.ref.getDownloadURL()

    if (!imageUrl) {
      setMessage('Could not upload images, please try again')
      return
    }
    const newCube = {
      id: target.id.value,
      name: target.name.value,
      image: imageUrl,
    }
    // if cubes is empty create the first cube
    if (!cubes) {
      const message = await updateDB('cubes', [newCube])
      setMessage(message)
      return
    }
    for (const cube of cubes) {
      if (cube.id.toString() === newCube.id.toString()) {
        cube.name = newCube.name
        cube.image = newCube.image
      }
    }
    const message = await updateDB('/cubes', cubes)
    setMessage(message)
  }

  return (
    <form
      className={'cube-form'}
      onSubmit={onSubmitHandler}
      style={{ backgroundImage: `url(${image})` }}
    >
      <h4 className={'cube-header'}>{name}</h4>
      <div>
        <label>{`ID (Read Only): `}</label>
        <input
          className={'id-input'}
          type='text'
          name='id'
          readOnly
          disabled
          value={id}
        />
      </div>
      <div>
        <label className={'required'}>{`Name:`}</label>
        <input type='text' name='name' required defaultValue={name} />
      </div>
      <div>
        <label className='required'>{`Image:`}</label>
        <input
          onChange={onImageUploadHandler}
          required
          type='file'
          name='file'
          className={'cube-uploaded-file'}
          accept='image/png, image/jpeg, image/jpg, image/gif, image/*, video/mp4, video/x-m4v, video/*'
        />
      </div>
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
    </form>
  )
}
