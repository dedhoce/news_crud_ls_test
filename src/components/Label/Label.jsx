function Label({ valueData, name, value, error, onChange }) {
    
    return (
        <>
            <label>
                {name[0].toUpperCase() + name.slice(1) + ':'}
                {name === "title" ?
                    <input
                        name={name}
                        type="text"
                        placeholder={!valueData ? `enter new ${name}` : 'edit'}
                        onChange={onChange}
                        value={value ? value : ''}
                        minLength='2'
                        required />
                    :
                    <textarea
                        name={name}
                        type="text"
                        placeholder={!valueData ? `enter new ${name}` : 'edit'}
                        onChange={onChange}
                        value={value ? value : ''}
                        minLength='2'
                        required />}
            </label>
            {error && <span className='error'>{error}</span>}
        </>

    );
}

export default Label;
