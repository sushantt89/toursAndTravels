import React, { useContext, useState, useEffect } from "react";
import "./booking.css";
import TopLoadingBar from "../../shared/TopLoadingBar";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";
import CryptoJS from "crypto-js";

const Booking = ({ tourDetails, avgRating }) => {
  const { user } = useContext(AuthContext);
  const { price, reviews } = tourDetails;
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    fullName: "",
    phone: "",
    guestSize: "",
    bookAt: "",
  });

  const [signature, setSignature] = useState("");
  const [transactionUUID, setTransactionUUID] = useState("");
  const [totalAmount, setTotalAmount] = useState(100);

  const serviceFee = 2500;
  useEffect(() => {
    setTotalAmount(Number(price) * Number(booking.guestSize) + Number(serviceFee));
  }, [price, booking.guestSize]);

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const generateSignature = () => {
    const currentTime = new Date();
    const formattedTime = currentTime.toISOString().slice(2, 10).replace(/-/g, '') +
      '-' + currentTime.getHours() + currentTime.getMinutes() + currentTime.getSeconds();
    setTransactionUUID(formattedTime);

    const product_code = "EPAYTEST";
    const secret = "8gBm/:&EnhH.1/q";
    const hash = CryptoJS.HmacSHA256(
      `total_amount=${totalAmount},transaction_uuid=${formattedTime},product_code=${product_code}`,
      secret
    );
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    setSignature(hashInBase64);
    };

  const handlePayment = () => {
    generateSignature();
  
    const formData = {
      amount: totalAmount,
      tax_amount: 0,
      total_amount: totalAmount,
      transaction_uuid: transactionUUID,
      product_code: "EPAYTEST",
      product_service_charge: 0,
      product_delivery_charge: 0,
      success_url: "https://developer.esewa.com.np/success?ASDF=ASDF",
      failure_url: "https://developer.esewa.com.np/failure",
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature: signature,
    };
  
    console.log("Form Data:", formData);
  
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';
    form.target = '_blank';
  
    const addField = (name, value) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    };
  
    for (const key in formData) {
      addField(key, formData[key]);
    }
  
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };
  

  const handleInquiry = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        return alert("Please log in");
      }
      const res = await fetch(`${BASE_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(booking),
      });
      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      navigate("/inquiry");
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
      <div className="booking_form">
        <h5>Information</h5>
        <Form className="booking_info-form">
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
                <span>Rs. {totalAmount}</span>
              </ListGroupItem>
            </ListGroup>
          </div>
          <ListGroup>
            <div className="mt-3" style={{ textAlign: "center", width: "100%" }}>
              <Button
                className="btn primary_btn"
                type="submit"
                style={{ display: "inline-block", marginRight: "60px" }}
                onClick={handleInquiry}
              >
                Inquiry
              </Button>
              <Button
                className="btn primary_btn"
                style={{ display: "inline-block" }}
                onClick={handlePayment}
              >
                Pay Now
              </Button>
            </div>
          </ListGroup>
        </Form>
      </div>
    </div>
  );
};

export default Booking;
