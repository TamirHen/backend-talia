import React, { ChangeEvent, useContext, useState } from 'react'
import '../assets/styles/components/shortFilm.scss'
import { DataContext } from '../providers/DataProvider'
import { updateDB } from '../utils/firebase/Firebase'
import { ShortFilm as ShortFilmInterface } from '../common/types'

interface ShortFilmTarget {
  title: { value: string }
  subtitle: { value: string }
  text: { value: string }
  youtubeLink: { value: string }
}

const ShortFilm = () => {
  const {
    database: {
      pages: { shortFilm },
    },
  } = useContext(DataContext)
  const [message, setMessage] = useState<string>()

  const onSubmitHandler = async (
    event: React.SyntheticEvent
  ): Promise<void> => {
    setMessage(undefined)
    event.preventDefault()
    const target = event.target as typeof event.target & ShortFilmTarget

    const newSettings: ShortFilmInterface = {
      title: target.title.value.trim(),
      subtitle: target.subtitle.value.trim(),
      text: target.text.value.trim(),
      youtubeLink: target.youtubeLink.value.trim(),
    }
    const message = await updateDB('pages/shortFilm', newSettings)
    setMessage(message)
  }

  return (
    <form className={'short-film-form'} onSubmit={onSubmitHandler}>
      <h4 className={'form-header'}>Short Film</h4>
      <label htmlFor='title'>Title</label>
      <input name={'title'} defaultValue={shortFilm.title || ''} />
      <label htmlFor={'subtitle'}>Subtitle</label>
      <input name={'subtitle'} defaultValue={shortFilm.subtitle || ''} />
      <label htmlFor='text'>Text</label>
      <textarea name='text' defaultValue={shortFilm.text || ''} />
      <label htmlFor='youtubeLink'>YouTube Link</label>
      <input name={'youtubeLink'} defaultValue={shortFilm.youtubeLink || ''} />
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

export default ShortFilm
