import React, { useState } from "react";

const AddCarForm = () => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    color: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/cars", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      });
      alert("Car added!");
      setFormData({ make: "", model: "", year: "", price: "", mileage: "", color: "" });
    } catch (err) {
      alert("Error adding car.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded max-w-xl mx-auto">
      <h2 className="text-lg font-medium">Add New Car</h2>
      {["make", "model", "year", "price", "mileage", "color"].map(field => (
        <input
          key={field}
          type="text"
          name={field}
          value={formData[field]}
          onChange={handleChange}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="w-full border p-2 rounded"
          required
        />
      ))}
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Add Car
      </button>
    </form>
  );
};

export default AddCarForm;
