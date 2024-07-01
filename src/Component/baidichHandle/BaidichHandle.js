import React, { Component } from 'react';
import PageForm from '../PageForm/PageForm';
import ItemCard from '../../function/ItemCard/ItemCard';
import { Button } from 'react-bootstrap';
import { getContentFromFireBase } from '../../function/Firebase';
import Swal from 'sweetalert2';
import { AddDataToFireBaseNoKey } from '../../function/Firebase';
import DichthuatFormInput from '../DichthuatFormInput/DichthuatFormInput';
import { getValueFromPath } from '../../function/Firebase';

class BaidichHandle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baidich:null,
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
    componentDidMount(){
        // this.setIdState();
        this.getExistValue();

    }
    getExistValue =async ()=>{
        var dichthuat = localStorage.getItem("dichthuat");
        if(dichthuat){
            const author = await getValueFromPath(`/users/dichthuat/${dichthuat}/author`);
            const imgAuthor = await getValueFromPath(`/users/dichthuat/${dichthuat}/imgAuthor`);
            const webLink = await getValueFromPath(`/users/dichthuat/${dichthuat}/weblink`);
            this.setState({dichthuat,author,imgAuthor,webLink})
        }
        
    }
    onChangeHandle = (event, nameState) => {
        this.setState({
            [nameState]: event.target.value
        });
        // console.log(this.state);
        if(nameState==="youtubeLink"){
            const id = this.getYoutubeId(event.target.value);
            this.setState({id});
            console.log(id);
        }
    }
    getYoutubeId = (link) =>{
        var yt = link.split('=');
        const videoId = yt[1] ? yt[1].split('&')[0] : "null";
        return videoId;
    }
    setIdState = () =>{
        if (this.state.youtubeLink){
            const id = this.getYoutubeId(this.state.youtubeLink);
            this.setState({id});
            console.log(id);
        }
    }
    updateBoDichMoi = async() =>{
        const { dichthuat,baidich, youtubeLink, webLink,
            tieudeTiengTrung, author, imgAuthor, id} = this.state;

        const dichthuatPath = `/users/dichthuat/${dichthuat}/listBaihoc/${baidich}`

        const youtubeLinkPath = `${dichthuatPath}/link`
        const tieudeTiengTrungPath = `${dichthuatPath}/tieudeTiengTrung`
        try{
            if(!this.isNhapDayDuText()){
                return;
            }
            else if(await this.isTieuDeExistInFirebase()){
                return;
            }
            else{
                var AddyoutubeLink= await AddDataToFireBaseNoKey(youtubeLinkPath,youtubeLink)
                var AddtieudeTiengTrung= await AddDataToFireBaseNoKey(tieudeTiengTrungPath,tieudeTiengTrung)
               
    
                if(!AddyoutubeLink||!AddtieudeTiengTrung){
                        let error = {
                            message: "Tạo bài mới thất bại!"
                        };
                        Swal.fire(error.message, "", "info");
                        this.setState({ error });
                    }
                else {
                    Swal.fire("Tạo bài mới thành công", "", "success");
                    this.setState({ nav:true });
                }
            }
        }
        catch (error) {
            console.error('Lỗi tạo bài mới:', error);
            let errorMessage = {
                message: 'Lỗi tạo bài mới: ' + error.message
            };
            Swal.fire(error.message, "", "info");
            this.setState({ error: errorMessage });
        }
       

    }
    isTieuDeExistInFirebase =async() =>{
        const { dichthuat,baidich} = this.state;
        const dichthuatPath = `/users/dichthuat/${dichthuat}/listBaihoc/${baidich}`
        const respond = await this.getInfo(dichthuatPath); 
            if (respond){
                let error = {
                    message: `Tên bộ dịch thuật "${dichthuat}" đã tồn tại, vui lòng tạo bộ dịch thuật khác`
                };
                Swal.fire(error.message, "", "info");
                this.setState({ error });
                return true;
            }
            else return false;
    }
    isNhapDayDuText = ()=>{
        const { baidich,youtubeLink,tieudeTiengTrung} = this.state;
        
        
        
        if(!baidich||!tieudeTiengTrung||!youtubeLink){
                let error = {
                    message: "Vui lòng điền đầy đủ thông tin và thử lại"
                };
                Swal.fire(error.message, "", "info");
                this.setState({ error });
                return false;
            }
        else if (!this.isValidDichThuat(baidich)) {
            let error = {
                message: `Tên bài dịch "${baidich}" không được chứa các ký tự: '.', '#', '$', '[', hoặc ']'`
            };
            Swal.fire(error.message, "", "info");
            this.setState({ error });
        }
        else if (!this.isValidYoutubeLink(youtubeLink)) {
            let error = {
                message: `Đường link YouTube không hợp lệ "${youtubeLink}"`
            };
            Swal.fire(error.message, "", "info");
            this.setState({ error });
        }
        else return true;

    }
    isValidYoutubeLink = (link) => {
        const regex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;
        return regex.test(link);
    }
    isValidDichThuat = (dichthuat) => {
        const invalidCharsRegex = /[.#$[\]]/;
        return !invalidCharsRegex.test(dichthuat);
    };
    
    getPlaylistId = (link) => {
        const urlParams = new URLSearchParams(new URL(link).search);
        console.log(urlParams.get('list'))
        return urlParams.get('list');
    }

    getInfo = async (path)=>{
        // begin getcontentFromFirebase
        try {
            const data = await getContentFromFireBase(path);
            if (data !== null) {
                console.log("data return:", data);
                return data; // Trả về dữ liệu
            }
        } catch (error) {
            // console.error("Có lỗi xảy ra:", error);
            throw error; 
        }
    }
    
    render() {
        return (
            <PageForm body={
                <div>
                    {this.state.error&&(
                        <div className='dichthuat-showError'>
                           Lỗi: "{this.state.error.message}"
                        </div> 
                    )}
                    
                    <div className='dichthuat-container row row-cols-6 row-cols-xxxxxl-5 row-cols-xxxxl-4 row-cols-xl-3 row-cols-lg-2 gy-6 gx-xxl-2 gx-xl-3 gx-lg-2'>
                        {/* {this.showDichThuat()} */}
                        <DichthuatFormInput
                            title="Tiêu đề bài dịch mới"
                            name="baidich"
                            placeHolder="Nhập tiêu đề bài dịch mới"
                            onChangeHandle={(event) => this.onChangeHandle(event, "baidich")}
                        />
                        <DichthuatFormInput
                            title="Tiêu đề tiếng Trung của bài dịch mới"
                            name="tieudeTiengTrung"
                            placeHolder="Nhập tiêu đề tiếng Trung của bộ dịch thuật mới"
                            onChangeHandle={(event) => this.onChangeHandle(event, "tieudeTiengTrung")}
                        />
                        
                        <DichthuatFormInput
                            title="Đường link youtube của bài dịch mới"
                            name="youtubeLink"
                            placeHolder="Nhập đường link của một bài học trong bộ dịch"
                            onChangeHandle={(event) => this.onChangeHandle(event, "youtubeLink")}
                        />


                    </div>


                    <div className='dichthuatAdd-View'>
                        <ItemCard
                        webLink={this.state.webLink?this.state.webLink:null}
                        tieudeTiengTrung={this.state.tieudeTiengTrung?this.state.tieudeTiengTrung:null}
                        author={this.state.author?this.state.author:null}
                        imgAuthor={this.state.imgAuthor?this.state.imgAuthor:null}
                        link="#"
                        title={this.state.baidich?this.state.baidich:null}
                        img={this.state.id?`https://img.youtube.com/vi/${this.state.id}/sddefault.jpg`:null}
                        alt="IMG Link"
                        />
                        <div className='col-2 dichthuatAdd-button'>
                            <Button variant="info" onClick={this.updateBoDichMoi} >
                                        Add
                                        <i className="fa-solid fa-calendar-plus"></i>
                            </Button> 
                        </div>
                        <YoutubeViewer link={this.state.webLink?this.getPlaylistId(this.state.webLink):null}/>

                        

                    </div>
                </div>
            }/>
        );
    }
}

export default BaidichHandle;
function YoutubeViewer(props){
    return(
        <div className='youtube-Viewer col-4'>
            <div className='youtube-Viewer-show'>
            <iframe 
                // width="100%"
                ref={props.iframeRef}
                height={props.height}
                src={`https://www.youtube.com/embed/videoseries?list=${props.link}`}
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
