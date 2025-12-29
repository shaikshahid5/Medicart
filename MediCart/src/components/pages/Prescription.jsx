import React from "react";
import { MdOutlineUploadFile } from "react-icons/md";

const Prescription = () => {
  return (
    <div className="bg-body-tertiary h-100 w-100 rounded-3 border shadow-sm p-2">
      <div className="border-bottom w-100 pb-1 mb-2">
        <span className="fs-5 fw-bold text-secondary"> Upload Prescription </span>
      </div>

      <div>
        <form>
          <div className="py-5 d-flex align-items-cener justify-content-center">
            <input type="file" name="upload-perscription" id="upload" hidden accept=".pdf" />
            <button type="button" className="btn btn-success text-white">
              <label htmlFor="upload" className="d-flex gap-1 align-items-center cursor-pointer">
                Upload Prescription &nbsp;
                <MdOutlineUploadFile className="fs-5" />
              </label>
            </button>
          </div>
        </form>
      </div>

      <div className="my-5"></div>

      <div className="border-bottom w-100 pb-1 mb-2">
        <span className="fs-5 fw-bold text-secondary"> Prescription History </span>
      </div>

      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Upload Date</th>
              <th scope="col">Prescription</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>15-12-2025</td>
              <td>View Prescription</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>16-12-2025</td>
              <td>View Prescription</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Prescription;