import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
const Header = () => {
	const [search, setSearch] = useState("");
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
				<button className="header_button">Đăng nhập</button>
				<button className="header_button">Đăng ký</button>
			</div>
		</div>
	);
};

export default Header;
