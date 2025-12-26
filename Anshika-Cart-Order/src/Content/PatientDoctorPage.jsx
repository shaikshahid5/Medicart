import { useState } from "react";
import AddNewPatientModal from "./AddNewPatientModal";

export default function PatientDoctorPage() {
  const [showAddPatient, setShowAddPatient] = useState(false);

  const [patient, setPatient] = useState({
    name: "Ankit",
    age: 22,
    gender: "Male",
    doctor: "Self",
  });

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-semibold mb-4">Patient Details</h2>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">{patient.name}</h3>
                <p className="text-sm text-gray-500">
                  {patient.age} years / {patient.gender} / Dr {patient.doctor}
                </p>
              </div>

              {/* EDIT BUTTON */}
              <button
                onClick={() => setShowAddPatient(true)}
                className="border border-gray-400 px-4 py-1 rounded-full text-sm text-gray-700 hover:bg-gray-100"
              >
                Edit
              </button>
            </div>
          </div>

          {/* DOCTOR DETAILS */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-semibold mb-4">Doctor Details</h2>

            <div className="flex">
              <span className="bg-gray-200 px-4 py-2 rounded-l border border-r-0 border-gray-300 text-gray-700">
                Dr
              </span>

              <input
                type="text"
                value={patient.doctor}
                onChange={(e) => setPatient({ ...patient, doctor: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ADD NEW PATIENT MODAL */}
      {showAddPatient && (
        <AddNewPatientModal
          onBack={() => setShowAddPatient(false)}
          onSave={(newPatient) => {
            setPatient(newPatient);
            setShowAddPatient(false); // close modal after save
          }}
          patient={patient} // optional: to prefill modal with existing data
        />
      )}
    </>
  );
}
