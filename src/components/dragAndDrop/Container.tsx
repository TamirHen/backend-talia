import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import { Card } from './card'
import update from 'immutability-helper'
import { HeaderLink, HeaderLinks } from '../../common/types'
import { v4 as uuid } from 'uuid'

const style = {
  width: 350,
}

interface ContainerProps {
  cards: HeaderLinks | undefined
  setCardsNewOrder: Dispatch<SetStateAction<HeaderLink[] | undefined>>
}

export const Container: FC<ContainerProps> = (props) => {
  const { cards: cardsInitState, setCardsNewOrder } = props
  if (!cardsInitState)
    return <p className={'message'}>Error! Could not load Cards</p>
  const cardsAsArray = Object.keys(cardsInitState).map(
    (key) => cardsInitState[key as keyof HeaderLinks]
  )
  {
    const [cards, setCards] = useState(
      cardsAsArray.sort((card1, card2) => card1.order - card2.order)
    )
    const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        if (!cards) return
        const dragCard = cards[dragIndex]
        setCards(
          update(cards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          })
        )
        setCardsNewOrder(
          update(cards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          })
        )
      },
      [cards]
    )

    const renderCard = (card: HeaderLink, index: number): JSX.Element => {
      return (
        <Card
          key={uuid()}
          index={index}
          id={uuid()}
          text={card.name}
          moveCard={moveCard}
        />
      )
    }

    return (
      <>
        <div style={style}>
          {cards && cards.map((card, i) => renderCard(card, i))}
        </div>
      </>
    )
  }
}
