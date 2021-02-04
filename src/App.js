import React, { Component } from 'react'
import './App.css';

class App extends Component {
  state = {
    result : 0,
    operator: null,
    num1: '',
    currentNum: '',
    error: ''
  }
  buttons = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0]]
  operators = ['*', '+', '-', '/']


  // -------------------- EVERY BEHAVIOR YOU CAN IMAGINE ---------------------------- //

  numClick = (e) => {
    if(e.target.value !== '0' || this.state.currentNum !== ''){
      this.setState({currentNum: this.state.currentNum + e.target.value})
    } else if(this.state.operator) {
      this.setState({currentNum: this.state.currentNum + e.target.value})
    }
  }

  opClick = (e) => {
    if(this.state.operator) {
      // fails because operator is already filled in. we're not doing a string of operators.
      this.setState({error: 'Operator already filled in, please clear.'})
    }
    else if (!this.state.currentNum && e.target.value === '-') {
      // this is a success, because a number *can* be negative.
      this.setState({
        error: '',
        currentNum: '-'
      })
    }
    else if(!this.state.currentNum || this.state.currentNum === '-') {
      // Failed because the user is attempting to feed another operator that is either a *non* negative, or they're trying to submit an operation immediately after a negative.
      this.setState({error: 'Numerical value needed fam'})
    }
    else {
      // final case, handles if the user actually did their damn job.
      this.setState({
        num1: this.state.currentNum,
        operator: e.target.value,
        error: '',
        currentNum: ''
      })
    }
  }

  submit = (e) => {
    // Tell 'em off if they're trying to run a submittal when they're not fucking ready to.
    if(!this.state.num1 || !this.state.operator){
      this.setState({error: 'Fuuuuck you'})
    }
    else {
      this.setState({
        result : eval(`${this.state.num1}${this.state.operator}${this.state.currentNum}`),
        currentNum: '',
        num1: '',
        operator: null,
        error: ''
      })
    }
  }

  clear = (e) => {
    this.setState({
      result: 0,
      operator: null,
      num1: '',
      currentNum: '',
      error: ''
    })
  }

  // ----------------------------- THAT'S IT. ---------------------------- //
  
  render() {
    return (
      <div className="App">
        <h1>{this.state.result}</h1>
        <p>{this.state.num1}{this.state.operator}{this.state.currentNum}</p>
        {this.buttons.map((row, j) => 
          <div key={`Key is ${j}`} id='row'> 
            {row.map((n, i) => 
              <button key={`Key is ${i}`} onClick={this.numClick} value={n}>{n}</button>
            )}
          </div>
        )}
        {this.operators.map((o, k) => 
          <button key={`key is ${k}`}onClick={this.opClick} value={o}>{o}</button>
        )}
        <button onClick={this.submit}>=</button>
        <button onClick={this.clear}>C</button>
      </div>
    );
  }
}

export default App;
