import { useState } from "react";
import "./style.css";

const getRandomNumber = () => {
    return Math.floor(Math.random() * 51);
};

export default function NumberGuessing() {

    const [numberToGuess, setNumberToGuess] = useState(getRandomNumber());
    const [userValue, setUserValue] = useState(0);
    const [message, setMessage] = useState("Please Guess A Number");
    const [isWin, setIsWin] = useState(false);

    const checkUserNumber = (value) => {
        const trimmedUserValue = value.trim();
        const numericUserValue = +trimmedUserValue;
        if(value) {
            if (numericUserValue === numberToGuess) {
                setMessage(`You Won`);
                setIsWin(true);
            } else if (numericUserValue > numberToGuess) {
                setMessage("Too High");
            } else {
                setMessage("Too Low");
            }
        } else {
            setMessage("Please Guess A Number");
        }
    };
    const handleUserValueChange = (e) => {
        setUserValue(e.target.value);
        checkUserNumber(e.target.value);
    };
    const resetGame = () => {
        setNumberToGuess(getRandomNumber());
        setIsWin(false);
        setUserValue("0");
        setMessage("Please Guess A Number");
    };

    return <section className="section-number-guessing">
        <h2 className="section-number-guessing__title">Number Guessing</h2>
        <div className="section-number-guessing__container">
            <div className="section-number-guessing__box">
                <h2 className={`section-number-guessing__message`}>
                    { isWin? `🏆 ${message} 🏆`: message }
                </h2>
                <div className="section-number-guessing__input-container">
                    <input
                        type="text"
                        value={userValue}
                        readOnly={isWin}
                        className="section-number-guessing__input"
                        onChange={handleUserValueChange} />
                </div>
                <div>
                    <button
                        className="section-number-guessing__btn section-number-guessing__btn--reset"
                        onClick={resetGame}>Reset Number To Guess</button>
                </div>
            </div>
        </div>
    </section>;

}