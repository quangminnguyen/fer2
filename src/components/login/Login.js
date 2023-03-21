import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const Login = () => {
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
					<input type="text" placeholder="Email *" />
				</div>
				<div className="auth_fix">Email không được để trống.</div>
				<div className="auth_input">
					<input type="text" placeholder="Password *" />
				</div>
				<div className="auth_fix">Mật khẩu không được để trống</div>
				<div className="auth_button_login">
					<button>Đăng ký</button>
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
