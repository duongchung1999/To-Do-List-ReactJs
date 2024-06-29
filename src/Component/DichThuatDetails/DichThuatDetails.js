import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PageForm from '../PageForm/PageForm';
import { NavLink, useParams } from 'react-router-dom';
import ItemCard from '../../function/ItemCard/ItemCard';
import { getKeyValueFromFireBase, getValueFromPath } from '../../function/Firebase';

const DichThuatDetails = () => {
    const { slug, id } = useParams();
    const [dichthuats, setDichthuats] = useState([]);
    const [youtubeLinkToGetImgs, setYoutubeLinkToGetImgs] = useState({});
    const [webLinks, setWebLinks] = useState({});
    const [tieudeTiengTrungs, setTieudeTiengTrungs] = useState({});
    const [authors, setAuthors] = useState({});
    const [imgAuthors, setImgAuthors] = useState({});
    const [ids, setIds] = useState({});
    console.log(slug,id);

    useEffect(() => {
        getDichThuat();
    }, []);

    const getDichThuat = async () => {
        var dichThuatName = localStorage.getItem("dichthuat");
        var user = localStorage.getItem("user");
        console.log(dichThuatName);

        var dichthuatPath = `/users/dichthuat/${dichThuatName}/listBaihoc`;
        var dichthuats = await getKeyValueFromFireBase(dichthuatPath);
        
        if(dichthuats){
            setDichthuats(dichthuats);

            const webLinks = {};
            const tieudeTiengTrungs = {};
            const authors = {};
            const youtubeLinkToGetImgs = {};
            const imgAuthors = {};
            const ids = {};
           
            for (let dichthuat of dichthuats) {
                console.log(`${dichthuatPath}/${dichthuat.key}/link`);
                youtubeLinkToGetImgs[dichthuat.key] = await getValueFromPath(`${dichthuatPath}/${dichthuat.key}/link`);
                // webLinks[dichthuat.key] = await getValueFromPath(`${dichthuatPath}/${dichthuat.key}/link`);
                tieudeTiengTrungs[dichthuat.key] = await getValueFromPath(`${dichthuatPath}/${dichthuat.key}/tieudeTiengTrung`);
                authors[dichthuat.key] = await getValueFromPath(`/users/dichthuat/${dichThuatName}/author`);
                imgAuthors[dichthuat.key] = await getValueFromPath(`/users/dichthuat/${dichThuatName}/imgAuthor`);
                if (youtubeLinkToGetImgs[dichthuat.key]) {
                    ids[dichthuat.key] = getYoutubeId(youtubeLinkToGetImgs[dichthuat.key]);
                }
            }
    
            setTieudeTiengTrungs(tieudeTiengTrungs);
            setAuthors(authors);
            setImgAuthors(imgAuthors);
            setYoutubeLinkToGetImgs(youtubeLinkToGetImgs);
            setIds(ids);
        }
        
    }

    const showDichThuat = () => {
        if (dichthuats) {
            return dichthuats.map((dichthuat, index) => {
                const tieudeTiengTrung = tieudeTiengTrungs[dichthuat.key];
                const author = authors[dichthuat.key];
                const imgAuthor = imgAuthors[dichthuat.key];
                const youtubeLinkToGetImg = youtubeLinkToGetImgs[dichthuat.key];
                const id = ids[dichthuat.key];

                console.log(author);
                return (
                    <ItemCard
                        webLink={youtubeLinkToGetImg}
                        tieudeTiengTrung={tieudeTiengTrung}
                        author={author}
                        imgAuthor={imgAuthor}
                        key={index}
                        link="/"
                        title={dichthuat.key}
                        titleDescription="Description"
                        img={id ? `https://img.youtube.com/vi/${id}/sddefault.jpg` : null}
                        alt="IMG Link"
                    />
                );
            });
        } else return null;
    }

    const getYoutubeId = (link) => {
        var yt = link.split('=');
        const videoId = yt[1] ? yt[1].split('&')[0] : "null";
        return videoId;
    }

    return (
        <PageForm 
            body={
                <div>
                    <NavLink to="/dichthuat/baidichHandle">
                        <Button variant="info" >
                                    Edit
                                    <i className="fa-solid fa-calendar-plus"></i>
                        </Button>
                    </NavLink>
                    <div className='dichthuat-container row row-cols-6 row-cols-xxxxxl-5 row-cols-xxxxl-4 row-cols-xl-3 row-cols-lg-2 gy-6 gx-xxl-2 gx-xl-3 gx-lg-2'>
                        {showDichThuat()}
                    </div>
                </div>
            }
        />
    );
}

export default DichThuatDetails;
