import React, { useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'
import '../assets/styles/components/breakPoints.scss'
import { DataContext } from '../providers/DataProvider'
import { BreakPoints as BreakPointsInterface } from '../common/types'
import { updateDB } from '../utils/firebase/Firebase'

interface BreakPointsTarget {
  menu: { value: string }
  mobile: { value: string }
  tablet: { value: string }
}

const BreakPoints = () => {
  const {
    database: { breakPoints },
  } = useContext(DataContext)

  const [message, setMessage] = useState<string>()

  const onSubmitHandler = async (event: React.SyntheticEvent) => {
    setMessage(undefined)
    event.preventDefault()
    const target = event.target as typeof event.target & BreakPointsTarget

    const message = await updateDB('/breakPoints', {
      menu: target.menu.value + 'px',
      mobile: target.mobile.value + 'px',
      tablet: target.tablet.value + 'px',
    })
    setMessage(message)
  }

  return (
    <form className={'breakPoints-form'} onSubmit={onSubmitHandler}>
      <h4 className={'form-header'}>Break Points</h4>
      <ul>
        {breakPoints &&
          Object.keys(breakPoints).map((key, index) => (
            <li key={uuid()}>
              <span>{`${key}: `}</span>
              <div>
                <input
                  type='number'
                  name={key}
                  defaultValue={
                    breakPoints[key as keyof BreakPointsInterface].split(
                      'px'
                    )[0]
                  }
                />
                px
              </div>
            </li>
          ))}
      </ul>
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

export default BreakPoints
