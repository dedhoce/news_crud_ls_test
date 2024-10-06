import { useLayoutEffect } from 'react';
import { ButtonAction } from '../ButtonAction/ButtonAction';
import Card from '../Card/Card';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Popup from '../Popup/Popup';

const newsArray = [
  { title: "test1", text: "test-text1" },
  { title: "test2", text: "test-text2" },
  { title: "test3", text: "test-text3" },
  { title: "test4", text: "test-text4" },
  { title: "test5", text: "test-text5" },
  { title: "test6", text: "test-text6" }
]

function App() {
  const [news, setNews] = useState(JSON.parse(localStorage.getItem('news')) || newsArray.map(item => ({ ...item, id: Math.random() })))
  const [isOpen, setIsOpen] = useState(false)
  const [editNew, setEditNew] = useState({ title: '', text: '', id: 0 })

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
  const handleOpenPopup = () => {
    setIsOpen(true)
  }
  const handleOpenEditPopup = ({ title, text, id }) => {
    setEditNew({ ...editNew, title, text, id })
    handleOpenPopup()
  }
  const handleClosePopup = () => {
    setEditNew({ ...editNew, title: '', text: '', id: 0 })
    setIsOpen(false)
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
              <li>
                <Card
                  key={item.id}
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
      {console.log(JSON.stringify(editNew))}
      {isOpen && <Popup
        editNew={editNew}
        isOpen={isOpen}
        handleClosePopup={handleClosePopup}
        handleEditCard={handleEditCard}
        handleCreateCard={handleCreateCard} />}
    </>
  );
}

export default App;
