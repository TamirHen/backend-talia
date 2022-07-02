import React, { ChangeEvent, useContext, useState } from 'react'
import '../assets/styles/components/home.scss'
import { DataContext } from '../providers/DataProvider'
import { updateDB, uploadImage } from '../utils/firebase/Firebase'
import { Home as HomeInterface } from '../common/types'

const Home = () => {
  const {
    database: {
      pages: { home },
    },
  } = useContext(DataContext)
  const [message, setMessage] = useState<string>()
  const [animationImage, setAnimationImage] = useState<File>()
  const [shortFilmImage, setShortFilmImage] = useState<File>()
  const [sketchesImage, setSketchesImage] = useState<File>()

  const onAnimationImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      setAnimationImage(event.currentTarget.files[0])
    }
  }
  const onShortFilmImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      setShortFilmImage(event.currentTarget.files[0])
    }
  }
  const onSketchesImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      setSketchesImage(event.currentTarget.files[0])
    }
  }

  const onSubmitHandler = async (
    event: React.SyntheticEvent
  ): Promise<void> => {
    setMessage(undefined)
    event.preventDefault()

    let animationImageURL
    let shortFilmImageURL
    let sketchesImageURL
    const newSettings: HomeInterface = { ...home }
    if (animationImage) {
      const snapshot = await uploadImage(
        'homepage',
        animationImage,
        'animation-images'
      )
      animationImageURL = await snapshot.ref.getDownloadURL()
      newSettings.animationImage = animationImageURL
    }
    if (shortFilmImage) {
      const snapshot = await uploadImage(
        'homepage',
        shortFilmImage,
        'short-film-images'
      )
      shortFilmImageURL = await snapshot.ref.getDownloadURL()
      newSettings.shortFilmImage = shortFilmImageURL
    }
    if (sketchesImage) {
      const snapshot = await uploadImage(
        'homepage',
        sketchesImage,
        'sketches-images'
      )
      sketchesImageURL = await snapshot.ref.getDownloadURL()
      newSettings.sketchesImage = sketchesImageURL
    }

    const message = await updateDB('pages/home', newSettings)
    setMessage(message)
  }

  return (
    <form className={'home-form'} onSubmit={onSubmitHandler}>
      <h4 className={'form-header'}>Home</h4>
      <label htmlFor={'animationImage'}>{`Animation Image:`}</label>
      <input
        onChange={onAnimationImageChange}
        type='file'
        name='animationImage'
        className={'upload-image-file'}
        accept='image/png, image/jpeg, image/jpg, image/gif, image/*, video/mp4, video/x-m4v, video/*'
      />
      <label htmlFor={'shortFilmImage'}>{`Short Film Image:`}</label>
      <input
        onChange={onShortFilmImageChange}
        type='file'
        name='shortFilmImage'
        className={'upload-image-file'}
        accept='image/png, image/jpeg, image/jpg, image/gif, image/*, video/mp4, video/x-m4v, video/*'
      />
      <label htmlFor={'sketchesImage'}>{`Sketches Image:`}</label>
      <input
        onChange={onSketchesImageChange}
        type='file'
        name='sketchesImage'
        className={'upload-image-file'}
        accept='image/png, image/jpeg, image/jpg, image/gif, image/*, video/mp4, video/x-m4v, video/*'
      />
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
  )
}

export default Home
