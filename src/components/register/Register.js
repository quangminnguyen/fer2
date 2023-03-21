import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
const Register = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const rePasswordRef = useRef();
	const namRef = useRef();
	const nuRef = useRef();

	const handleRegister = () => {};
	return (
		<div className="auth">
			<div className="auth_wrap">
				<div className="auth_title">Đăng ký tài khoản</div>
				<div className="auth_input">
					<input ref={emailRef} type="text" placeholder="Email *" />
				</div>
				<div className="auth_input">
					<input ref={passwordRef} type="text" placeholder="Password *" />
				</div>
				<div className="auth_input">
					<input ref={rePasswordRef} type="text" placeholder="Re-Password *" />
				</div>
				<div className="auth_gender">
					<label>Giới tính</label>
					<div className="auth_radio">
						<input defaultChecked id="nam" type="radio" name="gender" />
						<label ref={namRef} htmlFor="nam">
							Nam
						</label>
					</div>
					<div className="auth_radio">
						<input id="nu" type="radio" name="gender" />
						<label ref={nuRef} htmlFor="nu">
							Nữ
						</label>
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
					<button onClick={handleRegister}>Đăng ký</button>
				</div>
				<div className="auth_line"></div>
			</div>
		</div>
	);
};

export default Register;
