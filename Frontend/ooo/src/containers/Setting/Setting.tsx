import { logoutUser, editUser, deleteUser } from '../../api/user';
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import ClosetItem from "../../components/ClosetItem/ClosetItem";
import "./Setting.css";
import { AppDispatch } from "../../store";

export default function Setting() {
	const navigate = useNavigate();
	const [Loading, setLoading] = useState(false);

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [checkPassword, setCheckPassword] = useState("")
    const [errMsg, setErrMsg] = useState("");

	//for logout
	const [isSending, setIsSending] = useState(false)
	const checkLoginned = () => {
		if(localStorage.getItem("username") !== null){
			return true
		}
		else return false
	};

    const getName = () => {
        const n = localStorage.getItem("username")
        if(n !== null) setName(n)
    }
    
    const clickEditBtnHandler = async() => {
        if(password === ""){
            setErrMsg("비밀번호를 입력해주세요")
        }
        else{
            await editUser(password).then(() => {
                navigate("/home")
            }).catch((e) => console.log(e))
        }
        
        
    }

    const clickWithdrawBtnHandler = async() => {
        await deleteUser().then(() => {
            navigate("/")
        }) .catch((e) => console.log(e))
    
        
    }

	useEffect(() => {
		const redirect = () => {
			if (!checkLoginned()) {
				navigate("/");
			}
		};
		redirect();
        getName();
	}, [isSending]);

    useEffect(() => {
        const checkPw = () => {
            if(password != checkPassword){
                setErrMsg("비밀번호가 일치하지 않습니다.")
            }
            else{
                setErrMsg("")
            }
        }
        checkPw()
    }, [checkPassword, password])


    return (
        <div className="Setting">
            <div className="Setting-header"
                data-testid='Header'>
                <Header
                    clickInfoHandler={() => {
                        navigate("/setting");
                    }}
                    clickLogoutHandler={async() => {
                        await logoutUser().catch((error) => console.log(error))
                        setIsSending(!isSending)
                    }}
                    clickHeaderHandler={() => {
                        navigate("/home");
                    }}
                ></Header>
            </div>
            <div className="Setting-bottom">
                <div className="Setting-right">
                    <text id='myinfo-text'>내 정보 설정</text>
                    <div id='text-input'>
                        <text id='name-text'>아이디</text>
                        <input id='name-input' defaultValue={name} disabled={true}></input>
                    </div>
                    <div id='text-input'>
                        <text id='name-text' >비밀번호</text>
                        <input id='name-input' data-testid="password-input" 
                        onChange={(event) => {setPassword(event.target.value)}}
                        value={password}></input>
                    </div>
                    <div id='text-input'>
                        <text id='name-text'>비밀번호확인</text>
                        <input id='name-input' data-testid="password-check-input" 
                        onChange={(event) => {setCheckPassword(event.target.value)}}
                        value={checkPassword}></input>
                    </div>
                    <div id='text-input'>
                        <text>{errMsg}</text>
                    </div>
                    <div id='text-input'>
                        <button id='deleteButton' data-testid="delete-button" onClick={() => {clickWithdrawBtnHandler()}}>회원탈퇴</button>
                        <button id='okButton' data-testid="ok"
                        disabled={errMsg === "" ? false : true}
                        onClick={() => {clickEditBtnHandler()}}>수정</button>
                    </div>
                </div>
            </div>
        </div>
    );
}