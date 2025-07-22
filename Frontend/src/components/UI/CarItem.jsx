import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";

const CarItem = (props) => {
  const { imgUrl, model, carName, automatic, speed, price, _id, id } = props.item;
  const carId = _id || id;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img
            src={imgUrl}
            alt={model}
            className="w-100"
          />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{carName}</h4>
          <h6 className="rent__price text-center mt-">
            ${price}.00 <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {model}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i> {automatic}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line"></i> {speed}
            </span>
          </div>
          <Link to={`/cars/${carId}`}>
            <button className=" w-50  car__item-btn car__btn-rent">Rent</button>
          </Link>
          <Link to={`/cars/${carId}`}>
            <button className=" w-50 car__item-btn car__btn-details">
              Details
            </button>
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;