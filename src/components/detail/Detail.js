import React, { useState, useEffect, useRef } from "react";
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
		rate: "",
	});
	const [userComment, setUserComment] = useState({
		id: "",
		movie_id: "",
		rateStar: "",
		comment: "",
		account_id: "",
	});
	const starRef = useRef();
	const commentRef = useRef();
	const [comments, setComments] = useState([]);
	const [users, setUsers] = useState([]);

	const navigate = useNavigate();
	const { slug } = useParams();

	useEffect(() => {
		let user = JSON.parse(localStorage.getItem("user"));
		let movies = JSON.parse(localStorage.getItem("movies"));
		let types = JSON.parse(localStorage.getItem("types"));
		let rates = JSON.parse(localStorage.getItem("reviews"));
		let accounts = JSON.parse(localStorage.getItem("accounts"));
		if (
			typeof movies === "undefined" ||
			typeof types === "undefined" ||
			typeof rates === "undefined" ||
			typeof accounts === "undefined"
		) {
			return navigate("/login");
		}

		let movieDetail = movies?.find((m) => m.id == slug);
		let typeDetail = types?.find((m) => m.id == slug);

		if (accounts?.length === 0 || rates?.length === 0) {
			return;
		}
		let account;
		let commentDetail;
		let totalRate = 0;
		let movie_rate = rates
			?.filter((e) => e?.movie_id === movieDetail?.id)
			?.map((e) => {
				account = accounts.find((a) => a.id === e.account_id);
				if (account?.id === user?.id) {
					setUserComment({ ...e });
				}

				commentDetail = {
					id: e.id,
					movie_id: e?.movie_id,
					rateStar: e.rateStar,
					comment: e.comment,
					name: account.username,
					account_id: e.account_id,
				};
				totalRate = totalRate + e.rateStar;
				if (e.comment !== "") {
					return commentDetail;
				} else {
					return false;
				}
			});
		let rateAverage = totalRate / movie_rate.length || 0;

		setMovie({ ...movieDetail, rate: rateAverage, type: typeDetail?.name });
		setComments([...movie_rate]);
		setUsers([...accounts]);
	}, [navigate, slug]);

	const RateFormAppear = () => {
		let user = JSON.parse(localStorage.getItem("user"));

		if (user === null) {
			return (
				<button className="rateButton text" onClick={() => navigate("/login")}>
					Đánh giá
				</button>
			);
		} else {
			return (
				<div className="comments">
					<h1 className=" textTitle bold">Chi tiết đánh giá:</h1>
					<div id="CommentForm">
						<label htmlFor="starRate" className="text">
							Điểm đánh giá:
						</label>
						<input
							type="number"
							name="starRate"
							id="starRate"
							className="commentStarRate"
							ref={starRef}
							defaultValue={userComment.rateStar}
						></input>
						<div className="warn" id="startRateWarn"></div>
						<div className="text">Bình luận:</div>
						<textarea
							type="text"
							name="commentText"
							id="commentText"
							cols="100"
							rows="5"
							ref={commentRef}
							defaultValue={userComment.comment}
						></textarea>
					</div>
					<button className="rateButton text" onClick={handleSubmitComment}>
						Đánh giá
					</button>
				</div>
			);
		}
	};
	const handleSubmitComment = () => {
		let user = JSON.parse(localStorage.getItem("user"));
		let rates = JSON.parse(localStorage.getItem("reviews"));
		const start = starRef.current?.value;
		const content = commentRef.current?.value;
		if (user === null) {
			return navigate("/login");
		}
		if (start < 0 || start > 10) {
			document.querySelector("#startRateWarn").innerHTML =
				"Điểm đánh giá cần nằm trong khoảng từ 0 đến 10";
			return;
		} else {
			document.querySelector("#startRateWarn").innerHTML = "";
		}
		if (!content) {
			document.querySelector("#startRateWarn").innerHTML =
				"Comment không thể empty!";
			return;
		}
		let newComment = {
			id: rates[rates?.length - 1]?.id + 1,
			movie_id: movie?.id,
			rateStar: start * 1,
			comment: content,
			account_id: user?.id,
		};
		let ar = comments;
		const newArr = [];
		rates?.forEach((item) => {
			const some = ar?.find(
				(infor) => infor?.id?.toString() === item?.id?.toString()
			);
			if (!some) {
				return newArr.push(item);
			}
			return newArr.push(some);
		});
		const some = comments?.some(
			(item) => item?.account_id?.toString() === user?.id?.toString()
		);
		if (!some) {
			ar.push(newComment);
			newArr.push(newComment);
		} else {
			ar = ar.map((item) => {
				if (item?.account_id?.toString() === user?.id?.toString()) {
					return {
						...item,
						comment: content,
						rateStar: start * 1,
					};
				}
				return item;
			});
		}
		let coms = ar.map((item) => {
			const some = users?.find((infor) => {
				return infor?.id?.toString() === item?.account_id?.toString();
			});
			return {
				...item,
				name: some?.username,
			};
		});
		setComments([...coms]);
		setUserComment({
			...newComment,
		});
		const total = ar?.reduce((current, item) => {
			return current + item?.rateStar;
		}, 0);
		setMovie({
			...movie,
			rate: total / ar?.length,
		});
		let newCommentLocalStorage = [];
		newArr?.forEach((item) => {
			const some = ar?.find(
				(infor) => infor?.id?.toString() === item?.id?.toString()
			);
			if (!some) {
				return newCommentLocalStorage.push(item);
			}
			return newCommentLocalStorage.push(some);
		});

		localStorage.removeItem("reviews");
		localStorage.setItem("reviews", JSON.stringify(newCommentLocalStorage));
	};

	return (
		<div id="movieDetail">
			<div className="image">
				<img alt="movieImage" src={movie.image} />
			</div>
			<div className="movieInfor">
				<div className="detailInfor">
					<h1 className=" textTitle bold">{movie.name}</h1>
					<div className="inforTech text">
						<span className="bold">Thể loại: </span>
						{movie.type}
					</div>
					<div className="inforTech text">
						<span className="bold">Điểm đánh giá: </span>
						{movie.rate}
					</div>
					<div className="inforTech text">
						<span className="bold">Mô tả: </span> {movie.description}
					</div>
				</div>
				<RateFormAppear />
				<div className="detailRate">
					<h1 className=" textTitle bold">Bình luận</h1>
					<div id="commentMessage"></div>
					{comments.length !== 0 ? (
						comments.map((e) => (
							<div id={e?.id} key={e?.id} className="text comment">
								<span className="bold">{e?.name}</span>: {e?.comment}
							</div>
						))
					) : (
						<div id="commentMessage" className="text">
							Không có comment cho đến thời điểm hiện tại
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Detail;
