import React, { useContext, useState } from 'react'
import '../assets/styles/components/subtitle.scss'
import { DataContext } from '../providers/DataProvider'
import { updateDB } from '../utils/firebase/Firebase'

interface SubtitleTarget {
  subtitle: { value: string }
}

const Subtitle = () => {
  const {
    database: { subtitle },
  } = useContext(DataContext)

  const [message, setMessage] = useState<string>()

  const onSubmitHandler = async (event: React.SyntheticEvent) => {
    setMessage(undefined)
    event.preventDefault()
    const target = event.target as typeof event.target & SubtitleTarget

    const message = await updateDB('/subtitle', target.subtitle.value.trim())
    setMessage(message)
  }

  return (
    <form className={'subtitle-form'} onSubmit={onSubmitHandler}>
      <h4 className={'form-header'}>Subtitle</h4>
      {<input name='subtitle' defaultValue={subtitle || ''} />}
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

export default Subtitle
