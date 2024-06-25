import './PageForm.css';
import NavHeader from '../Header/NavHeader';
import MenuSide from '../menuSide/MenuSide';
import React, { Component } from 'react';
import Container from '../StickyNote/Container';
import AddSection from '../StickyNote/AddSection';
import Confirm from '../StickyNote/Confirm';


class PageForm extends Component  {
  constructor(props) {
      super(props);
      this.state = {
          isMenuSideVisible: true
      };
  }

  toggleMenuSideVisibility = () => {
      this.setState(prevState => ({
          isMenuSideVisible: !prevState.isMenuSideVisible
      }));
  }

  render (){
    return (
      <div className="sb-nav-fixed">
        <NavHeader toggleMenuSide={this.toggleMenuSideVisibility}/>
        <div className='UserContainer d-md-inline-block'>
          <div className='UserContainer-block'>
            {this.state.isMenuSideVisible && <MenuSide />}
            <div className='table-container col' id='table-container'>
              <div className='table-container-header'>
                <Container/>
                <AddSection />
                <Confirm/>
                

                
              </div>
              
            </div>
          
          </div>
          

        </div>
        
      </div>
    );
  }  
}

export default PageForm;


