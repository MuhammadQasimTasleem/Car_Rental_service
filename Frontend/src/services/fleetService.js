const API_URL = 'http://localhost:5000/api/fleet';

// Fetch all vehicles
export const getAllVehicles = async () => {
  console.log("Fleet GET API URL:", API_URL);
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  // console.log("Fleet GET API response:", response);
  return response.json();
};


export const getVehicleById = async (id) => {
  const url = `${API_URL}/${id}`;
  console.log("Fleet GET BY ID API URL:", url);
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  console.log("Fleet GET BY ID API response:", response);
  return response.json();
};



// Add a new vehicle
export const addVehicle = async (vehicleData) => {
  console.log("Fleet POST API URL:", API_URL);
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vehicleData),
  });
  return response.json();
};