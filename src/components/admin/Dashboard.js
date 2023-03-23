import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";
import User from "./User";
const Dashboard = () => {
	const { search } = useLocation();
	const [kind, setKind] = useState("");
	useEffect(() => {
		const type = new URLSearchParams(search).get("type") || "";
		setKind(type);
	}, [search]);
	return (
		<div className="dashboard">
			<div className="dashboard_wrap">
				<div className="dashboard_nav">
					<div className="dashboard_title">
						<h1>
							<i>Dashboard</i>
						</h1>
					</div>
					<Link className="items_link" to="/">
						<div className={`dashboard_nav_items ${kind ? "" : "active"}`}>
							Manage user
						</div>
					</Link>
					<Link className="items_link" to="?type=movie">
						<div className={`dashboard_nav_items ${!kind ? "" : "active"}`}>
							Manage movie
						</div>
					</Link>
				</div>
				<div className="dashboard_items">
					<div className="dashboard_title">
						<h1>
							<i>Information</i>
						</h1>
					</div>
					<div className="dashboard_table">
						<User />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
