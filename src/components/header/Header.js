import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.css";
const Header = () => {
	const [search, setSearch] = useState("");

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
		toast.success("Đăng xuất thành công.", {
			autoClose: 2000,
		});
		setUser({});
	};
	return (
		<div className="header">
			<div className="d-flex brand">
				<div>
					<h1>Phim hay</h1>
				</div>
				<div className="menu">
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
							setSearch(e.target.value);
						}}
						type="text"
						placeholder="Nhập tên phim cần tìm"
					/>
					{search && <div>x</div>}
				</div>
				<div className="search_button">
					<button>Tìm</button>
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
