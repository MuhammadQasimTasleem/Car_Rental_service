const API_URL = 'http://localhost:5000/api/bookings';

// Create a new booking
export const createBooking = async (bookingData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(bookingData),
  });
  return response.json();
};

// Fetch all bookings for the authenticated user
export const getAllBookings = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
  });
  console.log("Response from getAllBookings:", response);
  return response.json();
};