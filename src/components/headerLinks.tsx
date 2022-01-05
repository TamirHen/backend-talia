import React, { useContext, useState } from 'react'
import '../assets/styles/components/headerLinks.scss'
import { DataContext } from '../providers/DataProvider'
import { Container } from './dragAndDrop/Container'
import { HeaderLink } from '../common/types'
import { updateDB } from '../utils/firebase/Firebase'

const HeaderLinks = () => {
  const {
    database: { headerLinks },
  } = useContext(DataContext)

  const [cardsArrayNewOrder, setCardsArrayNewOrder] = useState<HeaderLink[]>()
  const [message, setMessage] = useState<string>()

  const onSubmitHandler = async (event: React.SyntheticEvent) => {
    setMessage(undefined)
    event.preventDefault()
    if (!cardsArrayNewOrder) {
      setMessage('There was no change in the order')
      return
    }
    const newHeaderLinks: { [index: string]: any } = {}
    let counter = 1
    for (const card of cardsArrayNewOrder) {
      let property = card.name
      // uppercase first character of each word
      property = property.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())
      // first letter lowercase
      property = property.charAt(0).toLowerCase() + property.slice(1)
      // remove spaces
      property = property.replace(/\s/g, '')
      newHeaderLinks[property] = {}
      newHeaderLinks[property].name = card.name
      newHeaderLinks[property].order = counter
      counter++
    }
    const message = await updateDB('/headerLinks', newHeaderLinks)
    setMessage(message)
  }

  return (
    <form className={'header-links-form'} onSubmit={onSubmitHandler}>
      <h4 className={'form-header'}>Header Links</h4>

      <Container cards={headerLinks} setCardsNewOrder={setCardsArrayNewOrder} />
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

export default HeaderLinks
