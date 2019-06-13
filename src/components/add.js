import React, {Component} from "react";
import "../scss/main.scss";
import {Link} from "react-router-dom";

class App extends Component {

    state = {
        questionContent: '',
        ansA: '',
        ansB: '',
        ansC: '',
        ansCorr: '',
        formOk: true,
        submitted: false
    };

    handleChange = event => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        });
    };

    addQuestion = event => {
        event.preventDefault();

        if((this.state.ansCorr !== 'a') && (this.state.ansCorr !== 'b') && (this.state.ansCorr !== 'c')) {
            this.setState({
                formOk: false
            })
        } else {
            const {questionContent, ansA, ansB, ansC, ansCorr} = this.state;
            fetch('http://localhost:3000/questions', {
                method: 'POST',
                body: JSON.stringify({
                    content: questionContent,
                    a: ansA,
                    b: ansB,
                    c: ansC,
                    correct: ansCorr
                }),
                headers: {"Content-Type": "application/json"}
            })
                .then(resp => resp.json())
                .then(data => console.log(data))
                .catch( err => {
                    console.log('Błąd!', err);
                });

            this.setState({
                submitted: true
            })
        }

    };

    render() {
        const alertStyle = {
            marginTop: '20px',
            padding: '10px',
            color: '#fff',
            backgroundColor: 'red',
            textAlign: 'center'
        };
        const {questionContent, ansCorr, ansC, ansB, ansA} = this.state;

        return (
            <>
                <div className='form-page'>
                    <h1 style={{color: '#333', textAlign: 'center', marginTop: '20px'}}>Add your question</h1>
                    <form className='question-form' onSubmit={this.addQuestion}>
                        <textarea
                            required
                            rows='5'
                            maxLength='180'
                            placeholder='Type your question'
                            value={questionContent}
                            name='questionContent'
                            onChange={this.handleChange}
                        />
                        <input
                            required
                            type='text'
                            maxLength='80'
                            placeholder='Type answer a'
                            value={ansA}
                            name='ansA'
                            onChange={this.handleChange}
                        />
                        <input
                            required
                            type='text'
                            maxLength='80'
                            placeholder='Type answer b'
                            value={ansB}
                            name='ansB'
                            onChange={this.handleChange}
                        />
                        <input
                            required
                            type='text'
                            maxLength='80'
                            placeholder='Type answer c'
                            value={ansC}
                            name='ansC'
                            onChange={this.handleChange}
                        />
                        <input
                            required
                            type='text'
                            maxLength='1'
                            placeholder='Type correct answer (a, b or c)'
                            value={ansCorr}
                            name='ansCorr'
                            onChange={this.handleChange}
                            style={{border: this.state.formOk ? null : '4px solid red'}}
                        />
                        <button type='submit'>Submit question</button>
                    </form>
                    <button className='return'><Link className='link' to="/">Main menu</Link></button>
                    {this.state.formOk ? null : <div style={alertStyle}><h3>Only a, b and c are allowed.</h3></div>}
                    {this.state.submitted ? <div className='submitted'>
                        <h3>Submit complete!</h3>
                        <button className='return'><Link className='link' to="/">Main menu</Link></button>
                    </div> : null}
                </div>
            </>
        )
    }

}

export default App;