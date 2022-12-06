import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signupUser } from "../../api/user";
import "./Signup.css";

export default function Signup() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
	const [Signup, setSignup] = useState(false);
	const [wrongInput, setWrongInput] = useState("");

    const TEXTISEMPTY = "ID와 패스워드는 필수로 입력해야합니다."
    const DUPLICATE_ID = "해당 ID가 이미 존재합니다."
    const WRONG_PASSWORD = "패스워드 확인이 일치하지 않습니다."
	const navigate = useNavigate();

	const checkSignupned = () => {
		console.log(localStorage.getItem("token"));
		return (
			localStorage.getItem("username") !== null &&
			(localStorage.getItem("token") !== null ||
				localStorage.getItem("token") !== undefined)
		);
		// return false;
	};

	useEffect(() => {
		const redirect = () => {
			if (checkSignupned()) {
				navigate("/home");
			}
		};
		redirect();
	}, []);

    const postSignUpHandler = async() => {
        // check test empty
        if (username === "" || password === ""){
            setWrongInput(TEXTISEMPTY)
        }
        //check wrong_password
        else if (password !== checkPassword){
            setWrongInput(WRONG_PASSWORD)
        }
        else {
            await signupUser(username, password).then(() => {
                navigate("/")
            }).catch((error) => {
                console.log(error)
                setWrongInput(DUPLICATE_ID)
            })
        }
    }

	return (
		<div className="Signup">
			<div className="header-div">
				<text id="appName">oOo</text>
				<text id="detailAppName">:recommend your outfit</text>
			</div>
			<div className="form">
				<div className="form-margin-left"></div>
				<div className="Signup-form">
					<div className="Signup-text">
						<text id="signin-signup-text">회원가입</text>
					</div>
					<div className="username-div">
						<input
							id="username-input"
							data-testid="username-input"
							type="text"
							placeholder="아이디"
							value={username}
							onChange={(event) => setUsername(event.target.value)}
						/>
					</div>
					<div className="pw-div">
						<input
							id="pw-input"
							data-testid="pw-input"
							value={password}
							placeholder="비밀번호"
							onChange={(event) => setPassword(event.target.value)}
						/>
					</div>
					<div className="checkpw-div">
						<input
							id="checkpw-input"
							data-testid="checkpw-input"
							value={checkPassword}
							placeholder="비밀번호 확인"
							onChange={(event) => setCheckPassword(event.target.value)}
						/>
					</div>
					<div className="wrong-div">
						<text data-testid="wrong-text" id="wrong-text">{wrongInput}</text>

					</div>
					<div className="button-div">
						<button
							id="signup-button"
							data-testid="signup-button"
							onClick={() => postSignUpHandler()}
						>
							가입하기
						</button>
					</div>
				</div>
				<div className="form-margin-right"></div>
			</div>
		</div>
	);
}
