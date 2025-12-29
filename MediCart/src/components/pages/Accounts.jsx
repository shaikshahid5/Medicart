import React, { useState } from "react";

const Accounts = () => {
  const [eye, setEye] = useState(false);
  const [data, setData] = useState({});
  const [isChanged, setIsChanged] = useState(false);

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });

    setIsChanged(true);
  }

  const handleFormSubmit = (e) => {}

  return (
    <div className="bg-body-tertiary h-100 w-100 rounded-3 border shadow-sm p-2">
      <div className="border-bottom w-100 pb-1 mb-2">
        <span className="fs-5 fw-bold text-secondary"> Account Details </span>
      </div>

      <div className="p-2">
        <form onSubmit={handleFormSubmit}>
          <div className="row g-3">
            <div className="form-floating col-md-6">
              <input type="text" className="form-control" id="floatingName" placeholder="Sample user" name="full-name" onChange={handleOnChange} />
              <label htmlFor="floatingName">Name</label>
            </div>

            <div className="form-floating col-md-6">
              <input type="number" className="form-control" id="floatingPhone" placeholder="+91 XXXXX XXXXX" name="phone" onChange={handleOnChange} />
              <label htmlFor="floatingPhone">Phone</label>
            </div>

            <div className={`form-floating`}>
              <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" name="email" onChange={handleOnChange} />
              <label htmlFor="floatingEmail">Email Address</label>
            </div>

            <div className="form-floating">
              <textarea className="form-control" placeholder="Address" id="floatingAddress" name="address" onChange={handleOnChange}></textarea>
              <label htmlFor="floatingAddress">Address</label>
            </div>

            <div>
              <button type="submit" className="btn btn-success mb-3" disabled={!isChanged}>
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Accounts