import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './ArtistsPage.css';
import API from '../../services/Infos/Infos'
import arrow1 from './img/arrow left.png';
import arrow2 from './img/arrow right.png';

function SculpPage() {
    const [loading, setLoading] = useState(false);
    //  const [sidebar, setSidebar] = useState(false);
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);
    const [bioIcon, setBioIcon] = useState('');
    const [bioTitle, setBioTitle] = useState('');
    const [bioText, setBioText] = useState('');

    useEffect(() => {
        callPage()

    }, []);




    const callPage = async (pageNumber, side) => {
        setLoading(true)
        pageNumber = side == 1 ? page + 1 : side == 2 ? page - 1 : 0 
        let epochOptions = await API.getBioArtists({ page: pageNumber}).then(res => {
            setData(res)
            console.log(res)
            if(res.length > 0){
                setPage(pageNumber) 
            }
        }).catch(console.error)
       



        setLoading(false)
    }
    const bioFunction = async (index) => {
        setLoading(true)
        
        setBioIcon(data[index].ICON)
        setBioTitle(data[index].NAME +':'+ data[index].BORN +'-'+ data[index].DEATH)
        setBioText(data[index].BIO)




        setLoading(false)
    }





    return (
        <>
            {loading == true ?
                <div class='loader-background' >
                    <p>Loading Page</p>
                    <div class="loader">
                    </div>

                </div>
                : <></>}

            <div class='next-page'>
                <img class='arrow-size' src={arrow1} onClick={e=> callPage(page, 1)}alt='' />
                <img class='arrow-size' src={arrow2} onClick={e=> callPage(page, 2)}alt='' />

            </div>
            <div class='page-artists'>

                <div class='icons-side'>
                    <img class='icon-size' src={data.length > 0 ? `/images/icons/${data[0].ICON}`:''} onClick={e=> bioFunction(0)} alt='' />
                    <p class='icons-text'>{data.length>0 ? data[0].NAME: ''}</p>
                    <img class='icon-size' src={data.length > 1 ? `/images/icons/${data[1].ICON}`:''} onClick={e=> bioFunction(1)} alt='' />
                    <p class='icons-text'>{data.length>1 ? data[1].NAME: ''}</p>
                    <img class='icon-size' src={data.length > 2 ? `/images/icons/${data[2].ICON}`:''} onClick={e=> bioFunction(2)} alt='' />
                    <p class='icons-text'>{data.length>2 ? data[2].NAME: ''}</p>
                    <p style={{ color: 'black' }}>{page + 1}</p>

                </div>
                <div class='bio-side'>
                    <img class='icon-size mt-2' src={`/images/icons/${bioIcon}`} alt='' />

                    <p class='bio-title'>{bioTitle}</p>
                    <p class='bio-text'>
                    {bioText}</p>
                </div>



            </div>



            <div class="aviso">

                <h4>Atualmente a aplicação é focara para desktop, portanto ainda não ha portabilidade menor que 600px de largura por 400px de altura, um tamanho menos implicaria na perca da qualidade das imagens e experiencias.</h4>
            </div>

        </>
    )
}

export default SculpPage;