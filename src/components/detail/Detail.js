import React, { useState } from "react";
import "./style.css";
const Detail = ({ data }) => {
	const [movie, setMovie] = useState(data.movie);
	return (
		<div id="movieDetail">
			<div className="image">
				<img alt="movieImage" src={movie.image} />
			</div>
			<div className="movieInfor">
				<h2>{movie.name}</h2>
				<div className="">
					<h4>Thể loại: </h4>
					{movie.type}
				</div>
				<div>
					<h4>Điểm đánh giá: </h4>
				</div>
				<div>
					<h4>Mô tả: </h4> {movie.description}
				</div>
				<button className="rateButton">Đánh giá</button>
			</div>
		</div>
	);
};

export default Detail;
