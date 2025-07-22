import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/user-service";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name || form.name.length < 2) {
      setError("Name must be at least 2 characters.");
      return false;
    }
    if (!form.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!form.password || form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!validate()) return;
    setLoading(true);
    try {
      // Log the backend URL for debugging
      console.log("Register API URL:", process.env.REACT_APP_BACKEND_URL + '/api/users/register');
      const res = await registerUser(form);
      console.log("Register API response:", res);
      if (res.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(res.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed");
    }
    setLoading(false);
  };

  return (
    <section className="auth-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg="5" md="7" sm="10">
            <h2 className="mb-4 text-center">Register</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="form-control mb-3"
                required
                value={form.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control mb-3"
                required
                value={form.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control mb-3"
                required
                value={form.password}
                onChange={handleChange}
              />
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && <div className="alert alert-success mt-3">{success}</div>}
            <p className="mt-3 text-center">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};


export default Register;