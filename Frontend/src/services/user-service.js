// Log the backend URL for debugging
console.log("REACT_APP_BACKEND_URL:", process.env.REACT_APP_BACKEND_URL);

const API_URL = 'http://localhost:5000/api/users'

export const registerUser = async (userData) => {
  console.log("Register API URL:", `${API_URL}/register`);
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const loginUser = async (userData) => {
  console.log("Login API URL:", `${API_URL}/login`);
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
};