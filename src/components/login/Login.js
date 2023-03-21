import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.css";
const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [msg, setMsg] = useState({});
	const navigate = useNavigate();
	const handleLogin = () => {
		const user = {
			email: emailRef.current.value,
			password: passwordRef.current.value,
		};
		let ms = {};
		let check = false;
		if (!user?.email) {
			ms.email = true;
			check = true;
		}
		if (!user?.password) {
			check = true;
			ms.password = true;
		}
		setMsg({ ...ms });
		if (check) {
			return;
		}
		const accounts = JSON.parse(localStorage.getItem("accounts"));
		const some = accounts?.find(
			(item) => item?.email == user?.email && item?.password == user?.password
		);
		if (!some) {
			return setMsg({
				email: true,
				reemail: true,
			});
		}
		localStorage.setItem("user", JSON.stringify(some));
		toast.success("Đăng nhập thành công.", {
			autoClose: 2000,
		});
		navigate("/");
	};
	return (
		<div className="auth">
			<div className="auth_wrap">
				<div className="auth_platform">
					<div>
						Đăng nhập bằng facebook
						<i
							style={{ fontSize: "1.8rem", marginLeft: "0.5rem" }}
							className="fa-brands fa-facebook-f"
						></i>
					</div>
					<div>
						Đăng nhập bằng google
						<i
							style={{ fontSize: "1.8rem", marginLeft: "0.5rem" }}
							className="fa-brands fa-google-plus-g"
						></i>
					</div>
				</div>
				<div className="auth_title">Hoặc</div>
				<div className="auth_input">
					<input ref={emailRef} type="text" placeholder="Email *" />
				</div>
				{msg?.email && (
					<div className="auth_fix">
						{msg?.reemail
							? "Email hoặc mật khẩu đang sai"
							: "Email không được để trống."}
					</div>
				)}
				<div className="auth_input">
					<input ref={passwordRef} type="text" placeholder="Password *" />
				</div>
				{msg?.password && (
					<div className="auth_fix">Mật khẩu không được để trống</div>
				)}
				<div className="auth_button_login">
					<button onClick={handleLogin}>Đăng nhập</button>
					<Link className="forogt" to="/">
						Quên mật khẩu
					</Link>
				</div>
				<div style={{ marginBottom: "3rem" }} className="auth_line"></div>
				<div
					style={{ textAlign: "center", color: "black" }}
					className="auth_exist"
				>
					<span>Bạn chưa có tài khoản?</span>{" "}
					<Link className="link login_link" to="/register">
						Đăng ký
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
