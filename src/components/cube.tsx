import { Cube as CubeInterface } from '../common/types'
import React, { useState } from 'react'
import '../assets/styles/components/cube.scss'

interface CubeTarget {
  id: { value: string }
  image: { value: string }
  name: { value: string }
}

export const Cube = (props: CubeInterface) => {
  const { id, name, image } = props
  const [message, setMessage] = useState<string>()

  const onSubmitHandler = async (event: React.SyntheticEvent) => {
    setMessage(undefined)
    event.preventDefault()
    const target = event.target as typeof event.target & CubeTarget

    // const message = await updateDB('/cubes', )
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
        <input type='text' name='id' readOnly disabled value={id} />
      </div>
      <div>
        <label>{`Name: `}</label>
        <input type='text' name='name' defaultValue={name} />
      </div>
      <div>
        <label>{`Image: `}</label>
        <input
          type='file'
          name='file'
          accept='image/png, image/jpeg'
          // defaultValue={image}
        />
      </div>
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
