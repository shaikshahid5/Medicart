export default function AddNewPatientModal({ onBack, onSave }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [doctor, setDoctor] = useState("");

  const handleSave = () => {
    onSave({
      name,
      age,
      gender,
      doctor,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-lg font-semibold mb-4">Add Patient</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2 w-full px-3 py-2 border rounded"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="mb-2 w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="mb-2 w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Doctor"
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          className="mb-2 w-full px-3 py-2 border rounded"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onBack} className="px-4 py-2 border rounded">
            Back
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
