import { useState } from "react";
import { Link } from "react-router-dom"
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";

const Auth = ({ type = "Login", onSubmit }) => {

    const [data, setData] = useState({ authType: "user" });
    const [eye, setEye] = useState(false);
    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
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
                <form onSubmit={(e) => onSubmit(e, data)}>
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
                                <input type="text" className="form-control" id="floatingName" placeholder="Sample user" name="full-name" onChange={handleOnChange} />
                                <label htmlFor="floatingName">Name</label>
                            </div>
                        )}
                        {type === "Register" && (
                            <div className="form-floating col-md-6">
                                <input type="number" className="form-control" id="floatingPhone" placeholder="+91 XXXXX XXXXX" name="phone" onChange={handleOnChange} />
                                <label htmlFor="floatingPhone">Phone</label>
                            </div>
                        )}
                        <div className={`form-floating ${type === "Register" ? "col-md-6" : 'col-12'}`}>
                            <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" name="email" onChange={handleOnChange} />
                            <label htmlFor="floatingEmail">Email Address</label>
                        </div>
                        <div className={`position-relative d-flex align-items-center justify-content-end form-floating ${type === "Register" ? "col-md-6" : 'col-12'}`}>
                            <input type={eye === true ? "text" : "password"} className="form-control" id="floatingPassword" placeholder="Password" name="password" onChange={handleOnChange} />
                            <label htmlFor="floatingPassword"> Password </label>
                            <div className="position-absolute px-2 m-1 bg-white text-secondary opacity-50" onClick={() => setEye(!eye)}>
                                {eye ? <RiEyeFill /> : <RiEyeCloseFill />}
                            </div>
                        </div>
                        {type === "Register" && (
                            <div className="form-floating">
                                <textarea className="form-control" placeholder="Address" id="floatingAddress" name="address" onChange={handleOnChange}></textarea>
                                <label htmlFor="floatingAddress">Address</label>
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
                            <button type="submit" className="btn btn-success w-100 mb-3">
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