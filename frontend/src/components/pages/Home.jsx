import React from "react";
import "../../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../../assets/images/hero-img01.jpg";
import heroImg02 from "../../assets/images/hero-img02.jpg";
import heroImg03 from "../../assets/images/gallery-06.jpg";
import worldImg from "../../assets/images/world.png";
import experienceImg from "../../assets/images/experience.png";
import Subtitle from "../../shared/Subtitle";
import SearchBar from "../../shared/SearchBar";
import ServiceList from "../../services/ServiceList";
import FeaturedTourList from "../Featured-tours/FeaturedTourList";
import MasonryImagesGallery from "../Image-gallery/MasonryImagesGallery";
import Testimonial from "../Testimonial/Testimonial";
import Newsletter from "../../shared/Newsletter";

const Home = () => {
  
  return (
    <>
      {/* ============== hero section start ============= */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero_content">
                <div className="hero_subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Know before you go"} />
                  <img src={worldImg} alt="worldImg" />
                </div>
                <h1>
                  Each journey is a chapter in the book of{" "}
                  <span className="highlight">Memories</span>
                </h1>
                <p>
                  Travel isn't just about reaching a place; it's about
                  discovering ourselves amidst the world's beauty. From tranquil
                  beaches to towering mountains, each journey is a story waiting
                  to be told. Let's wander, not just to escape, but to find
                  ourselves in this extraordinary world
                </p>
              </div>
            </Col>
            <Col lg="2">
              <div className="hero_img-box ">
                <img src={heroImg} alt="heroImg" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero_img-box mt-4">
              <img src={heroImg03} alt="heroImg03" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero_img-box mt-5">
                <img src={heroImg02} alt="heroImg02" />
              </div>
            </Col>
            <SearchBar />
          </Row>
        </Container>
      </section>
      {/* ============== hero section end ============= */}
      <section>
        <Container>
          <Row>
            <div>
              {/* <Col lg='3'> */}
              <h5 className="services_subtitle">What we serve</h5>
              <h2 className="services_title">
                Transform Your Travel Dreams into Reality with Our Personalized
                Tours"
              </h2>
              {/* </Col> */}
            </div>
            <ServiceList />
          </Row>
        </Container>
      </section>
      {/* ============== featured tour section start ============= */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured_tour-title">Our Featured Tours</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/* ============== featured tour section end ============= */}
      {/* ============== experience section start ============= */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience_content">
                <Subtitle subtitle={"Experience"} />
                <h2>
                  With our all experience <br /> we will serve you
                </h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  <br /> Earum, recusandae! Aperiam cumque nostrum molestiae?
                </p>
              </div>
              <div className="counter_wrapper d-flex align-items-center gap-5">
                  <div className="counter_box">
                    <span>12k+</span>
                    <h6>Successfull Trips</h6>
                  </div>
                  <div className="counter_box">
                    <span>2k+</span>
                    <h6>Regular clients</h6>
                  </div>
                  <div className="counter_box">
                    <span>15</span>
                    <h6>Years experience</h6>
                  </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience_img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ============== experience section end ============= */}
      {/* ============== gallery section start ============= */}
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={"Gallery"}/>
              <h2 className="gallery_title">
                Visit our customers tour gallery
              </h2>
            </Col>
            <Col lg='12'>
            <MasonryImagesGallery/>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ============== gallery section end ============= */}
      {/* ============== testimonial section start ============= */}
      <section>
        <Container>

        <Row>
          <Col lg='12'>
            <Subtitle subtitle={'Fans Love'}/>
            <h2 className="testimonial_title">What our fans say about us</h2>
          </Col>
          <Col lg='12'>
            <Testimonial/>
          </Col>
        </Row>
        </Container>
      </section>
      {/* ============== testimonial section end ============= */}
      <Newsletter/>
    </>
  );
};

export default Home;
