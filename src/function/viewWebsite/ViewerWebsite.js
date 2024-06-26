import React, { Component } from 'react';
import Header from '../../Component/Header/Header';
import { Button } from 'react-bootstrap';
import PageForm from '../../Component/PageForm/PageForm';

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
            
            <PageForm body={
                <>
                    <iframe 
                        src={this.props.path}
                        width="100%" 
                        height="1000px" 
                        style={{border: "none"}}
                        title="Hanzii"
                    ></iframe>
                </>}/>
            
        );
    }
}

export default ViewerWebsite;