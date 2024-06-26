import logo from './logo.svg';
import './App.css';
import Header from './Component/Header/Header';
import Content from './Component/Content/Content';
import React, { Component } from 'react';
import PageForm from './Component/PageForm/PageForm';
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
    <PageForm body={
      <>
          <Content menuOnClick={this.menuOnClick}/>
      </>}/>
  );
}
  
}

export default App;
