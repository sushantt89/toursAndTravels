import React, { useContext, useState } from "react";
import "./booking.css";
import TopLoadingBar from "../../shared/TopLoadingBar";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tourDetails, avgRating }) => {
  const { user } = useContext(AuthContext);
  const { price, reviews } = tourDetails;
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    userId: user && user._id, //later it will be dynamic
    userEmail: user && user.email,
    fullName: "",
    phone: "",
    guestSize: "",
    bookAt: "",
  });

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 2500;
  const totalAmount =
    Number(price) * Number(booking.guestSize) + Number(serviceFee);

  //send data to the server
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (!user || user === null || user === undefined) {
        return alert("please log in");
      }
      const res = await fetch(`${BASE_URL}/booking`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(booking),
      });
      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      navigate("/thank-you");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="booking">
      <TopLoadingBar />
      <div className="booking_top d-flex align-items-center justify-content-between">
        <h3>
          Rs. {price} <span>/ person</span>
        </h3>
        <span className="tour_rating d-flex align-items-center">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>
      {/*============== booking form start ================*/}
      <div className="booking_form">
        <h5>Information</h5>
        <Form className="booking_info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
       
      
      {/*============== booking form end ================*/}
      {/*============== booking bottom  ================*/}
      <div className="booking_bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              Rs. {price} <i className="ri-close-line"></i> 1 person{" "}
            </h5>
            <span>Rs. {price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 service">
            <h5>Service charge </h5>
            <span>Rs. {serviceFee}</span>
          </ListGroupItem>
          <hr />
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>Rs. {totalAmount} </span>
          </ListGroupItem>
        </ListGroup>
      </div>
      <Button className="btn primary_btn w-100 mt-4" type="submit">
            Book Now
          </Button>
      </Form>
      </div>
    </div>
  );
};

export default Booking;
