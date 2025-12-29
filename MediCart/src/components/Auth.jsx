import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";

const Auth = ({ type = "Login", onSubmit }) => {

    const [data, setData] = useState({ authType: "user", email: "", password: "", "full-name": "", phone: "", address: "" });
    const [eye, setEye] = useState(false);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    // Validation functions
    const validateEmail = (email) => {
        const regex = /^\S+@\S+\.\S+$/;
        return regex.test(email) ? "" : "Invalid email address";
    };

    const validatePassword = (password, isRegister = false) => {
        if (!password) return "Password is required";
        if (password.length < 8) return "Password must be at least 8 characters";
        if (isRegister) {
            const strongRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])/;
            if (!strongRegex.test(password)) {
                return "Password must include uppercase, lowercase, number and special character";
            }
        }
        return "";
    };

    const validateName = (name) => {
        if (!name || name.trim() === "") return "Name is required";
        if (name.trim().length < 2) return "Name must be at least 2 characters";
        return "";
    };

    const validatePhone = (phone) => {
        if (!phone) return "Phone number is required";
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone.toString())) return "Phone must be 10 digits";
        return "";
    };

    const validateAddress = (address) => {
        if (!address || address.trim() === "") return "Address is required";
        if (address.trim().length < 5) return "Address must be at least 5 characters";
        return "";
    };

    // Validate form on data change
    useEffect(() => {
        const newErrors = {};

        // Email validation (required for both login & register)
        const emailErr = validateEmail(data.email);
        if (emailErr) newErrors.email = emailErr;

        // Password validation (required for both login & register)
        const passwordErr = validatePassword(data.password, type === "Register");
        if (passwordErr) newErrors.password = passwordErr;

        // Registration-specific validations
        if (type === "Register") {
            const nameErr = validateName(data["full-name"]);
            if (nameErr) newErrors["full-name"] = nameErr;

            const phoneErr = validatePhone(data.phone);
            if (phoneErr) newErrors.phone = phoneErr;

            const addressErr = validateAddress(data.address);
            if (addressErr) newErrors.address = addressErr;
        }

        setErrors(newErrors);

        // Check if form is valid (no errors and required fields filled)
        const isValid = Object.keys(newErrors).length === 0 && data.email && data.password && (type === "Login" || (data["full-name"] && data.phone && data.address));
        setIsFormValid(isValid);
    }, [data, type]);

    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            onSubmit(e, data);
        }
    }

    return (
        <div className="row px-md-0 px-3 d-flex justify-content-center align-items-center h-100">
            <div className="col-md-5 col-lg-6 col-xl-5">
                <img
                    src="/auth_bg.svg"
                    className="img-fluid"
                    alt="Sample image"
                />
            </div>
            <div className={`col-md-7 col-lg-6 ${type === "Register" ? "col-xl-6" : "col-xl-4"} offset-xl-1`}>
                <div className="mb-4">
                    <span className="fs-2 fw-bold text-success">{type.toUpperCase()}</span>
                    <h4> {type === "Login" ? "Welcome Back!" : "Create an Account"} </h4>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        {type === "Login" && (
                            <div className="d-flex gap-4 align-items-center">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="authType" id="userLogin" defaultChecked onChange={(e) => setData((prev) => ({ ...prev, authType: "user" }))} />
                                    <label className="form-check-label" htmlFor="userLogin">
                                        User Login
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="authType" id="adminLogin" onChange={(e) => setData((prev) => ({ ...prev, authType: "admin" }))} />
                                    <label className="form-check-label" htmlFor="adminLogin">
                                        Admin Login
                                    </label>
                                </div>
                            </div>
                        )}
                        {type === "Register" && (
                            <div className="form-floating col-md-6">
                                <input
                                    type="text"
                                    className={`form-control ${errors["full-name"] ? "is-invalid" : ""}`}
                                    id="floatingName"
                                    placeholder="Sample user"
                                    name="full-name"
                                    value={data["full-name"]}
                                    onChange={handleOnChange}
                                />
                                <label htmlFor="floatingName">Name</label>
                                {errors["full-name"] && <div className="invalid-feedback d-block">{errors["full-name"]}</div>}
                            </div>
                        )}
                        {type === "Register" && (
                            <div className="form-floating col-md-6">
                                <input
                                    type="number"
                                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                    id="floatingPhone"
                                    placeholder="+91 XXXXX XXXXX"
                                    name="phone"
                                    value={data.phone}
                                    onChange={handleOnChange}
                                />
                                <label htmlFor="floatingPhone">Phone</label>
                                {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
                            </div>
                        )}
                        <div className={`form-floating ${type === "Register" ? "col-md-6" : 'col-12'}`}>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                id="floatingEmail"
                                placeholder="name@example.com"
                                name="email"
                                value={data.email}
                                onChange={handleOnChange}
                            />
                            <label htmlFor="floatingEmail">Email Address</label>
                            {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                        </div>
                        <div className={`${type === "Register" ? "col-md-6" : 'col-12'}`}>
                            <div className="d-flex align-items-center justify-content-end form-floating position-relative">
                                <input
                                    type={eye === true ? "text" : "password"}
                                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                    id="floatingPassword"
                                    placeholder="Password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleOnChange}
                                />
                                <label htmlFor="floatingPassword"> Password </label>
                                <div className="position-absolute px-2 m-1 bg-white text-secondary opacity-50" onClick={() => setEye(!eye)} style={{ cursor: "pointer" }}>
                                    {eye ? <RiEyeFill /> : <RiEyeCloseFill />}
                                </div>
                            </div>
                            {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                        </div>
                        {type === "Register" && (
                            <div className="form-floating col-12">
                                <textarea
                                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                                    placeholder="Address"
                                    id="floatingAddress"
                                    name="address"
                                    value={data.address}
                                    onChange={handleOnChange}
                                ></textarea>
                                <label htmlFor="floatingAddress">Address</label>
                                {errors.address && <div className="invalid-feedback d-block">{errors.address}</div>}
                            </div>
                        )}
                        {type === "Register" && (
                            <div className="d-flex">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="checkChecked" defaultChecked />
                                    <label className="form-check-label fs-sm" htmlFor="checkChecked"> I agree with terms & Conditions </label>
                                </div>
                            </div>
                        )}
                        {type === "Login" && (
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="checkChecked" defaultChecked />
                                    <label className="form-check-label fs-sm" htmlFor="checkChecked"> Remember Me </label>
                                </div>
                                <Link to="/forgot-password" className="fs-sm">Forgot Password?</Link>
                            </div>
                        )}
                        <div>
                            <button type="submit" className="btn btn-success w-100 mb-3" disabled={!isFormValid}>
                                {type}
                            </button>
                        </div>
                    </div>
                </form>

                <div className="mt-3">
                    <p className="fs-sm text-center">
                        {type === "Login" ? "Don't have an account?" : "Already have an account?"}
                        <Link to={type === "Login" ? "/register" : "/login"} className="ms-1 text-success">
                            {type === "Login" ? "Register" : "Login"}
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Auth