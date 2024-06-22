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
    showLink = () =>{
        console.log(23)
        if(this.state.youtubeLink){
            this.state.youtubeLink.map(youtube =>{
                var yt = youtube.split('=');
                console.log("yt ="+yt[0])
                return(
                    <ViewerYoutube title={yt[0]} link={yt[1]}/>
                )
            })
            
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
               <div className='viewerYoutube row'>
               {/* <iframe 
                            width="560" 
                            height="315" 
                            src="https://www.youtube.com/embed/S-dUsy_clo4?start=573" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                        ></iframe> */}
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
        <div className='youtube-Viewer col-3'>
            <iframe 
                width="560" 
                height="315" 
                src={props.link}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
            ></iframe>
            <p>props.title</p>
        </div>
        
    )
}