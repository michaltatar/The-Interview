import React, {Component} from "react";
import "../scss/main.scss";
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';

class Summary extends Component {

    state = {
        showSum: false,
        points: this.props.points,
        ansArr: this.props.savedAns,
        questionIds: this.props.getIds,
        choosenQuestions: this.props.choosenQuestions
    };

    showSummary = event => {
        event.preventDefault();

        this.setState({
            showSum: true
        })
    };

    render() {
        return (
            <>
                <div className='summary'>
                    {!this.state.showSum ? <>
                        <div className='sumbox'>
                            <h1>Quiz is over!</h1>
                            <button onClick={this.showSummary}>View results</button>
                            <button><Link className='link' to="/">Main menu</Link></button>
                        </div>
                    </> : <>

                            <h2 className='points'>Score: {this.state.points} point(s)</h2>
                            {this.state.choosenQuestions.map((question, index) => {
                                return <>
                                    <table key={index+1}>
                                        <thead><tr><th>{question.content}</th></tr></thead>
                                            <tbody><tr><td>Correct answer (<strong>{question.correct}</strong>): {(() => {
                                                switch(question.correct) {
                                                    case 'a': return question.a;
                                                    case 'b': return question.b;
                                                    case 'c': return question.c;
                                                    default:  return null;
                                                }
                                            })()}</td></tr>
                                            <tr style={{color: '#fff', backgroundColor: this.state.ansArr[index]===question.correct ? 'green' : 'red'}}><td>Your answer (<strong>{this.state.ansArr[index]}</strong>): {(() => {
                                                switch(this.state.ansArr[index]) {
                                                    case 'a': return question.a;
                                                    case 'b': return question.b;
                                                    case 'c': return question.c;
                                                    default:  return <span>no answer</span>;
                                                }
                                            })()}</td></tr></tbody>
                                    </table>
                                </>
                            })}
                            <button><Link className='link' to="/">Main menu</Link></button>
                            {/*<button><Link className='link' to="/game">Try again</Link></button>*/}

                    </>}
                </div>
            </>
        )
    }

}

class Question extends Component {

    state = {
        answer: '',
        points: 0,
        savedAns: [],
    };

    handleChange = event => {

        this.setState({
            answer: event.target.id
        })
    };

    handleClick = event => {
        event.preventDefault();
        let auxArr = [...this.state.savedAns];
        auxArr.push(this.state.answer);

        this.setState({
            savedAns: auxArr
        }, () => {
            this.props.getAns(this.state.savedAns);
        });

        if(this.state.answer === this.props.question.correct) {
            this.setState({
                points: this.state.points+1
            }, () => {
                this.props.getPoints(this.state.points);
            });
        }

        setTimeout(() => {
            this.props.noRepeat(this.props.question.id);
        }, 50);

    };

    render() {
        const question = this.props.question;
        const {answer} = this.state;
        return (
            <>
                <div className='bubble'>
                    <div className='question'>
                        <h3>{question.content}</h3>
                        <div className='answers'>
                            <span>
                                <input
                                    type="radio"
                                    id="a"
                                    name="answer"
                                    value={answer}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="a">{question.a}</label>
                            </span>
                            <span>
                                <input
                                    type="radio"
                                    id="b"
                                    name="answer"
                                    value={answer}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="b">{question.b}</label>
                            </span>
                            <span>
                                <input
                                    type="radio"
                                    id="c"
                                    name="answer"
                                    value={answer}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="c">{question.c}</label>
                            </span>
                        </div>
                        <button onClick={this.handleClick}>Next</button>
                    </div>
                </div>
            </>
        )
    }

}

class Game extends Component {

    state = {
        questions: [],
        questionsIds: [],
        chosenQuestions: [],
        number: 0,
        points: 0,
        savedAns: []
    };

    getAns = ans => {
        this.setState({
            savedAns: ans
        })
    };

    getPoints = points => {
        this.setState({
            points
        })
    };

    randomNum = questions => {
        return Math.floor(Math.random() * questions.length);
    };

    setQuestionIndex = () => {
        this.setState({
            number: this.randomNum(this.state.questions)
        })
    };

    noRepetition = id => {
        let choosenArr = [...this.state.chosenQuestions];

        let chosenQuestions = this.state.questions.forEach(question => {
            if(question.id === id) {
                choosenArr.push(question);
            }
        });

        let idArr = [...this.state.questionsIds];
        idArr.push(id);

        let auxArr = this.state.questions.filter(question => {
            return question.id !== id;
        });

        this.setState({
            questions: auxArr,
            number: this.randomNum(auxArr),
            questionsIds: idArr,
            chosenQuestions: choosenArr
        });
    };

    componentDidMount() {
        fetch('http://localhost:3000/questions')
            .then(response => response.json())
            .then(questions => {
                if(questions.length === 0) {
                    console.log('No questions in database');
                } else {
                    this.setState({
                        questions,
                        number: this.randomNum(questions),
                    })
                }
            })
            .catch( err => {
                console.log('Error!', err);
            });
    }

    render() {
        return (
            <>
                <div className='game'>
                    {this.state.questions.length > 0 ?
                        <Question
                            question={this.state.questions[this.state.number]}
                            arrLength={this.state.questions.length}
                            randQuestion={this.setQuestionIndex}
                            noRepeat={this.noRepetition}
                            getPoints={this.getPoints}
                            getAns={this.getAns}
                    /> : <Summary
                            points={this.state.points}
                            savedAns={this.state.savedAns}
                            // getQuestions={this.state.allQuestions}
                            getIds={this.state.questionsIds}
                            choosenQuestions={this.state.chosenQuestions}
                    />
                    }
                </div>
            </>
        )
    }

}

export default Game;