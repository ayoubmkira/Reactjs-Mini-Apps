

export default function Input ({ id, label, type, name, placeholder, value, onChange, error }) {

    return <div className="form-control">
        <label htmlFor={id}>{label}</label>
        <input
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange} />

        { error && <p className="error-message">{error}</p> }
    </div>;

}