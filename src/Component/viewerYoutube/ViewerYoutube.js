import React, { Component, createRef } from 'react';
import Header from '../Header/Header';
import { Button } from 'react-bootstrap';
import { getContentFromFireBase } from '../../function/Firebase';
import YoutubeShow from '../../function/youtubeShow/YoutubeShow';
import PageForm from '../PageForm/PageForm';
import { NavLink } from 'react-router-dom';
import ItemCard from '../../function/ItemCard/ItemCard';

class ViewerYoutube extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOnClick: true,
            youtubeLink: [],
            iframeDimensions: { width: 0, height: 0 },
            youtubeHeight:0,
            inputLink:'',
            openLink:'',
        };
        this.iframeRef = createRef();
    }
      menuOnClick = () =>{
        // console.log(123);
        this.setState(prevState =>({
            isMenuOnClick : !prevState.isMenuOnClick
        }))
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateIframeDimensions);
    }
    componentDidMount(){
        this.getLinkFromFirebase();
        // this.updateIframeDimensions();
        window.addEventListener('resize', this.updateIframeDimensions);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.youtubeLink !== this.state.youtubeLink) {
            this.updateIframeDimensions();
        }
    }
    updateIframeDimensions = () => {
        if (this.iframeRef.current) {
            const width = this.iframeRef.current.offsetWidth;
            const height = this.iframeRef.current.offsetHeight;
            console.log(width)
            this.setState({ iframeDimensions: { width, height } ,
                youtubeHeight:width*9/16});
        }
    }

    getLinkFromFirebase = () =>{
        // begin getcontentFromFirebase
        var convertPath = "/users/user1/kecheng/youtube/youtube"
        getContentFromFireBase(convertPath)
        .then((data) => {
            if (data !== null) {
                var sentences = data.split('\n');
                if(sentences){
                    this.setState({youtubeLink:sentences})
                }
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
                // console.log(videoId);
                // const link = embedLink;
                
                return (
                    <YoutubeViewer 
                        key={index} 
                        title={title} 
                        link={embedLink} 
                        height={this.state.youtubeHeight?`${this.state.youtubeHeight}`:"100%"}
                        iframeRef={this.iframeRef}
                        />
                );
            });
        } else {
            return null;
        }
    }

    handleInputChange = (e) => {
        this.setState({ inputLink: e.target.value });
    }

    openVideo = () => {
        const { inputLink } = this.state;
        const videoId = inputLink.split('v=')[1]?.split('&')[0];
        console.log(videoId)
        if (videoId) {
            const embedLink = `https://www.youtube.com/embed/${videoId}`;
            this.setState({ openLink: embedLink });
            console.log(embedLink)
        }
    }

    render() {
        return (
            <PageForm body={
                <>
                    <div className='viewerYoutube row' style={{width:'100%'}}>
                     {this.showLink()}
                   </div>
                
                    <div className='openLink_container'>
                        <div className="form-group">
                            <label htmlFor="" />
                            <input
                                type="text"
                                className="form-control"
                                name="youtubeLinkInput"
                                id="youtubeLinkInput"
                                aria-describedby="helpId"
                                placeholder="Youtube Link"
                                value={this.state.inputLink}
                                onChange={this.handleInputChange}
                            />
                            <Button variant="info" onClick={this.openVideo}>
                                Open
                                <i class="fa-brands fa-youtube"></i>
                            </Button>
                        </div>
                        <YoutubeShow link={this.state.openLink?this.state.openLink:"null"}
                        height={this.state.youtubeHeight ? `${this.state.youtubeHeight}` : "100%"}
                        />
                    </div>
                    <div>
                            <div className='row row-cols-6 row-cols-xxxxxl-5 row-cols-xxxxl-4 row-cols-xl-3 row-cols-lg-2 gy-6 gx-xxl-2 gx-xl-3 gx-lg-2'>
                                <ItemCard 
                                link="/" 
                                title="Item Card" 
                                titleDescription="Description"
                                img="https://mayphiendich.com/uploads/images/vi/news/chu-thien-trong-tieng-han-la-gi.jpg"
                                alt="IMG Link"

                                />
                            </div>
                        </div>
                </>}/>
        );
    }
}

export default ViewerYoutube;

function YoutubeViewer(props){
    return(
        <div className='youtube-Viewer col-4'>
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
        
    )
}
