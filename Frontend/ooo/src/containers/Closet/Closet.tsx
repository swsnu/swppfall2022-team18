import "./Closet.css"
import { logoutUser } from '../../api/user'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ClosetItem from '../../components/ClosetItem/ClosetItem'
import {
    selectUserCloth,
    fetchUserClothes,
    fetchUserCloth,
    createUserCloth,
    deleteUserCloth
} from "../../store/slices/userCloth";
import { AppDispatch } from "../../store";
import Modal from 'react-modal'

import neet from '../../assets/images/neet.jpg'
import hood from '../../assets/images/hood.jpg'
import pants from '../../assets/images/pants.jpg'

import AddClothModal from '../../components/AddClothModal/AddClothModal'

interface IProps {
    title: string;
}
  
type ClosetItem = { id: number; source_url: string; type: string; color: string, pattern: string };  

export default function Closet(props: IProps){

    const navigate = useNavigate()
    const { title } = props;
      
    const userClothState = useSelector(selectUserCloth);
    const dispatch = useDispatch<AppDispatch>();
  
    // useEffect(() => {
    //     console.log(neet)
    // },[])

    useEffect(() => {
      dispatch(fetchUserClothes());
    }, []);

    const [modalOpen, setModalOpen] = useState(false)
    const clickAddClothPopupHandler = () => {
        setModalOpen(true)
    };
    
    return(
        <div className='Closet'>
            <div className='Closet-header'>
            <Header 
                clickInfoHandler={() => {navigate('/')}} 
                clickLogoutHandler={() => {logoutUser()}}
                clickHeaderHandler={() => {navigate('/home')}}
            ></Header>
            </div>

            <div className='ClosetTop'>
                <div className='ClosetDiv'>
                    <div className='ClosetHead'>
                        <text id='Closet-text-main'>Closet</text>
                        <button id='add-cloth-button' onClick={clickAddClothPopupHandler}>Add</button>
                        <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
                            <AddClothModal></AddClothModal>
                        </Modal>
                    </div>

                    <text id='Closet-text-sub'>Outwear</text>
                    <div className='Closet-image-sub'>
                        {/* {userClothState.userClothes.map((td) => { // userCloth.ts -> userClothes: []
                            return (
                                <ClosetItem
                                    key={td.id}
                                    source_url={"img/outfit/" + td.image_id + ".jpg"}
                                    type={td.type}
                                    color={td.color}
                                    pattern={td.pattern}
                                    // clickDetail={() => clickArticleHandler(td)} clickClothDetailPopupHandler는 컴포넌트에 구현되어있어야함
                                />
                            );
                        })} */}
                    </div>

                    <text id='Closet-text-sub'>Top</text>
                    <div className='Closet-image-sub'>
                        <ClosetItem source_url={neet} type='니트' color="회색" pattern="없음" />
                        <ClosetItem source_url={hood} type='후드' color="회색" pattern="없음"/>
                    </div>

                    <text id='Closet-text-sub'>Bottom</text>
                    <div className='Closet-image-sub'>
                        <ClosetItem source_url={pants} type='바지' color="회색" pattern="없음"/>
                    </div>

                    {/* closetItem 컴포넌트 가져오고, onclick clickClothDetailPopupHandler 달기 */}
                    {/* 상의 div, 하의 div 나눠서 가져와야 함. 제목도 달고 */}

                </div>

            </div>

        </div>
    )
}