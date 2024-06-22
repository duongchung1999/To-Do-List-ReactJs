import React, { Component } from 'react';
import Header from '../../Component/Header/Header';
import { Button } from 'react-bootstrap';

class ViewerWebsite extends Component {
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
    render() {
        return (
            <div className='App'>
                <Header isMenuOnClick= {this.state.isMenuOnClick}/>
                <div className='content'>
                    <div className='btnMenuSide'>
                        <Button variant="danger" onClick={this.menuOnClick}>
                                    <i class="fa-solid fa-bars" ></i>
                                    </Button>
                        <h2>{this.props.title}</h2>
                    </div>
                    <iframe 
                        src={this.props.path}
                        width="100%" 
                        height="1000px" 
                        style={{border: "none"}}
                        title="Hanzii"
                    ></iframe>
                </div>
                
            </div>
            
        );
    }
}

export default ViewerWebsite;