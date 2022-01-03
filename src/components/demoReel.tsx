import React, { useContext, useState } from 'react'
import '../assets/styles/components/demoReel.scss'
import { DataContext } from '../providers/DataProvider'
import { updateDB } from '../utils/firebase/Firebase'
import { DemoReel as DemoReelInterface } from '../common/types'

interface DemoReelTarget {
  title: { value: string }
  text: { value: string }
}

const DemoReel = () => {
  const {
    database: {
      pages: { demoReel },
    },
  } = useContext(DataContext)

  const [message, setMessage] = useState<string>()

  const onSubmitHandler = async (event: React.SyntheticEvent) => {
    setMessage(undefined)
    event.preventDefault()
    const target = event.target as typeof event.target & DemoReelTarget
    const newSettings: DemoReelInterface = {
      title: target.title.value.trim(),
      text: target.text.value.trim(),
    }
    const message = await updateDB('pages/demoReel', newSettings)
    setMessage(message)
  }

  return (
    <form className={'demoReel-form'} onSubmit={onSubmitHandler}>
      <h4 className={'form-header'}>DemoReel</h4>
      <label htmlFor='title'>Title</label>
      <input name='title' defaultValue={demoReel.title || ''} />
      <label htmlFor='text'>Text</label>
      <input name='text' defaultValue={demoReel.text || ''} />
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

export default DemoReel
