import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
const Detail = () => {
  const [movie, setMovie] = useState({
    id: "",
    image: "",
    name: "",
    type: "",
    year: "",
    description: "",
  });
  const [type, setType] = useState({
    id: "",
    name: "",
  });
  const navigate = useNavigate();
  const { slug } = useParams();
  useEffect(() => {
    var movies = JSON.parse(localStorage.getItem("movies"));
    if (typeof movies === "undefined") {
      return navigate("/login");
    }
    var movieDetail = movies?.find((m) => m.id === slug);
    if (typeof movieDetail === "undefined") {
      return navigate("/login");
    }

    setMovie({ ...movieDetail });
  }, [slug]);

  useEffect(() => {
    var types = JSON.parse(localStorage.getItem("types"));
    if (typeof types === "undefined") {
      return navigate("/login");
    }
    var typeDetail = types?.find((m) => m.id === slug);
    if (typeof typeDetail === "undefined") {
      return navigate("/login");
    }

    setType({ ...typeDetail });
  }, [type]);

  return (
    <div id="movieDetail">
      <div className="image">
        <img alt="movieImage" src={movie.image} />
      </div>
      <div className="movieInfor">
        <div className="detailInfor">
          <h1 className=" textTitle">{movie.name}</h1>
          <div className="inforTech text">
            <span className="textDesTilte">Thể loại: </span>
            {type.name}
          </div>
          <div className="inforTech text">
            <span className="textDesTilte">Điểm đánh giá: </span>
          </div>
          <div className="inforTech text">
            <span className="textDesTilte">Mô tả: </span> {movie.description}
          </div>
          <button className="rateButton text">Đánh giá</button>
        </div>
        <div className="detailRate">
          <h1 className=" textTitle">Chi tiết đánh giá</h1>
          {/* <div className="inforTech text">
            <span className="textDesTilte">Thể loại: </span>
            {type.name}
          </div>
          <div className="inforTech text">
            <span className="textDesTilte">Điểm đánh giá: </span>
          </div>
          <div className="inforTech text">
            <span className="textDesTilte">Mô tả: </span> {movie.description}
          </div>
          <button className="rateButton text">Đánh giá</button> */}
        </div>
      </div>
    </div>
  );
};

export default Detail;
