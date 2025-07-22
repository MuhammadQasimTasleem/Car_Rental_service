import React, { useState } from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import { createBooking } from "../../services/bookingService";

const BookingForm = ({vehicleId} ) => {
 
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    fromAddress: "",
    toAddress: "",
    persons: "1 person",
    luggage: "1 luggage",
    journeyDate: "",
    journeyTime: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const bookingData = { ...form, vehicleId };
      // console.log("Booking Data:", bookingData);
      const res = await createBooking(bookingData);
      // console.log("Booking Response:", res);
      if (res.success) {
        setSuccess("Booking successful!");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          fromafdress: "",
          toAddress: "",
          persons: "1 person",
          luggage: "1 luggage",
          journeyDate: "",
          journeyTime: "",
          note: "",
        });
      } else {
        setError(res.message || "Booking failed");
      }
    } catch (err) {
      setError("Booking failed");
    }
    setLoading(false);
  };

  return (
    <Form onSubmit={submitHandler}>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="number"
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          type="text"
          name="fromAddress"
          placeholder="From Address"
          value={form.fromAddress}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="text"
          name="toAddress"
          placeholder="To Address"
          value={form.toAddress}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <select name="persons" value={form.persons} onChange={handleChange}>
          <option value="1 person">1 Person</option>
          <option value="2 person">2 Person</option>
          <option value="3 person">3 Person</option>
          <option value="4 person">4 Person</option>
          <option value="5+ person">5+ Person</option>
        </select>
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <select name="luggage" value={form.luggage} onChange={handleChange}>
          <option value="1 luggage">1 luggage</option>
          <option value="2 luggage">2 luggage</option>
          <option value="3 luggage">3 luggage</option>
          <option value="4 luggage">4 luggage</option>
          <option value="5+ luggage">5+ luggage</option>
        </select>
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          type="date"
          name="journeyDate"
          placeholder="Journey Date"
          value={form.journeyDate}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="time"
          name="journeyTime"
          placeholder="Journey Time"
          className="time__picker"
          value={form.journeyTime}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <textarea
          rows={5}
          name="note"
          className="textarea"
          placeholder="Write"
          value={form.note}
          onChange={handleChange}
        ></textarea>
      </FormGroup>

      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Booking..." : "Book Now"}
      </button>
      {success && <div className="alert alert-success mt-3">{success}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </Form>
  );
};

export default BookingForm;