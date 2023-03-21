import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
const Register = () => {
	return (
		<div className="auth">
			<div className="auth_wrap">
				<div className="auth_title">Đăng ký tài khoản</div>
				<div className="auth_input">
					<input type="text" placeholder="Email *" />
				</div>
				<div className="auth_input">
					<input type="text" placeholder="Password *" />
				</div>
				<div className="auth_input">
					<input type="text" placeholder="Re-Password *" />
				</div>
				<div className="auth_gender">
					<label>Giới tính</label>
					<div className="auth_radio">
						<input defaultChecked id="nam" type="radio" name="gender" />
						<label htmlFor="nam">Nam</label>
					</div>
					<div className="auth_radio">
						<input id="nu" type="radio" name="gender" />
						<label htmlFor="nu">Nữ</label>
					</div>
				</div>
				<div className="auth_fix">
					Email này đã tồn tại. Vui lòng lựa chọn email khác.
				</div>
				<div className="auth_exist">
					<span>Nếu tài khoản đã tồn tại</span>{" "}
					<Link className="link login_link" to="/login">
						Đăng nhập
					</Link>
				</div>
				<div className="auth_button_login">
					<button>Đăng ký</button>
				</div>
				<div className="auth_line"></div>
			</div>
		</div>
	);
};

export default Register;
