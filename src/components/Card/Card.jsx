import './Card.css';
import ButtonAction from '../ButtonAction/ButtonAction'

function Card({ data, handleDeleteCard, handleOpenEditPopup }) {
    const { title, text, _id } = data

    return (
        <article className="card">
            <div>
                <h2 className="card__header">{title}</h2>
                <ButtonAction text='Edit' callback={() => handleOpenEditPopup(data)} />
            </div>
            <p className="card__text">{text}</p>
            <ButtonAction text='Remove new' callback={() => handleDeleteCard(_id)} />
        </article>
    );
}

export default Card;
