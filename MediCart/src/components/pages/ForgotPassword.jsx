import React from "react";
import { IoCaretBackCircle } from "react-icons/io5";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="container my-auto mx-auto pb-md-0 pb-5">
      <div className="row justify-content-center align-items-center px-md-0 px-3">
        <div className="col-xl-5 col-md-6 col-12">
          <img src="/forgot-password.svg" className="img-fluid" alt="Forgot Password" />
        </div>
        <div className="col-xl-5 col-md-6 col-12 offset-xl-1 mt-md-0 mt-4">
          <div className="row g-4 px-3 py-4 rounded bg-body-tertiary border shadow-sm">
            <div>
              <h3 className="text-center fw-semibold text-success">Forgot Password</h3>
              <p className="text-center mb-0 fs-sm">Enter your email address to reset your password.</p>
            </div>
            <form>
              <div className="row g-3">
                <div className="form-floating col-12">
                  <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" />
                  <label htmlFor="floatingEmail">Email Address</label>
                </div>
                <div>
                  <button type="submit" className="btn btn-success w-100 mb-3">
                    Generate Link
                  </button>
                </div>
              </div>
            </form>
            <div>
              <Link to={"/login"} className="fs-sm d-flex align-items-center justify-content-center gap-1"> <IoCaretBackCircle /> Back to Login </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;