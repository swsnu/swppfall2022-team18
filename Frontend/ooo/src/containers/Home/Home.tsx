import {logoutUser} from '../../api/user'
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ClosetItem from '../../components/ClosetItem/ClosetItem'
import './Home.css'
import neet from '../../assets/images/neet.jpg'
import hood from '../../assets/images/hood.jpg'
import pants from '../../assets/images/pants.jpg'
import outfit_1 from '../../assets/images/outfit_1.jpg'
import outfit_2 from '../../assets/images/outfit_2.jpg'
import outfit_3 from '../../assets/images/outfit_3.jpg'
import OutfitPreview from '../../components/OutfitPreview/OutfitPreview';

export default function Home(){

    const navigate = useNavigate()

    return(
        <div className='Home'>
            <div className='Home-header'>
            <Header 
            clickInfoHandler={() => {navigate('/')}} 
            clickLogoutHandler={() => {logoutUser()}}
            clickHeaderHandler={() => {navigate('/home')}}
            ></Header>
            </div>
            
            <div className='HomeTop'>
                <div className='ClosetDiv'>
                    <text id='Closet-text' >Closet</text>
                    <div className='Closet-image'>
                        <ClosetItem source_url={neet} type='니트' color="회색" pattern="없음" />
                        <ClosetItem source_url={hood} type='후드' color="회색" pattern="없음"/>
                        <ClosetItem source_url={pants} type='바지' color="회색" pattern="없음"/>
                    </div>
                    <div className='Closet-button'>
                    <button id='more-button' onClick={() => {navigate('/closet')}}>More</button>
                    </div>
                </div>
                <div className='CenterDiv'></div>
                <div className="TodayOutfit">
                    <text id='TodayOutfit-text'>Today{"'"}s Outfit</text>
                    <div className='TodayOutfit-content'>
                        <div className="TodayOutfit-image">
                            <img id = 'today-outfit-img' src= {outfit_1}></img>
                        </div>
                        <div className="TodayOutfit-lable">
                            <text id='today-outfit-info-text'>캐주얼 한 멋</text>
                            <text id="today-cloth-name">Jumber</text>
                            <text id="today-cloth-name">후드집업</text>
                            <text id="today-cloth-name">바날 티셔츠</text>
                            <text id="today-cloth-name">데님</text>
                            <button id='wear-button'>오늘 입기</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='HomeBottom'>
                <div className='OutfitDiv'>
                    <div className='OutfitHead'>
                        <text id='Outfit-text'>Outfit</text>
                        <button id='outfit-more-button' onClick={() => {navigate('/outfit')}}>More</button>
                    </div>
                    <div className='OutfitImage'>
                        <OutfitPreview 
                        source_url={outfit_1} 
                        info="손쉽게 멋 내기"
                        cloth_names={['Coat', '맨투맨', '반팔 티셔츠', '스웨트팬츠']}/>
                        <OutfitPreview 
                        source_url={outfit_2} 
                        info="캐주얼 한 멋"
                        cloth_names={['Jumper', '후드집업', '반팔 티셔츠', '데님']}/>
                        <OutfitPreview 
                        source_url={outfit_3} 
                        info="캐주얼 한 멋"
                        cloth_names={['Jumper', '후드집업', '반팔 티셔츠', '데님']}/>
                    </div>
                    
                </div>
            </div>
        
        </div>
    )
}