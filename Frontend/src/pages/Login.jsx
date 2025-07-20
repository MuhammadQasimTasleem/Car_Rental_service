import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/user-service";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  try {
    const res = await loginUser(form);
    if (res.success && res.token) {
      localStorage.setItem("token", res.token); // Store token
      navigate("/home");
    } else {
      setError(res.message || "Login failed");
    }
  } catch (err) {
    setError("Login failed");
  }
  setLoading(false);
};

  return (
    <section className="auth-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg="5" md="7" sm="10">
            <h2 className="mb-4 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
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
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            <p className="mt-3 text-center">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;