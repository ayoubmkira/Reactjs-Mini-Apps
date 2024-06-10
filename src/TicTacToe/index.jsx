import { useState } from "react";
import "./style.css";

export default function TicTacToe() {
    const [squares, setSquares] = useState(Array(9).fill(""));
    const [player, setPlayer] = useState("x");
    const [isOver, setIsOver] = useState(false);
    const [message, setMessage] = useState("");
    const [winningCombination, setWinningCombination] = useState(null);

    const handleGame = (index) => {
        if (squares[index] === "" && !isOver) {
            setSquares(currData => {
                const newSquares = currData.map((square, i) => (i === index ? player : square));
                checkGame(newSquares, player);
                return newSquares;
            });
            setPlayer(player === "x" ? "o" : "x");
        }
    };

    const checkGame = (squares, currentPlayer) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const [a, b, c] of winningCombinations) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                setWinningCombination([a, b, c]);
                setIsOver(true);
                setMessage(`The Winner is: ${currentPlayer}`);
                return;
            }
        }

        if (!squares.includes("")) {
            setIsOver(true);
            setMessage(`There is no Winner.`);
        }
    };
    const handleResetGame = () => {
        setSquares(Array(9).fill(""));
        setPlayer("x");
        setIsOver(false);
        setMessage("");
        setWinningCombination(null);
    };

    return (
        <section className="section-tictactoe">
            <h2 className="section-tictactoe__title">Tic-Tac-Toe Game</h2>
            <div className="section-tictactoe__container">
                <div>
                    {!isOver ? <h3>Turn for: {player}</h3> : <h3>{message}</h3>}
                    <div className="box__btns">
                        {squares.map((square, i) => (
                            <button
                                className={`box__btns__btn box__btns__btn--${square} ${(winningCombination && winningCombination.includes(i))? "win": ""}`}
                                disabled={isOver || square !== ""}
                                onClick={() => handleGame(i)}
                                key={i}
                            >
                                {square}
                            </button>
                        ))}
                    </div>
                    <button className="btn-reset__btn" onClick={handleResetGame}>Reset Game</button>
                </div>
            </div>
        </section>
    );
}
