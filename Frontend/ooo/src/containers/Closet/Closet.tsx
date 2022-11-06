import {logoutUser} from '../../api/user'
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ClosetItem from '../../components/ClosetItem/ClosetItem'
import neet from '../../assets/images/neet.jpg'

export default function Closet(){

    const navigate = useNavigate()
    useEffect(() => {
        console.log(neet)
    },[])
    
    return(
        <div className='Closet'>
            <Header 
            clickInfoHandler={() => {navigate('/')}} 
            clickLogoutHandler={() => {logoutUser()}}
            clickHeaderHandler={() => {navigate('/home')}}
            ></Header>
        
        </div>
    )
}