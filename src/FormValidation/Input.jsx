
export default function Input({ type, label, id, name, placeholder, value, onChange, error }) {

    return <div className="form-control">
        <label className="label" htmlFor={id}>{label}</label>
        <input
            className="input"
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            />
        { error && <div className="error">{error}</div> }
    </div>;

}