import React, { useEffect, useRef, useState } from "react";
import "./style.css";

const UserHomePage = ({ data, searchValue }) => {
	const [newData, setNewData] = useState(data.movies);
	const [menuType] = useState(data.types);
	const [searchType, setSearchType] = useState("");



	useEffect(() => {
		setNewData(data.movies.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase())))
	}, [searchValue])

	useEffect(() => {
		if (searchType == "") {
			setNewData(data.movies);
		} else {
			setNewData(data.movies.filter(item => item.type == (searchType)))
		}
	}, [searchType])



	// -- filter type
	const typeMenu = () => {
		return (
			<div className="btn-container">
				<button
					type="button"
					className="filter-btn"
					onClick={() => {
						setNewData(data.movies);
					}}
				>
					All
				</button>
				{menuType.map((type, index) => {
					return (
						<button
							type="button"
							className="filter-btn"
							key={index}
							onClick={() => {
								setSearchType(type.id); // -- search normal
							}}
						>
							{type.name}
						</button>
					)
				})}



			</div>
		)
	}

	// -- body film
	const render = () => {
		return (
			<div className="section-center">
				{newData.map((product, index) => {
					return (
						<article key={index} className="menu-item">
							<img src={product.image} alt={product.name} className="photo" />
							<div className="item-info">
								<header>
									<h4>{product.name}</h4>
									<h4 className="price">{product.year}</h4>
								</header>
								<p className="item-text">Điểm đánh giá: {product.evaluate}</p>
								<p className="item-text">{product.description}</p>
							</div>
						</article>
					)
				})}
			</div>
		)
	}

	return (
		<main>
			<section className="menu section">
				<div className="title">
					<h2>Phim Hay</h2>
					<div className="underline"></div>
				</div>
				{typeMenu()}
				{render()}
			</section>
		</main>
	)
};

export default UserHomePage;
