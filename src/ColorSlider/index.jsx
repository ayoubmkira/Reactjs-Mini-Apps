import { useState } from "react";
import InputRange from "./InputRange";
import "./style.css";
import ColorCodeCopier from "./ColorCodeCopier";

function rgbToHex(r, g, b) {
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        throw new Error('Invalid RGB values');
    }

    const toHex = (value) => {
        const hex = (+value).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export default function ColorSlider() {

    const [redColor, setRedColor] = useState(0);
    const [greenColor, setGreenColor] = useState(0);
    const [blueColor, setBlueColor] = useState(0);

    const rgbColor = `rgb(${redColor}, ${greenColor}, ${blueColor})`;
    const hexColor = rgbToHex(redColor, greenColor, blueColor);

    const handleGenerateRandomColor = () => {
        setRedColor(Math.floor(Math.random() * 256));
        setGreenColor(Math.floor(Math.random() * 256));
        setBlueColor(Math.floor(Math.random() * 256));
    };

    return <section className="section-color-slider" style={{ backgroundColor: rgbColor }}>
        <div className="section-color-slider__container">
            <h2 className="section-color-slider__title">Color Slider</h2>

            <div className="color-slider__box">
                <div className="color-slider__box__inputs">
                    <InputRange
                        label={"R"}
                        min={0}
                        max={255}
                        value={redColor}
                        className={"color-slider__box__input"}
                        onChange={(e) => setRedColor(e.target.value)}
                        id={1} />
                    <InputRange
                        label={"B"}
                        min={0}
                        max={255}
                        value={greenColor}
                        className={"color-slider__box__input"}
                        onChange={(e) => setGreenColor(e.target.value)}
                        id={2} />
                    <InputRange
                        label={"G"}
                        min={0}
                        max={255}
                        value={blueColor}
                        className={"color-slider__box__input"}
                        onChange={(e) => setBlueColor(e.target.value)}
                        id={3} />
                </div>

                <div className="color-slider__box__results">
                    <ColorCodeCopier color={rgbColor} />
                    <ColorCodeCopier color={hexColor} />
                    <div className="color-slider__box__results__box">
                        <button className="color-slider__box__results__box__btn block-center" onClick={handleGenerateRandomColor}>Generate Random Color</button>
                    </div>
                </div>
            </div>
        </div>
    </section>;

}