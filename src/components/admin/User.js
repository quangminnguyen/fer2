import React, { useEffect, useState } from "react";
import "./style.css";
const User = () => {
	const [user, setUser] = useState([]);

	useEffect(() => {
		const users = localStorage.getItem("accounts");
		if (users) {
			setUser(JSON.parse(users));
		}
	}, []);

	const handleBan = (index) => {
		const ar = user;
		ar[index].block = true;
		localStorage.removeItem("accounts");
		localStorage.setItem("accounts", JSON.stringify(ar));
		setUser([...ar]);
	};

	const handleUnban = (index) => {
		const ar = user;
		ar[index].block = false;
		localStorage.removeItem("accounts");
		localStorage.setItem("accounts", JSON.stringify(ar));
		setUser([...ar]);
	};
	return (
		<div className="table_contain">
			<table className="table">
				<thead>
					<tr className="t_row">
						<th className="t_stt">STT</th>
						<th className="t_id">ID</th>
						<th className="t_email">Email</th>
						<th className="t_username">Username</th>
						<th className="t_role">Role</th>
						<th className="t_block">isBlock</th>
						<th className="t_bars"></th>
					</tr>
				</thead>
				<tbody>
					{user?.map((item, index) => (
						<tr className="t_row_2">
							<th className="t_stt font_400">{index + 1}</th>
							<th className="t_id font_400">{item?.id}</th>
							<th className="t_email font_400">{item?.email}</th>
							<th className="t_username font_400">{item?.username}</th>
							<th className="t_role">{item?.role}</th>
							<th
								style={!item?.block ? { color: "green" } : { color: "red" }}
								className="t_block font_400"
							>
								{!item?.block ? "No block" : "Block"}
							</th>
							<th className="t_bars">
								{!item?.block ? (
									<i
										onClick={() => handleBan(index)}
										style={{ cursor: "pointer", color: "red" }}
										className="fa-solid fa-ban"
									></i>
								) : (
									<i
										onClick={() => handleUnban(index)}
										style={{ cursor: "pointer", color: "green" }}
										className="fa-solid fa-check"
									></i>
								)}
							</th>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default User;
