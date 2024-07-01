import React, { Component, createRef } from 'react';
import Header from '../Header/Header';
import { Button } from 'react-bootstrap';
import { getContentFromFireBase } from '../../function/Firebase';
import YoutubeShow from '../../function/youtubeShow/YoutubeShow';
import PageForm from '../PageForm/PageForm';
import { NavLink } from 'react-router-dom';
import ItemCard from '../../function/ItemCard/ItemCard';
import { getKeyValueFromFireBase } from '../../function/Firebase';
import { getValueFromPath } from '../../function/Firebase';
import ItemCardYoutube from '../../function/ItemCardYoutube/ItemCardYoutube';

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
            dichthuats: [],
            youtubeLinkToGetImgs: {} ,
            webLinks: {} ,
            tieudeTiengTrungs: {} ,
            authors: {} ,
            imgAuthors: {} ,
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
        this.getLinkFromFirebase("/users/user1/kecheng/youtube/youtube");
        // this.updateIframeDimensions();
        this.getDichThuat();
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

    getLinkFromFirebase = (path) =>{
        // begin getcontentFromFirebase
        getContentFromFireBase(path)
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

    getDichThuat = async () => {
        var convertPath = "/users/dichthuat";
        var dichthuats = await getKeyValueFromFireBase(convertPath);
        this.setState({ dichthuats });
    
        const webLinks = {};
        const tieudeTiengTrungs = {};
        const authors = {};
        const youtubeLinkToGetImgs = {};
        const imgAuthors = {};
        for (let dichthuat of dichthuats) {
            youtubeLinkToGetImgs[dichthuat.key] = await getValueFromPath(`/users/dichthuat/${dichthuat.key}/link`);
            webLinks[dichthuat.key] = await getValueFromPath(`/users/dichthuat/${dichthuat.key}/webLink`);
            tieudeTiengTrungs[dichthuat.key] = await getValueFromPath(`/users/dichthuat/${dichthuat.key}/tieudeTiengTrung`);
            authors[dichthuat.key] = await getValueFromPath(`/users/dichthuat/${dichthuat.key}/author`);
            imgAuthors[dichthuat.key] = await getValueFromPath(`/users/dichthuat/${dichthuat.key}/imgAuthor`);
           
        }
        this.setState({ webLinks });
        this.setState({ tieudeTiengTrungs });
        this.setState({ authors });
        this.setState({ imgAuthors });
        this.setState({ youtubeLinkToGetImgs });
       
    }
    showDichThuat = () => {
        const { dichthuats, youtubeLinkToGetImgs, webLinks,
            tieudeTiengTrungs,authors,imgAuthors} = this.state;
        if (dichthuats.length > 0) {
            return dichthuats.map((dichthuat, index) => {
                const webLink = webLinks[dichthuat.key];
                const tieudeTiengTrung = tieudeTiengTrungs[dichthuat.key];
                const author = authors[dichthuat.key];
                const imgAuthor = imgAuthors[dichthuat.key];
                const youtubeLinkToGetImg = youtubeLinkToGetImgs[dichthuat.key];
                console.log(author)
                return (
                    <ItemCard
                        webLink={webLink}
                        tieudeTiengTrung={tieudeTiengTrung}
                        author={author}
                        imgAuthor={imgAuthor}
                        key={index}
                        link="/"
                        title={dichthuat.key}
                        titleDescription="Description"
                        img={youtubeLinkToGetImg?`https://img.youtube.com/vi/${this.getYoutubeId(youtubeLinkToGetImg)}/maxresdefault.jpg`:null}
                        alt="IMG Link"
                    />
                );
            });
        } else return null;
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
    getYoutubeId = (link) =>{
        var yt = link.split('=');
        const videoId = yt[1] ? yt[1].split('&')[0] : "null";
        return videoId;
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
                <div>
                            <div className='row row-cols-6 row-cols-xxxxxl-5 row-cols-xxxxl-4 row-cols-xl-3 row-cols-lg-2 gy-6 gx-xxl-2 gx-xl-3 gx-lg-2'>
                                {this.showDichThuat()}
                            </div>
                        </div>
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
                    
                </>}/>
        );
    }
}

export default ViewerYoutube;

function YoutubeViewer(props){
    return(
        <div className='youtube-Viewer col-2'>
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
