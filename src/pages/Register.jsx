import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const Register = () => (
  <section className="auth-section">
    <Container>
      <Row className="justify-content-center">
        <Col lg="5" md="7" sm="10">
          <h2 className="mb-4 text-center">Register</h2>
          <form>
            <input type="text" placeholder="Name" className="form-control mb-3" required />
            <input type="email" placeholder="Email" className="form-control mb-3" required />
            <input type="password" placeholder="Password" className="form-control mb-3" required />
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Register;