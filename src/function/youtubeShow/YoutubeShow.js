import React, { Component, createRef } from 'react';
function YoutubeShow(props){
    return(
        <div className="card border-primary">
            <div className="card-body">
            <div className='youtube-Viewer-show'>
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
                </div>
                <p>{props.title}</p>
            </div>
        </div>
        
    )
}
export default YoutubeShow