import './App.css';
import { useEffect } from 'react';
import ButtonAction from '../ButtonAction/ButtonAction';
import Card from '../Card/Card';
import Popup from '../Popup/Popup';

import { useSelector, useDispatch } from 'react-redux';
import { setStatusActive, setStatusDisabled } from '../App/store/popupStatus';
import { setData, setDefault } from './store/newByEdit';
import { setNewDelete, setNewUpdate, setNewCreate } from './store/newsData';
import { setThemeDark } from './store/themeDark'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, CssBaseline, Switch } from '@mui/material';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  const { themeDark } = useSelector((state) => state.themeDark)
  const setIsThemeDark = useDispatch()

  const { isOpenPopup } = useSelector((state) => state.popup)
  const setIsOpenPopup = useDispatch()

  const { newByEdit } = useSelector((state) => state.newByEdit)
  const setNewByEdit = useDispatch()

  const { newsData } = useSelector((state) => state.newsData)
  const setNew = useDispatch()

  useEffect(() => {
    if (newsData.length > 0) {
      localStorage.setItem('news', JSON.stringify(newsData))
    }
  }, [newsData])

  const handleChangeTheme = (e) => {
    console.log(1)    
    setIsThemeDark(setThemeDark(e.target.checked)) 
  }

  const handleDeleteCard = (_id) => {
    setNew(setNewDelete(_id))
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
    setIsOpenPopup(setStatusActive())

  const handleOpenEditPopup = (data) => {
    setNewByEdit(setData(data))
    handleOpenPopup()
  }
  const handleClosePopup = () => {
    setNewByEdit(setDefault())
    setIsOpenPopup(setStatusDisabled())
  }
  console.log(themeDark)
  return (
    <ThemeProvider theme={theme}>
      <header className="header">
        <h3>List news</h3>
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
        <section className="news">
          <h1 className="news__title">News</h1>
          <ButtonAction text='Create new' callback={handleOpenPopup} />
          <ul className='news__cards'>
            {newsData.map((item) =>
              <li key={item._id}>
                <Card
                  data={item}
                  handleDeleteCard={handleDeleteCard}
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
        data={[newByEdit, isOpenPopup, handleClosePopup, handleEditCard, handleCreateCard]}
      />}
    </ThemeProvider>
  );
}

export default App;
