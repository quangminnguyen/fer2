import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.css";
const Register = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const rePasswordRef = useRef();
	const namRef = useRef();

	const navigate = useNavigate();
	const [msg, setMsg] = useState({});

	const handleRegister = () => {
		const user = {
			email: emailRef.current.value,
			password: passwordRef.current.value,
			username: rePasswordRef.current.value,
			gender: namRef.current.checked ? "Nam" : "Nữ",
		};
		let ms = {};
		let check = false;
		if (!user.email) {
			ms.email = true;
			check = true;
		}
		if (!user.password) {
			check = true;
			ms.password = 1;
		}

		setMsg({ ...ms });
		if (check) {
			return;
		}
		const accounts = JSON.parse(localStorage.getItem("accounts"));
		localStorage.removeItem("accounts");
		const newUser = {
			...user,
			role: "user",
			id: accounts ? accounts[accounts?.length - 1]?.id * 1 + 1 : 1,
		};
		const some = accounts?.some((item) => item?.email == newUser?.email);
		if (some) {
			localStorage.setItem("accounts", JSON.stringify(accounts));
			return setMsg({
				exist: true,
			});
		}
		accounts.push(newUser);
		localStorage.setItem("accounts", JSON.stringify(accounts));
		toast.success("Đăng ký thành công.", {
			autoClose: 2000,
		});
		navigate("/login");
	};
	return (
		<div className="auth">
			<div className="auth_wrap">
				<div className="auth_title">Đăng ký tài khoản</div>
				<div className="auth_input">
					<input ref={emailRef} type="text" placeholder="Email *" />
				</div>
				{msg?.email && (
					<div className="auth_fix">Email không được để trống</div>
				)}
				<div className="auth_input">
					<input ref={passwordRef} type="text" placeholder="Password *" />
				</div>
				{msg?.password && (
					<div className="auth_fix">Mật khẩu không được để trống</div>
				)}
				<div className="auth_input">
					<input ref={rePasswordRef} type="text" placeholder="FullName" />
				</div>
				{msg?.repassword && (
					<div className="auth_fix">Fullname không được để trống</div>
				)}
				<div className="auth_gender">
					<label>Giới tính</label>
					<div className="auth_radio">
						<input
							ref={namRef}
							defaultChecked
							id="nam"
							type="radio"
							name="gender"
						/>
						<label htmlFor="nam">Nam</label>
					</div>
					<div className="auth_radio">
						<input id="nu" type="radio" name="gender" />
						<label htmlFor="nu">Nữ</label>
					</div>
				</div>
				{msg?.exist && (
					<div className="auth_fix">
						Email này đã tồn tại. Vui lòng lựa chọn email khác.
					</div>
				)}
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
