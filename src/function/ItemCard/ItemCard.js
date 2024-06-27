import { NavLink } from 'react-router-dom';
import React, { Component, createRef } from 'react';
import './ItemCard.css'

function ItemCard (props){
    return(
        <div className='col-2' style={{marginTop:"20px"}}>
            <div className='itemCard-container'>
                <NavLink className="itemCard-title" to={props.link}  target="_self">
                    <div className='itemCard-img-des'>
                        {/* <h2>{props.title}</h2>
                        <h4>{props.titleDescription}</h4> */}
                    </div>
                    <img src={props.img} alt={props.imgAlt}/>
                </NavLink>
                <div className='itemCard-content'>
                    <h3 className='itemCard-content-title'>{props.title}</h3>
                    <div className='itemCard-content-description'>
                        <span>{props.tieudeTiengTrung}</span>
                    </div>
                    <div className='itemCard-content-author'>
                        <div className='itemCard-content-author-container'  >
                            <img src={props.imgAuthor}
                            alt="img"/>
                            <a href={props.webLink} target='_blank' >
                                <h4>{props.author}</h4>
                            </a>
                            
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ItemCard
