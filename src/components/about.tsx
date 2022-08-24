import React, { ChangeEvent, useContext, useState } from 'react'
import '../assets/styles/components/about.scss'
import { DataContext } from '../providers/DataProvider'
import { updateDB, uploadImage } from '../utils/firebase/Firebase'
import { About as AboutInterface } from '../common/types'

interface AboutTarget {
  title: { value: string }
  subtitle: { value: string }
  description: { value: string }
}

const About = () => {
  const {
    database: {
      pages: { about },
    },
  } = useContext(DataContext)
  const [message, setMessage] = useState<string>()
  const [CVFile, setCVFile] = useState<File>()
  const [profilePhoto, setProfilePhoto] = useState<File>()

  const onCVUploadHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      setCVFile(event.currentTarget.files[0])
    }
  }

  const onProfilePhotoUploadHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      setProfilePhoto(event.currentTarget.files[0])
    }
  }

  const onSubmitHandler = async (
    event: React.SyntheticEvent
  ): Promise<void> => {
    setMessage(undefined)
    event.preventDefault()
    const target = event.target as typeof event.target & AboutTarget

    let fileURL
    const newSettings: AboutInterface = {
      title: target.title.value.trim(),
      subtitle: target.subtitle.value.trim(),
      description: target.description.value,
      cv: about.cv,
      photo: about.photo,
    }
    const folderPath = 'about'
    if (CVFile) {
      const snapshot = await uploadImage(folderPath, CVFile, 'CV- Talia Breuer')
      fileURL = await snapshot.ref.getDownloadURL()
      newSettings.cv = fileURL
    }
    if (profilePhoto) {
      const snapshot = await uploadImage(
        folderPath,
        profilePhoto,
        'profile picture'
      )
      fileURL = await snapshot.ref.getDownloadURL()
      newSettings.photo = fileURL
    }

    const message = await updateDB('pages/about', newSettings)
    setMessage(message)
  }

  return (
    <form className={'about-form'} onSubmit={onSubmitHandler}>
      <h4 className={'form-header'}>About</h4>
      <label htmlFor='title'>Title</label>
      <input name={'title'} defaultValue={about.title || ''} />
      <label htmlFor={'subtitle'}>Subtitle</label>
      <input name={'subtitle'} defaultValue={about.subtitle || ''} />
      <label htmlFor='description'>Description</label>
      <textarea name='description' defaultValue={about.description || ''} />
      <label htmlFor={'cv-file'}>{`CV File:`}</label>
      <input
        onChange={onCVUploadHandler}
        type='file'
        name='cv-file'
        className={'upload-about-file'}
        accept='application/pdf, application/msword'
      />
      <label htmlFor={'photo-file'}>{`Photo:`}</label>
      <input
        onChange={onProfilePhotoUploadHandler}
        type='file'
        name='photo-file'
        className={'upload-about-file'}
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

export default About
