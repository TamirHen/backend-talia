import React, { useContext, useState } from 'react'
import '../assets/styles/components/contact.scss'
import { DataContext } from '../providers/DataProvider'
import { updateDB } from '../utils/firebase/Firebase'
import { Contact as ContactInterface } from '../common/types'

interface ContactTarget {
  title: { value: string }
  text: { value: string }
}

const Contact = () => {
  const {
    database: {
      pages: { contact },
    },
  } = useContext(DataContext)

  const [message, setMessage] = useState<string>()

  const onSubmitHandler = async (event: React.SyntheticEvent) => {
    setMessage(undefined)
    event.preventDefault()
    const target = event.target as typeof event.target & ContactTarget
    const newSettings: ContactInterface = {
      title: target.title.value.trim(),
      text: target.text.value.trim(),
    }
    const message = await updateDB('pages/contact', newSettings)
    setMessage(message)
  }

  return (
    <form className={'contact-form'} onSubmit={onSubmitHandler}>
      <h4 className={'form-header'}>Contact</h4>
      <label htmlFor='title'>Title</label>
      <input name='title' defaultValue={contact.title || ''} />
      <label htmlFor='text'>Text</label>
      <input name='text' defaultValue={contact.text || ''} />
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

export default Contact
