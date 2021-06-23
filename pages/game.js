import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const Game = () => {

    const [choice, setChoice] = useState('');
    const [time, setTimer] = useState(0);

    const [score, setScore] = useState(0);
    const [computer, setComputerChoice] = useState("");
    const [game, setGame] = useState("");

    const computerChoice = () => {
        const variants = ["rock", "paper", "scissors"];
        setComputerChoice(variants[Math.floor(Math.random() * 3)]);
    };

    const finalResult = () => {
        if (choice === "rock" && computer === "scissors") {
            setGame("win");
            setScore(score + 1);
        } else if (choice === "rock" && computer === "paper") {
            setGame("lose");
            setScore(score - 1);
        } else if (choice === "scissors" && computer === "paper") {
            setGame("win");
            setScore(score + 1);
        } else if (choice === "scissors" && computer === "rock") {
            setGame("lose");
            setScore(score - 1);
        } else if (choice === "paper" && computer === "rock") {
            setGame("win");
            setScore(score + 1);
        } else if (choice === "paper" && computer === "scissors") {
            setGame("lose");
            setScore(score - 1);
        } else {
            setGame("draw");
        }
    };

    function userChoice(value) {
        setChoice(value)
        setTimeout(() => computerChoice(), 1500)
        setTimer(3)
    }

    const isFirstRun = useRef(true);

    useEffect(() => {

        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        const counter =
            time > 0 ?
                setInterval(() => {
                    setTimer(time - 1)
                }, 500)
                : finalResult();

        return () => {
            clearInterval(counter);
            // setGame('');
            // computerChoice();
        };

    }, [time])

    return (
        <>

            <div className="container-fluid bg-dark text-white mx-auto text-center py-5" style={{ height: '120vh' }}>


                Total Score: {score}

                <div>
                    <button className="result-circle"><p style={{ fontSize: 10, fontWeight: 600 }}>My choice:</p>{choice}</button>

                    {time > 0 ? <>Countdown:{time}</> :
                        <>
                            {/* <p>Computer choice:</p> */}
                            {computer && <button className="result-circle"><p style={{ fontSize: 10, fontWeight: 600 }}>Computer choice:</p>{computer}</button>}
                            <p>Game Result:</p>
                            {game !== "" && <div className={`result ${game === 'win' ? 'win' : 'lose'}`}>{game}</div>}
                            <p className="pt-5">{computer !== "" && 'Play again'}</p>
                        </>}

                </div>

                <div className="d-flex justify-content-center">

                    <button className="c-btn" onClick={() => userChoice('rock')}>Rock</button>
                    <button className="c-btn" onClick={() => userChoice('paper')}>Paper</button>
                    <button className="c-btn" onClick={() => userChoice('scissors')}>Scrissors</button>
                </div>

            </div >
        </>
    )
}
export default Game






// const isFirstRun = useRef(true);

// useEffect(() => {
//     if (isFirstRun.current) {
//         isFirstRun.current = false;
//         return;
//     }
//     const counter =
//         time > 0 ?
//             setInterval(() => {
//                 setTimer(time - 1)
//             }, 1000)
//             : console.log('abv')

//     return () => {
//         clearInterval(counter);
//     };

// }, [time, choice])


// let counter;
// if (time > 0) {
//     counter = setInterval(() => {
//         setTimer(time - 1)
//     }, 1000)
// }
// else {
//     finalResult();
// }