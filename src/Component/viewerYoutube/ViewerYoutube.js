import React, { Component } from 'react';
import Header from '../Header/Header';
import { Button } from 'react-bootstrap';
import { getContentFromFireBase } from '../../function/Firebase';

class ViewerYoutube extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOnClick: true,
            youtubeLink: [],
        };
    }
      menuOnClick = () =>{
        // console.log(123);
        this.setState(prevState =>({
            isMenuOnClick : !prevState.isMenuOnClick
        }))
    }
    componentDidMount(){
        this.getLinkFromFirebase();
    }

    getLinkFromFirebase = () =>{
        // begin getcontentFromFirebase
        var convertPath = "/users/user1/kecheng/youtube/youtube"
        getContentFromFireBase(convertPath)
        .then((data) => {
            if (data !== null) {
                var sentences = data.split('\n');
                console.log(sentences);
                if(sentences){
                    this.setState({youtubeLink:sentences})
                }
                // sentences.forEach(st => {
                //     console.log("youtube = " + st);
                   
                //     var convert = st.split('=');
                //     if (convert.length === 2) {
                        
                //     }
                // });
            }
            
        })
        .catch((error) => {
            console.error("Có lỗi xảy ra:", error);
            return "convert errors";
        });
        // end getcontentFromFirebase
    }
    showLink = () => {
        if (this.state.youtubeLink.length > 0) {
            return this.state.youtubeLink.map((youtube, index) => {
                var yt = youtube.split('=');
                const title = yt[0] || `Video ${index + 1}`;
                const videoId = yt[2] ? yt[2].split('&')[0] : "123";
                const embedLink = `https://www.youtube.com/embed/${videoId}`;
                console.log(videoId);
                // const link = embedLink;
                
                return (
                    <YoutubeViewer key={index} title={title} link={embedLink} />
                );
            });
        } else {
            return null;
        }
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
               <div className='viewerYoutube row' style={{width:'100%'}}>
                 {this.showLink()}


               </div>
            </div>
            
        </div>
        );
    }
}

export default ViewerYoutube;

function YoutubeViewer(props){
    return(
        <div className='youtube-Viewer col-4'>
            <iframe 
                width="100%" 
                height="100%" 
                src={props.link}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
            ></iframe>
            <p>{props.title}</p>
        </div>
        
    )
}