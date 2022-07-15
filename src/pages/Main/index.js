import './style.css';
import initialCards from '../../cards'
import { useState } from 'react';
import CardBack from '../../assets/card-back.png'
import Congrats from '../../assets/congrats.png'
import Logo from '../../assets/Logo.svg'

function Main() {
  const [cards, setCards] = useState([...initialCards]);
  const [selectedCard, setSelectedCard] = useState(null)
  const [isMatching, setIsMatching] = useState(false)
  const timeToTurn = 1000

  function match(firstCard, secondCard) {
    const isEqual = firstCard.slug === secondCard.slug;

    if (isEqual) {
      const filteredCards = cards.filter((card) => {
        return card.id !== firstCard.id && card.id !== secondCard.id
      })

      setCards(filteredCards)
    } else {
      const localCards = [...cards];

      const findFirstCardIndex = localCards.findIndex((card) => card.id === firstCard.id)
      const findSecondCardIndex = localCards.findIndex((card) => card.id === secondCard.id)

      localCards[findFirstCardIndex] = {
        ...localCards[findFirstCardIndex],
        turned: false
      }

      localCards[findSecondCardIndex] = {
        ...localCards[findSecondCardIndex],
        turned: false
      }

      setCards(localCards);
    }

    setIsMatching(false);
    setSelectedCard(null);
  }

  function handleFlip(cardId) {
    if (isMatching) {
      return
    }

    const localCards = [...cards];

    const findCardIndex = localCards.findIndex((card) => card.id === cardId);

    if (findCardIndex < 0 || localCards[findCardIndex].turned) {
      return;
    }

    const findCard = { ...localCards[findCardIndex] }

    localCards[findCardIndex] = {
      ...findCard,
      turned: true
    }

    setCards(localCards)

    if (selectedCard) {
      setIsMatching(true);
      setTimeout(() => {
        match(selectedCard, findCard)
      }, timeToTurn)
    } else {
      setSelectedCard(findCard)
    }
  }

  function handleReset() {
    setCards([...initialCards])
  }

  return (
    <div className='container'>
      <div className='sidebar'>
        <img className='sidebar__logo' src={Logo} alt='icon puzzle' />
        <button
          onClick={() => handleReset()}
        >
          RESET
        </button>
      </div>

      {cards.length === 0 && (
        <div className="congrats-container">
          <img className='congrats' src={Congrats} alt='congrats' />
        </div>
      )}
      {cards.length > 0 && (
        <div className='board'>
          {cards.map(card => (
            <div
              key={card.id}
              className={`card ${card.turned ? 'flip' : ""}`}
              onClick={() => handleFlip(card.id)}
            >
              <div className='card__front'>
                <img src={card.image} alt='card front'></img>
              </div>
              <div className='card__back'>
                <img src={CardBack} alt='card back'></img>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Main;
