import './Card.css';
import { ButtonAction } from '../ButtonAction/ButtonAction'

function Card({ data, handleRemoveCard, handleOpenEditPopup }) {
    const { title, text, id } = data

    return (
        <article className="card">
            <div>
                <h2 className="card__header">{title}</h2>
                <ButtonAction text='Edit' callback={() => handleOpenEditPopup(data)} />
            </div>
            <p className="card__text">{text}</p>
            <ButtonAction text='Remove new' callback={() => handleRemoveCard(id)} />
        </article>
    );
}

export default Card;
