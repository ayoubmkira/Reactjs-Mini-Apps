
import { FaHandPaper, FaHandScissors, FaHandRock } from "react-icons/fa";
import { useState } from "react";
import Scoreboard from "./Scoreboard";
import "./style.css";

const gameOptions = [
    {
        id: "rock",
        icon: <FaHandRock />
    }, {
        id: "paper",
        icon: <FaHandPaper />
    }, {
        id: "scissors",
        icon: <FaHandScissors />
    }
];

const checkTheWinner = (playerOptionIdx, computerOptionIdx) => {
    const playerOptionName = gameOptions[playerOptionIdx].id;
    const computerOptionName = gameOptions[computerOptionIdx].id;

    if(playerOptionName === computerOptionName) {
        return "IT IS DRAW";
    }
    if(
        (playerOptionName === "rock" && computerOptionName === "scissors") ||
        (playerOptionName === "paper" && computerOptionName === "rock") ||
        (playerOptionName === "scissors" && computerOptionName === "paper")
    ) {
        return "YOU WON";
    }
    return "COMPUTER WON";
};

export default function RockPaperScissors() {

    const [playerOption, setPlayerOption] = useState(null);
    const [computerOption, setComputerOption] = useState(null);
    const [resultGame, setResultGame] = useState(null);
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);

    const handlePlayerOption = (idxOption) => {
        setPlayerOption(idxOption);
        const idxComputerOption = Math.floor(Math.random() * 3);
        setComputerOption(idxComputerOption);

        const result = checkTheWinner(idxOption, idxComputerOption);

        setResultGame(result);
        if (result === "YOU WON") {
            setPlayerScore(v => v + 1);
        } else if (result === "COMPUTER WON") {
            setComputerScore(v => v + 1);
        }
    };
    const handleResetGame = () => {
        setPlayerOption(null);
        setComputerOption(null);
    };
    const handleResetScore = () => {
        setPlayerScore(0);
        setComputerScore(0);
    };

    return <section className="section__rock-paper-scissors">
        <h2 className="section__rock-paper-scissors__title">Rock Paper Scissors</h2>
        <div className="section__rock-paper-scissors__container">
            <Scoreboard playerScore={playerScore} computerScore={computerScore} />
            {
                (playerOption === null) &&
                    <div className="rock-paper-scissors__list">
                        {
                            gameOptions.map((option, i) => {
                                return <div
                                        className={`rock-paper-scissors__option rock-paper-scissors__option--${option.id}`}
                                        key={i}
                                        onClick={() => handlePlayerOption(i)}
                                    >{option.icon}</div>;
                            })
                        }
                    </div>
            }
            {
                (computerOption !== null) &&
                    <>
                        <div className="rock-paper-scissors__result">
                            <div className="rock-paper-scissors__result__options">
                                <p className="rock-paper-scissors__result__options__choice">
                                    <span className="rock-paper-scissors__result__options__choice__name">You</span>
                                    <span className={`rock-paper-scissors__option rock-paper-scissors__option--${(resultGame === "YOU WON") && "winner"} rock-paper-scissors__option--${gameOptions[playerOption].id}`}>
                                        {gameOptions[playerOption].icon}
                                        <span></span>
                                    </span>
                                </p>
                                <p className="rock-paper-scissors__result__options__choice">
                                    <span className="rock-paper-scissors__result__options__choice__name">Computer</span>
                                    <span className={`rock-paper-scissors__option rock-paper-scissors__option--${(resultGame === "COMPUTER WON") && "winner"} rock-paper-scissors__option--${gameOptions[computerOption].id}`}>
                                        {gameOptions[computerOption].icon}
                                        <span></span>
                                    </span>
                                </p>
                            </div>
                            <p className="rock-paper-scissors__result__message">{resultGame}</p>
                        </div>
                        <div className="rock-paper-scissors__controller">
                            <button className="rock-paper-scissors__controller__btn-reset" onClick={handleResetGame}>Play Again</button>
                            <button className="rock-paper-scissors__controller__btn-reset" onClick={handleResetScore}>Reset Score</button>
                        </div>
                    </>
            }
        </div>
    </section>;

}