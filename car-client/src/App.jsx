import React from "react";
import CarList from "./components/CarList";
import AddCarForm from "./components/AddCarForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">🚗 Car Listings</h1>
      <AddCarForm />
      <CarList />
    </div>
  );
}

export default App;
