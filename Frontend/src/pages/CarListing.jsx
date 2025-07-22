import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import { getAllVehicles } from "../services/fleetService";

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  console.log(cars)
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const data = await getAllVehicles();
        // Always expect an array for listing
        setCars(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        setCars([]);
      }
      setLoading(false);
    };
    fetchCars();
  }, []);

  const handleSort = (e) => {
    setSort(e.target.value);
    let sortedCars = [...cars];
    if (e.target.value === "low") {
      sortedCars.sort((a, b) => a.price - b.price);
    } else if (e.target.value === "high") {
      sortedCars.sort((a, b) => b.price - a.price);
    }
    setCars(sortedCars);
  };

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-3 mb-5">
                <span className="d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Sort By
                </span>
                <select value={sort} onChange={handleSort}>
                  <option value="">Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col>
            {loading ? (
              <Col lg="12">
                <div>Loading...</div>
              </Col>
            ) : cars.length === 0 ? (
              <Col lg="12">
                <div>No cars found.</div>
              </Col>
            ) : (
              cars.map((item) => <CarItem item={item} key={item._id || item.id} />)
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;