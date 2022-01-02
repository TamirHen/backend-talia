import React, { useContext, useState } from 'react'
import '../assets/styles/components/socialMedia.scss'
import { DataContext } from '../providers/DataProvider'
import { updateDB } from '../utils/firebase/Firebase'
import { SocialMedia as SocialMediaInterface } from '../common/types'

interface SocialMediaTarget {
  behance: { value: string }
  dribble: { value: string }
  instagram: { value: string }
  linkedin: { value: string }
  vimeo: { value: string }
  whatsapp: { value: string }
}

const SocialMedia = () => {
  const {
    database: { socialMedia },
  } = useContext(DataContext)
  const [message, setMessage] = useState<string>()

  const onSubmitHandler = async (event: React.SyntheticEvent) => {
    setMessage(undefined)
    event.preventDefault()
    const target = event.target as typeof event.target & SocialMediaTarget

    const message = await updateDB('/socialMedia', {
      behance: target.behance.value,
      dribble: target.dribble.value,
      instagram: target.instagram.value,
      linkedin: target.linkedin.value,
      vimeo: target.vimeo.value,
      whatsapp: target.whatsapp.value,
    })
    setMessage(message)
  }

  return (
    <form className={'social-media-form'} onSubmit={onSubmitHandler}>
      <h4 className={'form-header'}>Social Media Links</h4>
      {socialMedia &&
        Object.keys(socialMedia).map((key) => (
          <div className={'field-wrapper'}>
            <span>{`${key}: `}</span>
            <input
              type='text'
              name={key}
              defaultValue={socialMedia[key as keyof SocialMediaInterface]}
            />
          </div>
        ))}
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

export default SocialMedia
