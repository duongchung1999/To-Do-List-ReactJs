import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PageForm from '../PageForm/PageForm';
import { NavLink } from 'react-router-dom';
import ItemCard from '../../function/ItemCard/ItemCard';
import { getKeyValueFromFireBase } from '../../function/Firebase';
import { getValueFromPath } from '../../function/Firebase';

class DichThuatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dichthuats: [],
            youtubeLinkToGetImgs: {} ,
            webLinks: {} ,
            tieudeTiengTrungs: {} ,
            authors: {} ,
            imgAuthors: {} ,
            ids: {} ,
        };
    }
    componentDidMount(){
        this.getDichThuat();
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
        const ids = {};
        for (let dichthuat of dichthuats) {
            youtubeLinkToGetImgs[dichthuat.key] = await getValueFromPath(`/users/dichthuat/${dichthuat.key}/link`);
            webLinks[dichthuat.key] = await getValueFromPath(`/users/dichthuat/${dichthuat.key}/webLink`);
            tieudeTiengTrungs[dichthuat.key] = await getValueFromPath(`/users/dichthuat/${dichthuat.key}/tieudeTiengTrung`);
            authors[dichthuat.key] = await getValueFromPath(`/users/dichthuat/${dichthuat.key}/author`);
            imgAuthors[dichthuat.key] = await getValueFromPath(`/users/dichthuat/${dichthuat.key}/imgAuthor`);
            ids[dichthuat.key] = await getValueFromPath(`/users/dichthuat/${dichthuat.key}/id`);
           
        }
        this.setState({ webLinks });
        this.setState({ tieudeTiengTrungs });
        this.setState({ authors });
        this.setState({ imgAuthors });
        this.setState({ youtubeLinkToGetImgs });
        this.setState({ ids });
       
    }
    to_slug=(slug) => {
        
        slug = slug.toLowerCase();
 
        //Đổi ký tự có dấu thành không dấu
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
        slug = slug.replace(/đ/gi, 'd');
        //Xóa các ký tự đặt biệt
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
        //Đổi khoảng trắng thành ký tự gạch ngang
        slug = slug.replace(/ /gi, "-");
        //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
        //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
        slug = slug.replace(/\-\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-/gi, '-');
        slug = slug.replace(/\-\-/gi, '-');
        //Xóa các ký tự gạch ngang ở đầu và cuối
        slug = '@' + slug + '@';
        slug = slug.replace(/\@\-|\-\@|\@/gi, '');
        return slug
    }
    setDichThuatName = (name)=>{
        console.log("setDichthuatName")
        localStorage.setItem("dichthuat",name);
    }
    showDichThuat = () => {
        const { dichthuats, youtubeLinkToGetImgs, webLinks,
            tieudeTiengTrungs, authors, imgAuthors, ids} = this.state;
        if (dichthuats.length > 0) {
            return dichthuats.map((dichthuat, index) => {
                const webLink = webLinks[dichthuat.key];
                const tieudeTiengTrung = tieudeTiengTrungs[dichthuat.key];
                const author = authors[dichthuat.key];
                const imgAuthor = imgAuthors[dichthuat.key];
                const youtubeLinkToGetImg = youtubeLinkToGetImgs[dichthuat.key];
                const id = ids[dichthuat.key];
                console.log(id)
                return (
                     <ItemCard
                     cardClick={() => this.setDichThuatName(dichthuat.key)}
                     webLink={webLink}
                     tieudeTiengTrung={tieudeTiengTrung}
                     author={author}
                     imgAuthor={imgAuthor}
                     key={index}
                     link={`/dichthuatDetails/${this.to_slug(dichthuat.key)}/${id}`}
                     title={dichthuat.key}
                     titleDescription="Description"
                     img={id?`https://img.youtube.com/vi/${id}/sddefault.jpg`:null}
                     alt="IMG Link"
                     
                 />
                   
                );
            });
        } else return null;
    }
    getYoutubeId = (link) =>{
        var yt = link.split('=');
        const videoId = yt[1] ? yt[1].split('&')[0] : "null";
        return videoId;
    }


    render() {
        return (
            <PageForm body={
                <div>
                    <NavLink to="dichthuatHandle">
                        <Button variant="info" >
                                    Edit
                                    <i className="fa-solid fa-calendar-plus"></i>
                        </Button>
                    </NavLink>
                    
                    <div className='dichthuat-container row row-cols-6 row-cols-xxxxxl-5 row-cols-xxxxl-4 row-cols-xl-3 row-cols-lg-2 gy-6 gx-xxl-2 gx-xl-3 gx-lg-2'>
                        {this.showDichThuat()}
                    </div>
                </div>}
                />
        );
    }
}

export default DichThuatList;