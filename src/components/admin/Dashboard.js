import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Genre from "./Genre";
import Movie from "./Movie";
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
						<div
							className={`dashboard_nav_items ${
								kind !== "movie" ? "" : "active"
							}`}
						>
							Manage movie
						</div>
					</Link>
					<Link className="items_link" to="?type=genre">
						<div
							className={`dashboard_nav_items ${
								kind !== "genre" ? "" : "active"
							}`}
						>
							Manage Genre
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
						{kind ? kind === "movie" ? <Movie /> : <Genre /> : <User />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
