import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../../shared/CommonSection";
import "../../styles/tour.css";
import Newsletter from "../../shared/Newsletter";
import TourCard from "../../shared/TourCard";
import SearchBar from "../../shared/SearchBar";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import Loader from "../../shared/Loader";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const { data: allTours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount, loading: countLoading, error: countError } = useFetch(`${BASE_URL}/tours/search/getToursCount`);

  useEffect(() => {
    if (tourCount !== undefined) {
      const pages = Math.ceil(tourCount / 8); // Display 8 tours per page
      setPageCount(pages);
    }
  }, [tourCount,page,allTours]);
  useEffect(() => {
    const scrollDelay = 1100;

    const timer = setTimeout(() => {
      // Scroll to 400 pixels down from the top with smooth behavior
      window.scrollTo({ top: 420, behavior: 'smooth' });
      
    }, scrollDelay);
    return () => clearTimeout(timer);
  }, [page]);
  

  return (
    <>
      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          {(loading || countLoading) && <Loader />}
          {(error || countError) && <h4>{error || countError}</h4>}
          {!loading && !error && !countLoading && !countError && (
            <Row>
              {allTours?.map((tour) => (
                <Col lg="3" className="mb-4" key={tour.id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active_page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Tours;
