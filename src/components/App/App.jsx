import { ButtonAction } from '../ButtonAction/ButtonAction';
import Card from '../Card/Card';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Popup from '../Popup/Popup';
import { NEWS_ARRAY } from '../../constants/arrayNewsForTest';
import { useSelector, useDispatch } from 'react-redux';
import { setStatusActive, setStatusDisabled } from '../App/store/popupStatus';

function App() {
  const [news, setNews] = useState(JSON.parse(localStorage.getItem('news')) || NEWS_ARRAY.map(item => ({ ...item, id: Math.random() })))
  // const [isOpen, setIsOpen] = useState(false)
  const [editNew, setEditNew] = useState({ title: '', text: '', id: 0 })

  const {isOpenPopup} = useSelector((state) => state.popup)
  const setIsOpenPopup = useDispatch()

  const handleRemoveCard = (id) => {
    setNews(news.filter(i => i.id !== id))
  }

  useEffect(() => {
    if (news.length > 0) {
      localStorage.setItem('news', JSON.stringify(news))
    }
  }, [news])

  const handleEditCard = ({ title, text, id }) => {
    setNews(news.map(i => i.id === id ? { title, text, id } : i))
    handleClosePopup()
  }
  const handleOpenPopup = () => 
    setIsOpenPopup(setStatusActive())
  
  const handleOpenEditPopup = ({ title, text, id }) => {
    setEditNew({ ...editNew, title, text, id })
    handleOpenPopup()
  }
  const handleClosePopup = () => {
    setEditNew({ ...editNew, title: '', text: '', id: 0 })
    setIsOpenPopup(setStatusDisabled())
  }

  const handleCreateCard = ({ title, text }) => {
    setNews([...news, { title, text, id: Math.random() }])
    handleClosePopup()
  }

  return (
    <>
      <header className="header">
        <h3>List news</h3>
      </header>
      <main className="main">
        <section className="news">
          <h1 className="news__title">News</h1>
          <ButtonAction text='Create new' callback={handleOpenPopup} />
          <ul className='news__cards'>
            {news.map((item) =>
              <li key={item.id}>
                <Card
                  data={item}
                  handleRemoveCard={handleRemoveCard}
                  handleOpenEditPopup={handleOpenEditPopup} />
              </li>
            )}
          </ul>
        </section>
      </main>
      <footer className="footer">
        <h4>Made by test</h4>
      </footer>
      {isOpenPopup && <Popup
        editNew={editNew}
        isOpen={isOpenPopup}
        handleClosePopup={handleClosePopup}
        handleEditCard={handleEditCard}
        handleCreateCard={handleCreateCard} />}
    </>
  );
}

export default App;
