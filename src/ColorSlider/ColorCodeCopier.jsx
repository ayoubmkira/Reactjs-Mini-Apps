import { useEffect, useState } from "react";
import { BiCopy } from "react-icons/bi";

export default function ColorCodeCopier({ color }) {

    const [showMessage, setShowMessage] = useState(false);
    const handleCopyColor = () => {
        navigator.clipboard.writeText(color);
        setShowMessage(true);
    };

    useEffect(() => {
        setTimeout(() => {
            setShowMessage(false);
        }, 1200);
    }, [showMessage]);

    return <div className="color-slider__box__results__box">
        <input
            className="color-slider__box__results__box__input"
            type="text"
            readOnly
            value={color} />
        <button
            className="color-slider__box__results__box__btn"
            onClick={handleCopyColor}><BiCopy /></button>

        {
            showMessage && <span className="color-slider__box__results__box__message">Copied!</span>
        }
    </div>;

}