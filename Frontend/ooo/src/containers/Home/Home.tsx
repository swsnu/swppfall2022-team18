import {logoutUser} from '../../api/user'
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ClosetItem from '../../components/ClosetItem/ClosetItem'
import './Home.css'
import neet from '../../assets/images/neet.jpg'

export default function Home(){

    const navigate = useNavigate()
    useEffect(() => {
        console.log(neet)
    },[])
    
    return(
        <div className='Home'>
            <Header 
            clickInfoHandler={() => {navigate('/')}} 
            clickLogoutHandler={() => {logoutUser()}}
            clickHeaderHandler={() => {navigate('/home')}}
            ></Header>
            <div className='HomeTop'>
                <div className='ClosetDiv' onClick={() => {navigate('/closet')}}>
                    <text id='Closet-text' >Closet</text>
                    <div className='Closet-image'>
                        <text>test</text>
                        {/* <ClosetItem source_url={neet}></ClosetItem>
                        <ClosetItem source_url={neet}></ClosetItem>
                        <ClosetItem source_url={neet}></ClosetItem> */}
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