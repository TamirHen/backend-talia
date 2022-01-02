import React, { useContext, useState } from 'react'
import '../assets/styles/components/footerText.scss'
import { DataContext } from '../providers/DataProvider'
import { updateDB } from '../utils/firebase/Firebase'

interface FooterTextTarget {
  footerText: { value: string }
}

const FooterText = () => {
  const {
    database: { footerText },
  } = useContext(DataContext)

  const [message, setMessage] = useState<string>()

  const onSubmitHandler = async (event: React.SyntheticEvent) => {
    setMessage(undefined)
    event.preventDefault()
    const target = event.target as typeof event.target & FooterTextTarget

    const message = await updateDB(
      '/footerText',
      target.footerText.value.trim()
    )
    setMessage(message)
  }

  return (
    <form className={'footer-text-form'} onSubmit={onSubmitHandler}>
      <h4 className={'form-header'}>Footer Text</h4>
      {<textarea name='footerText' defaultValue={footerText || ''} />}
      <button className={'update-button'} type={'submit'}>
        Update
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

export default FooterText
