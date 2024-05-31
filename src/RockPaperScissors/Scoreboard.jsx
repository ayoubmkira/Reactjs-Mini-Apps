
export default function Scoreboard({ playerScore, computerScore }) {

    return <div className="score-board">
        <div className="score-board__entity">
            <p className="score-board__entity__text">Your Score</p>
            <h3 className="score-board__entity__value">{playerScore}</h3>
        </div>
        <div className="score-board__entity">
            <p className="score-board__entity__text">Computer Score</p>
            <h3 className="score-board__entity__value">{computerScore}</h3>
        </div>
    </div>;

}