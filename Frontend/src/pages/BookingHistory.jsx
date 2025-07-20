import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { getAllBookings } from "../services/bookingService";
import "../styles/booking-history.css";
import CommonSection from "../components/UI/CommonSection";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getAllBookings();
        if (res.success) {
          setBookings(res.data);
        } else {
          setError(res.message);
        }
      } catch (err) {
        setError("Failed to fetch bookings");
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);

  console.log("Bookings:", bookings);
  if (loading) {
    return (
      <Helmet title="Loading...">
        <CommonSection title="Booking History" />
        <section>
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading...</h5>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    );
  }

  return (
    <Helmet title="Booking History">
      <CommonSection title="Booking History" />
      <section className="booking__history">
        <Container>
          <Row>
            <Col lg="12">
              {error ? (
                <div className="error__message">{error}</div>
              ) : bookings.length === 0 ? (
                <div className="no__bookings">
                  <h5>No bookings found</h5>
                  <p>You haven't made any bookings yet.</p>
                </div>
              ) : (
                bookings.map((booking) => (
                  <div key={booking._id} className="booking__item">
                    <Row>
                      <Col lg="4">
                        <img
                          src={booking.vehicle.imgUrl}
                          alt={booking.vehicle.model}
                          className="booking__car-img"
                        />
                      </Col>
                      <Col lg="8">
                        <div className="booking__info">
                          <h4 className="booking__car-title">
                            {booking.vehicle.brand} {booking.vehicle.model}
                          </h4>
                          <div className="booking__content">
                            <div className="booking__details">
                              <h6>Booking Details:</h6>
                              <p>
                                <span>From:</span> {booking.fromAddress}
                              </p>
                              <p>
                                <span>To:</span> {booking.toAddress}
                              </p>
                              <p>
                                <span>Date:</span>{" "}
                                {new Date(booking.journeyDate).toLocaleDateString()}
                              </p>
                              <p>
                                <span>Time:</span> {booking.journeyTime}
                              </p>
                            </div>
                            <div className="booking__contact">
                              <h6>Contact Information:</h6>
                              <p>
                                <span>Name:</span> {booking.firstName}{" "}
                                {booking.lastName}
                              </p>
                              <p>
                                <span>Email:</span> {booking.email}
                              </p>
                              <p>
                                <span>Phone:</span> {booking.phoneNumber}
                              </p>
                            </div>
                            <div className="booking__status">
                              <span className={`status ${booking.status}`}>
                                {booking.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                ))
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default BookingHistory;