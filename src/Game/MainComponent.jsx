import { useState, useEffect } from 'react'
import ChildComponent from './ChildComponent'
import './style.scss'


function MainComponent() {
    const [value, setValue] = useState("X")
    const [winner, setWinner] = useState("")
    const [scoreO, setScoreO] = useState(0)
    const [scoreX, setScoreX] = useState(0)
    const [count, setCount] = useState(1)
    const [check, setCheck] = useState(true)
    const arr = [
        { id: 1, title: "" },
        { id: 2, title: "" },
        { id: 3, title: "" },
        { id: 4, title: "" },
        { id: 5, title: "" },
        { id: 6, title: "" },
        { id: 7, title: "" },
        { id: 8, title: "" },
        { id: 9, title: "" }
    ]
    const [xoObject, setXoObject] = useState(arr)

    useEffect(() => {
        if (winner !== "") {
            if (winner === "X") {
                setScoreX(prevScoreX => prevScoreX + 1)
            } else {
                setScoreO(prevScoreO => prevScoreO + 1)
            }
            setTimeout(() => {
                setXoObject(arr)
                setValue("X")
                setWinner("")
            }, 1500)
        }
    }, [check])

    useEffect(() => {
        const dataO = (localStorage.getItem("scoreO"))
        const dataX = (localStorage.getItem("scoreX"))
        if (dataX) {
            setScoreX(+dataX)
        }
        if (dataO) {
            setScoreO(+dataO)
        }
    }, [])
    useEffect(() => {
        localStorage.setItem("scoreX", scoreX.toString())
        localStorage.setItem("scoreO", scoreO.toString())

    })
  
    const ChangeState = (findId) => {
        const newObject = [...xoObject]
        const result = newObject.find(({ id }) => { return id == findId })
        if (result.title === "") {
            result.title = value
            setValue(prevValue => prevValue === "X" ? "O" : "X")
            setCount(prevCount => prevCount + 1)
        }
        const index = newObject.findIndex(({ id }) => id === findId)
        newObject[index] = result
        setXoObject(newObject)
        Winner()
    }
    const Winner = () => {
        const win = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]]
        win.map(e => {
            if (xoObject[e[0]].title === "X" && xoObject[e[1]].title === "X" && xoObject[e[2]].title === "X") {
                setWinner("X")
                setCheck(prevCheck => !prevCheck)
                console.log(check)
            } if (xoObject[e[0]].title === "O" && xoObject[e[1]].title === "O" && xoObject[e[2]].title === "O") {
                setWinner("O")
                setCheck(prevCheck => !prevCheck)
            }
        })
    }
    const reset = () => {
        setScoreO(0)
        setScoreX(0)
        setXoObject(arr)
        setValue("X")
        setWinner("")
    }

    return (
        <div className="container">
            <h1 className="heading">TIC TAC TOE :)</h1>
            <div className="container_second">

            
            <div className="cube">
                {xoObject.map(obj =>
                    <ChildComponent key={obj.id}
                        id={obj.id}
                        title={obj.title}
                        ChangeState={ChangeState}
                        Winner={Winner}
                        winner={winner} />)}
            </div>
            <div className="cube2">
                <div className="winner">
                    {winner ? <span className="winner_box">Congratulations!!! {winner} is a winner!</span> : ""}
                </div>
                <div className="score">
                    <div>
                        <h2>score for X</h2>
                        <div className="score_value">{scoreX}</div>
                    </div>
                    <div>
                        <h2>score for O</h2>
                        <div className="score_value">{scoreO}</div>
                    </div>
                </div>
                <button className="reset_btn" onClick={reset}>Reset</button>
            </div>
        </div>
        </div>
    )
}

export default MainComponent
