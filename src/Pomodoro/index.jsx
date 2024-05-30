import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";
import "./style.css";

const addZeroToOneDigit = (value) => {
    return (value.toString().length == 1)? "0" + value: value;
};

export default function Pomodoro() {

    const SECONDS = 60;

    const [sessionLength, setSessionLength] = useState(25);
    const [breakLength, setBreakLength] = useState(5);
    const [currentState, setCurrentState] = useState("session");
    const [secondsLeft, setSecondsLeft] = useState(sessionLength * SECONDS);
    const [startPomodoro, setStartPomodoro] = useState(false);

    const handleStartPomodoro = () => {
        setStartPomodoro(true);
    };
    const handleEndPomodoro = () => {
        setStartPomodoro(false);
    };
    const resetPomodoro = () => {
        setStartPomodoro(false);
        setCurrentState("session");
        setSecondsLeft(sessionLength * SECONDS);
    };
    const getProgressHeight = () => {
        const currentStateLength = (currentState === "session")? sessionLength * 60: breakLength * 60;
        return (secondsLeft * 100) / currentStateLength;
    };

    useEffect(() => {
        let timer;
        if(startPomodoro) {
            timer = setInterval(() => {

                if(secondsLeft === 0) {
                    if(currentState === "session") {
                        setCurrentState("break");
                        setSecondsLeft(breakLength * SECONDS);
                    } else {
                        setCurrentState("session");
                        setSecondsLeft(sessionLength * SECONDS);
                    }
                } else {
                    setSecondsLeft(v => v - 1);
                }

            }, 1000);
        }
        return () => clearInterval(timer);
    }, [startPomodoro, secondsLeft, sessionLength, breakLength, currentState]);

    useEffect(() => {
        if (!startPomodoro) {
            setSecondsLeft(currentState === "session" ? sessionLength * SECONDS : breakLength * SECONDS);
        }
    }, [sessionLength, breakLength, currentState]);

    const getTime = {
        minutes: addZeroToOneDigit(Math.floor(secondsLeft / SECONDS)),
        seconds: addZeroToOneDigit(secondsLeft % SECONDS)
    };

    return <section className="section__pomodoro">
        <div>
            <h2 className="section__pomodoro__title">Pomodoro</h2>

            <div className="pomodoro">
                <div className="pomodoro__lengths">
                    <TimeLengthController text={"BREAK LENGTH"} minLength={1} length={breakLength} setLength={setBreakLength} disabled={startPomodoro} />
                    <TimeLengthController text={"SESSION LENGTH"} minLength={1} length={sessionLength} setLength={setSessionLength} disabled={startPomodoro} />
                </div>
                <div className="pomodoro__timer">
                    <h2 className="pomodoro__timer__title">{currentState.toUpperCase()}</h2>
                    <h1 className="pomodoro__timer__duration">{getTime.minutes}:{getTime.seconds}</h1>
                    <div className="pomodoro__timer__buttons">
                        {
                            startPomodoro?
                                <button
                                    className="pomodoro__timer__buttons__btn"
                                    onClick={handleEndPomodoro}
                                    aria-label="Pause Timer"
                                ><FaPauseCircle /></button>:
                                <button
                                    className="pomodoro__timer__buttons__btn"
                                    onClick={handleStartPomodoro}
                                    aria-label="Start Timer"
                                ><FaPlayCircle /></button>
                        }
                        <button
                            className="pomodoro__timer__buttons__btn"
                            onClick={resetPomodoro}
                            aria-label="Reset Timer"
                        ><MdOutlineReplay /></button>
                    </div>
                    <div className="pomodoro__timer__loader" style={{ height: getProgressHeight() + "%" }}></div>
                </div>
            </div>
        </div>
    </section>;

}

function TimeLengthController({ text, minLength, length, setLength, disabled }) {

    const handleAddLength = () => {
        setLength(currLength => currLength + 1);
    };
    const handleSubtractLength = () => {
        setLength(currLength => {
            const nextLength = currLength - 1;
            return (nextLength >= minLength)? nextLength: minLength;
        });
    };

    return <div className="pomodoro__controller">
        <h3 className="pomodoro__controller__title">{text}</h3>
        <div className="pomodoro__controller__board">
            <button
                className="pomodoro__controller__board__btn"
                onClick={handleSubtractLength}
                disabled={length <= minLength || disabled}
            ><FaMinus /></button>
            <span className="pomodoro__controller__board__length">{length}</span>
            <button
                className="pomodoro__controller__board__btn"
                onClick={handleAddLength}
                disabled={disabled}
            ><FaPlus /></button>
        </div>
    </div>;

}