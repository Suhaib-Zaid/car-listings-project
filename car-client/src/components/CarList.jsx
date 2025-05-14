import React, { useEffect, useState } from "react";

const CarList = () => {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const res = await fetch("http://localhost:3000/cars");
      const data = await res.json();
      setCars(data);
    } catch (err) {
      console.error("Failed to fetch cars:", err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">All Cars</h2>
      <ul className="space-y-4">
        {cars.map((car) => (
          <li key={car.id} className="p-4 bg-white shadow rounded">
            <strong>{car.make} {car.model}</strong> ({car.year})<br />
            Price: ${car.price} | Mileage: {car.mileage} km | Color: {car.color}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
