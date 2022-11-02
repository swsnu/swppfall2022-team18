import {logoutUser} from '../../api/user'
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ClosetItem from '../../components/ClosetItem/ClosetItem'
import './Home.css'
import neet from '../../assets/images/neet.jpg'

export default function Home(){

    const navigate = useNavigate()

    return(
        <div className='Home'>
            <Header 
            clickInfoHandler={() => {navigate('/')}} 
            clickLogoutHandler={() => {logoutUser()}}
            clickHeaderHandler={() => {navigate('/home')}}
            ></Header>
            <div className='HomeTop'>
                <div className='ClosetDiv'>
                    <text id='Closet-text' >Closet</text>
                    <div className='Closet-image'>
                        <img id='img1' src={neet}></img>
                        <img id='img2' src={neet}></img>
                        {/* <ClosetItem source_url={neet}/> */}
                        {/* <ClosetItem source_url={'../../assets/images/neet.jpg'}></ClosetItem> */}
                        {/* <ClosetItem source_url={neet}></ClosetItem>
                        <ClosetItem source_url={neet}></ClosetItem> */}
                    </div>
                    <div className='Closet-button'>
                    <button id='closet-more-button' onClick={() => {navigate('/closet')}}>More</button>
                    </div>
                </div>
                <div className='CenterDiv'>

                </div>
                <div className="TodayOutfit">
                    <text id='TodayOutfit-text'>Today{"'"}s Outfit</text>
                </div>
            </div>
            
            <div className='HomeBottom'>
                <div className='OutfitDiv'>
                        <text id='Outfit-text'>Outfit</text>
                </div>
            </div>
        
        </div>
    )
}