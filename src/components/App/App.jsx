import './App.css';
import { useEffect, useState } from 'react';
import ButtonAction from '../ButtonAction/ButtonAction';
import Card from '../Card/Card';
import Popup from '../Popup/Popup';

import { useSelector, useDispatch } from 'react-redux';
import { setData, setDefault } from './store/newByEdit';
import { setNewDelete, setNewUpdate, setNewCreate } from './store/newsData';
import { setDelete, setUpdate, setCreate } from './store/deletedNewsData';
import { setThemeDark } from './store/themeDark'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, CssBaseline, IconButton, Switch, Badge } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Navigate, Route, Routes, useNavigate } from 'react-router';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  const navigate = useNavigate()

  const [isOpenPopup, setIsOpenPopup] = useState(false)

  const { themeDark } = useSelector((state) => state.themeDark)
  const setIsThemeDark = useDispatch()

  const { newByEdit } = useSelector((state) => state.newByEdit)
  const setNewByEdit = useDispatch()

  const { newsData } = useSelector((state) => state.newsData)
  const setNew = useDispatch()

  const { deletedNewsData } = useSelector((state) => state.deletedNewsData)
  const setDeletedNewsData = useDispatch()

  useEffect(() => {
    localStorage.setItem('news', JSON.stringify(newsData))
  }, [newsData])

  useEffect(() => {
    localStorage.setItem('deletedNews', JSON.stringify(deletedNewsData))
  }, [deletedNewsData])

  const handleChangeTheme = (e) => {
    setIsThemeDark(setThemeDark(e.target.checked))
  }

  const handleTransferInBasket = (data) => {
    setDeletedNewsData(setCreate(data))
    setNew(setNewDelete(data._id))
  }

  const handleDeleteCard = (data) => {
    setDeletedNewsData(setDelete(data._id))
  }

  const handleCreateCard = (data) => {
    setNew(setNewCreate(data))
    handleClosePopup()
  }

  const handleEditCard = (data) => {
    setNew(setNewUpdate(data))
    handleClosePopup()
  }
  const handleOpenPopup = () =>
    setIsOpenPopup(true)

  const handleOpenEditPopup = (data) => {
    setNewByEdit(setData(data))
    handleOpenPopup()
  }
  const handleClosePopup = () => {
    setNewByEdit(setDefault())
    setIsOpenPopup(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <header className="header">
        <a href="/">
          <h3>List news</h3>
        </a>
        <IconButton aria-label="cart" onClick={() => navigate('/basket')}>
          <Badge badgeContent={deletedNewsData.length} color="secondary" max={99} anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}>
            <DeleteIcon />
          </Badge>
        </IconButton>
        {/* <div className='block-theme'>
          <p>{`Dark theme ${themeDark ? 'ON' : 'OFF'}`}</p>
          <Switch
            checked={themeDark}
            onChange={handleChangeTheme}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <p>Theme dark</p>          
        </div> */}
      </header>
      <main className="main">
        <CssBaseline />
        <Routes>
          <Route path="/" element={
            <section className="news">
              <h1 className="news__title">News</h1>
              <ButtonAction text='Create new' callback={handleOpenPopup} />
              <ul className='news__cards'>
                {newsData.map((item) =>
                  <li key={item._id}>
                    <Card
                      data={item}
                      handleDeleteCard={handleTransferInBasket}
                      handleOpenEditPopup={handleOpenEditPopup} />
                  </li>
                )}
              </ul>
            </section>
          }>
          </Route>
          <Route path="/basket" element={
            <section className="news basket-news">
              <h1 className="news__title">Deleted News</h1>
              <p className="news__title">You can change and restore or delete permanently</p>
              {deletedNewsData.length > 0
                ?
                <>
                  <ButtonAction text='Clear basket' callback={handleOpenPopup} />
                  <ul className='news__cards'>
                    {deletedNewsData.map((item) =>
                      <li key={item._id}>
                        <Card
                          data={item}
                          handleDeleteCard={handleDeleteCard}
                          handleOpenEditPopup={handleOpenEditPopup} />
                      </li>
                    )}
                  </ul>
                </>
                :
                <h2 className="basket-news">No deleted news found</h2>
              }
            </section>
          }>
          </Route>
        </Routes>
      </main>
      <footer className="footer">
        <h4>Made by test</h4>
      </footer>
      {isOpenPopup && <Popup
        data={[newByEdit, isOpenPopup, handleClosePopup, handleEditCard, handleCreateCard]}
      />}
    </ThemeProvider>
  );
}

export default App;
