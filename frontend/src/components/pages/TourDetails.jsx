import React, { useState, useRef, useEffect, useContext } from "react";
import "../../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../../utils/avgRating";
import avatar from "../../assets/images/avatar.jpg";
import Booking from "../Booking/Booking";
import Newsletter from "../../shared/Newsletter";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import Loader from "../../shared/Loader";
import { AuthContext } from "../../context/AuthContext";

const TourDetails = () => {
  //check user before posting review:
  const { user } = useContext(AuthContext);

  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);

  const {
    data: tourDetails,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours/${id}`);

  const reviewObj = tourDetails.reviews;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews,
    distance,
    maxGroupSize,
  } = tourDetails;
  const { totalRating, avgRating } = calculateAvgRating(reviews);
  const options = { day: "numeric", month: "long", year: "numeric" };

  //submit request to the server
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!user || undefined || null) {
      return alert("please login!");
    }

    try {
      const reviewText = reviewMsgRef.current.value;
      const reviewObj = {
        username: user.username,
        reviewText: reviewText,
        rating: tourRating,
      };
      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:'include',
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      alert(result.message);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <section>
        <Container>
          {loading && <Loader />}
          {error && <h4>{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour_content">
                  <img src={photo} alt="" />

                  <div className="tour_info">
                    <h2>{title}</h2>

                    <div className="d-felx align-items-center gap-5">
                      <span className="tour_rating d-flex align-items-center gap-1">
                        <i
                          className="ri-star-fill"
                          style={{ color: "var(--secondary-color)" }}
                        ></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>
                    </div>
                    <div className="tour_extra-details">
                      <span>
                        <i className="ri-map-pin-user-fill"></i>
                        {address}
                      </span>
                      <span>Rs. {price} / person</span>
                      <span></span>
                      <span>
                        <i className="ri-map-pin-time-line"></i>
                        {distance} km
                      </span>
                      <span>
                        <i className="ri-group-line"></i>
                        {maxGroupSize} people
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>
                  {/* ============= tour reviews section start ============*/}
                  <div className="tour_reviews mt-4">
                    <h4>Reviews ({reviews?.length} reviews)</h4>
                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating_group">
                        <span onClick={() => setTourRating(1)}>
                          <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(2)}>
                          <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(3)}>
                          <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(4)}>
                          <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(5)}>
                          <i className="ri-star-s-fill"></i>
                        </span>
                      </div>

                      <div className="review_input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="share your thoughts..."
                          required
                        />
                        <button
                          className="btn primary_btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                    <ListGroup className="user_reviews">
                      {reviewObj?.map((review, index) => (
                        <div className="review_item" key={index}>
                          <img src={avatar} alt="" />

                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username}</h5>
                                <p>
                                  {new Date(review.createdAt).toLocaleDateString(
                                    "en-US",
                                    options
                                  )}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating} <i className="ri-star-fill"></i>
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                  {/* ============= tour reviews section end ============*/}
                </div>
              </Col>
              <Col lg="4">
                <Booking tourDetails={tourDetails} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;
