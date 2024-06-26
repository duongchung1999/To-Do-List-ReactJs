import { NavLink } from 'react-router-dom';
import React, { Component, createRef } from 'react';
import './ItemCard.css'

function ItemCard (props){
    return(
        <div className='col-4'>
            <div className='itemCard-container'>
                <NavLink className="itemCard-title" to={props.link}  target="_self">
                    <div className='itemCard-img-des'>
                        <h2>{props.title}</h2>
                        <h4>{props.titleDescription}</h4>
                    </div>
                    <img src={props.img} alt={props.imgAlt}/>
                </NavLink>
                <div className='itemCard-content'>
                    <h3 className='itemCard-content-title'>Đây là title</h3>
                    <div className='itemCard-content-description'>Đây là description</div>
                    <div className='itemCard-content-author'>Đây là author</div>
                </div>
            </div>
        </div>
    )
}
export default ItemCard
