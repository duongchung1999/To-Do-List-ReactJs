import React, { Component } from 'react';
import PageForm from '../PageForm/PageForm';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { getValueFromPath } from '../../function/Firebase';
import ItemCardYoutube from '../../function/ItemCardYoutube/ItemCardYoutube';

class DichthuatViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dichthuat: null,
            youtubeLink: null ,
            webLink: null ,
            tieudeTiengTrung: null ,
            author: null ,
            imgAuthor: null ,
            id: null ,
            error:null,
            nav:false,
        };
    }
    componentDidMount() {
        this.getData();
    }
    getData = async () =>{
        const dichthuat = localStorage.getItem("dichthuat");
        const baihoc = localStorage.getItem("video");
        const id = localStorage.getItem("videoId");

        const dichthuatPath = `/users/dichthuat/${dichthuat}`;
        const baihocPath = `/users/dichthuat/${dichthuat}/listBaihoc/${baihoc}`
        const weblinkPath = `${baihocPath}/weblink`;
        const tieudeTiengTrungPath = `${baihocPath}/tieudeTiengTrung`;
        const authorPath = `${dichthuatPath}/author`;
        const imgAuthorPath = `${dichthuatPath}/imgAuthor`;
        const YoutubePath = `${baihocPath}/link`;

        

        // console.log(YoutubePath)
        const youtubeLink = await getValueFromPath(YoutubePath);
        const webLink = await getValueFromPath(weblinkPath);
        const tieudeTiengTrung = await getValueFromPath(tieudeTiengTrungPath);
        const author = await getValueFromPath(authorPath);
        const imgAuthor = await getValueFromPath(imgAuthorPath);

        this.setState({ webLink });
        this.setState({ tieudeTiengTrung });
        this.setState({ author });
        this.setState({ imgAuthor });
        this.setState({ youtubeLink });
        this.setState({ id });
        this.setState({ baihoc });

        if (id) {
            const embedLink = `https://www.youtube.com/embed/${id}`;
            this.setState({ embedLink: embedLink });
        }

    }
    render() {
        return (
            <PageForm
            body={
                <div style={{display:'flex'}}>
                    <div className='dichthuat-container row row-cols-6 row-cols-xxxxxl-5 row-cols-xxxxl-4 row-cols-xl-3 row-cols-lg-2 gy-6 gx-xxl-2 gx-xl-3 gx-lg-2'>
                        <ItemCardYoutube
                            videoLink = {this.state.embedLink?this.state.embedLink:null}
                            webLink={this.state.webLink?this.state.webLink:null}
                            tieudeTiengTrung={this.state.tieudeTiengTrung?this.state.tieudeTiengTrung:null}
                            author={this.state.author?this.state.author:null}
                            imgAuthor={this.state.imgAuthor?this.state.imgAuthor:null}
                            title={this.state.baihoc?this.state.baihoc:null}
                            />

                        <div className='baidich-Text-container col'>
                            <textarea>
                                12321312
                            </textarea>
                        </div>
                    </div>
                    
                </div>
            }
            />
        );
    }
}

export default DichthuatViewer;