import './ButtonAction.css';

const ButtonAction = ({ type = 'button', text, callback, disabled = false }) =>
    <button type={type} className='button' onClick={callback || undefined} disabled={disabled}>{text}</button>

export default ButtonAction

