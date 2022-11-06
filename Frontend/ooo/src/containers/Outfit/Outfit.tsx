import {logoutUser} from '../../api/user'
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ClosetItem from '../../components/ClosetItem/ClosetItem'
import './Outfit.css'
import neet from '../../assets/images/neet.jpg'
import hood from '../../assets/images/hood.jpg'
import pants from '../../assets/images/pants.jpg'

export default function Outfit(){

    const navigate = useNavigate()

    return(
        <div className=''>
            <Header 
            clickInfoHandler={() => {navigate('/')}} 
            clickLogoutHandler={() => {logoutUser()}}
            clickHeaderHandler={() => {navigate('/home')}}
            ></Header>
            <div className='OutfitTop'>
            </div>
        
        </div>
    )
}