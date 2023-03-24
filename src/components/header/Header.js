import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.css";
const Header = () => {
	const [searching, setSearch] = useState("");

	const { search } = useLocation();

	useEffect(() => {
		const sea = new URLSearchParams(search).get("search") || "";
		setSearch(sea);
	}, [search]);
	const inputRef = useRef(null);
	const onButtonClick = () => {
		inputRef.current.value = "";
		navigate("/");
	};
	const [user, setUser] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("user")) {
			setUser({
				...JSON.parse(localStorage.getItem("user")),
			});
		}
	}, [localStorage.getItem("user")]);

	const handleLogout = () => {
		localStorage.removeItem("user");
		navigate("/");
		window.location.reload();
	};
	return (
		<div className="header">
			<div className="d-flex brand">
				<div>
					<h1>Phim hay</h1>
				</div>
				<div className="menu no_margin">
					<span>
						<Link className="link" to="/">
							Trang chủ
						</Link>
					</span>
				</div>
			</div>
			<div className="d-flex search">
				<div className="search_items d-flex">
					<input
						onChange={(e) => {
							if (e.target.value) {
								navigate(`?search=${e.target.value}`);
							} else {
								navigate("/");
							}
						}}
						type="text"
						placeholder="Nhập tên phim cần tìm"
						ref={inputRef}
					/>
					{searching && (
						<div>
							<button onClick={onButtonClick}>X</button>
						</div>
					)}
				</div>
				<div className="search_button">
					<button
						onClick={() => {
							if (inputRef.current.value) {
								navigate(`?search=${inputRef.current.value}`);
							} else {
								navigate("/");
							}
						}}
					>
						Tìm
					</button>
				</div>
				{user?.email && (
					<div className="congra">Chào mừng: {user?.username}</div>
				)}
				{user?.email && (
					<button onClick={handleLogout} className="header_button">
						Đăng xuất
					</button>
				)}
				{!user?.email && (
					<button
						onClick={() => {
							navigate("/login");
						}}
						className="header_button"
					>
						Đăng nhập
					</button>
				)}
				{!user?.email && (
					<button
						onClick={() => {
							navigate("/register");
						}}
						className="header_button"
					>
						Đăng ký
					</button>
				)}
			</div>
		</div>
	);
};

export default Header;
