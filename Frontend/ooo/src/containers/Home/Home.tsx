import Header from '../../components/Header'
import {logoutUser} from '../../api/user'
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home(){

    const navigate = useNavigate()

    
    return(
        <div className='Home'>
            <Header clickInfo={() => {navigate('/')}} clickLogout={() => {logoutUser()}}></Header>
        </div>
    )
}