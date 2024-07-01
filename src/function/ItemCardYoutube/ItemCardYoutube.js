import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class ItemCardYoutube extends Component {
    render() {
        return (
            <div className='col-12' style={{marginTop:"20px"}} >
            <div className='itemCard-container'onClick={this.props.cardClick} onMouseEnter={this.props.cardClick}>
                <div className="itemCard-title" >
                    <div className='itemCard-img-des'>
                        {/* <h2>{this.props.title}</h2>
                        <h4>{this.props.titleDescription}</h4> */}
                    </div>
                    <ShowYoutube link={this.props.videoLink}/>
                </div>
               
                <div className='itemCard-content'>
                    <h3 className='itemCard-content-title'>{this.props.title}</h3>
                    <h4 className='itemCard-content-description'>
                        {this.props.tieudeTiengTrung}
                    </h4>
                    <div className='itemCard-content-author'>
                        <div className='itemCard-content-author-container'  >
                            <img src={this.props.imgAuthor}
                            alt="img"/>
                            <a href={this.props.webLink} target='_blank' >
                                <h4>{this.props.author}</h4>
                            </a>
                            
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default ItemCardYoutube;

function ShowYoutube(props){
    return(
        <iframe 
                // width="100%"
                ref={props.iframeRef}
                height={props.height}
                src={props.link}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
        ></iframe>
        
    )
}