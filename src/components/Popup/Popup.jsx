import './Popup.css';
import { useEffect } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import ButtonAction from '../ButtonAction/ButtonAction';
import Label from '../Label/Label';

function Popup({ data }) {
    const [newByEdit, isOpen, handleClosePopup, handleEditCard, handleCreateCard] = data
    const { title, text, _id } = newByEdit

    const { values, handleChange, errors, isValid, resetForm, setValues } = useFormAndValidation()

    useEffect(() => {
        title && text && setValues({ ...values, title, text })
    }, [])

    const isValues = title.length > 0 || text.length > 0

    const submitEditNew = (e) => {
        e.preventDefault()
        handleEditCard({ ...values, _id })
    }

    const submitCreateNew = (e) => {
        e.preventDefault()
        handleCreateCard(values)
    }

    useEffect(() => {
        function closePopupByEsc(key) {
            if (key.key === 'Escape') {
                handleClosePopup()
            }
        }
        function closePopupByClickOverlay(e) {
            if (e.target.classList.contains('popup')) {
                handleClosePopup()
            }
        }
        if (isOpen) {
            document.addEventListener("keydown", closePopupByEsc);
            document.addEventListener('click', closePopupByClickOverlay);
            return () => {
                document.removeEventListener("keydown", closePopupByEsc);
                document.removeEventListener('click', closePopupByClickOverlay);
                resetForm('', '', false)
            }
        }
    }, [isOpen, handleClosePopup])

    return (
        <section className='popup popup_active'>
            <div className="popup__block">
                <ButtonAction text='X' callback={handleClosePopup} />
                <h2 className="popup__title">{isValues ? 'Edit new' : 'Create new'}</h2>
                <form className="popup__form">
                    <Label
                        name='title'
                        valueData={title}
                        value={values?.title}
                        error={errors?.title}
                        onChange={handleChange}
                    />
                    <Label
                        name='text'
                        valueData={text}
                        value={values?.text}
                        error={errors?.text}
                        onChange={handleChange}
                    />
                    <ButtonAction
                        type='submit'
                        text='Save'
                        callback={isValues ? submitEditNew : submitCreateNew}
                        disabled={!isValid} />
                </form>
            </div>
        </section>
    );
}

export default Popup;
