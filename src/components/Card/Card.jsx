import './Card.css';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Card({ data, handleDeleteCard, handleOpenEditPopup }) {
    const { title, text, _id } = data

    return (
        <article className="card">
            <div>
                <h2 className="card__header">{title}</h2>
                <Button variant='outlined' onClick={() => handleOpenEditPopup(data)}>Edit</Button>
            </div>
            <p className="card__text">{text}</p>
            <IconButton aria-label="delete" onClick={() => handleDeleteCard(_id)} sx={{
                position: 'absolute',
                top: '-40px',
                right: '-20px'
            }}>
                <DeleteIcon />
            </IconButton>


        </article>
    );
}

export default Card;
