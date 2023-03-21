import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/homepage/Home";
import Register from "./components/register/Register";
import Detail from "./components/detail/Detail";
import { useState } from "react";
import dataRoot from "./data.json";
function App() {
	const [data, setData] = useState(dataRoot);
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<Home data={data} />} />
					<Route path="/:slug" element={<Detail data={data} />} />
					<Route path="/register" element={<Register data={data} />} />
					<Route path="/login" element={<Login data={data} />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
