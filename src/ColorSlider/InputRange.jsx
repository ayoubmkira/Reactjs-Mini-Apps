
export default function InputRange ({ label, min, max, value, className, onChange, id }) {

    return <div className="form-control">
        <label htmlFor={id}>{label}</label>
        <input
            type="range"
            min={min}
            max={max}
            value={value}
            className={className}
            onChange={onChange}
            id={id} />
    </div>;

}