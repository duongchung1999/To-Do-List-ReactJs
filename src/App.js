import logo from './logo.svg';
import './App.css';
import Header from './Component/Header/Header';
import Content from './Component/Content/Content';
import React, { Component } from 'react';
class App  extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isMenuOnClick: true
    };
}
  menuOnClick = () =>{
    // console.log(123);
    this.setState(prevState =>({
        isMenuOnClick : !prevState.isMenuOnClick
    }))
}
render(){
  return (
    <div className="App">
      <Header isMenuOnClick= {this.state.isMenuOnClick}/>
      <Content menuOnClick={this.menuOnClick}/>
    </div>
  );
}
  
}

export default App;
