import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./containers/Login/Login";
import Home from "./containers/Home/Home";
import Closet from "./containers/Closet/Closet";
import Outfit from "./containers/Outfit/Outfit";
import OutfitDetail from "./containers/OutfitDetail/OutfitDetail";
import Redirect from "./containers/Redirect/Redirect";
import React from "react";
import Signup from "./containers/Signup/Signup";
import Setting from "./containers/Setting/Setting";
// import axios from 'axios';
// import { useCookies } from 'react-cookie';

// const [cookies] = useCookies()

// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = "X-CSRFToken"
// axios.defaults.headers.common['X-CSRFToken'] = cookies["csfttoken"];

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/closet" element={<Closet />} />
					<Route path="/home" element={<Home />} />
					<Route
						path="/outfit"
						element={
							<Outfit
								userHave={false}
								recommend={false}
								type={null}
								color={null}
								pattern={null}
							/>
						}
					/>
					<Route path="/outfit/:id" element={<OutfitDetail />} />
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="*" element={<h1>Not Found</h1>} />
					<Route path="/redirect" element={<Redirect />} />
					<Route path="/setting" element={<Setting/>}/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
