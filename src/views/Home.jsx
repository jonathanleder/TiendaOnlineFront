import React from 'react';
import {Carousel} from 'react-bootstrap';

import img1 from '../assets/images/paisaje.jpg';
import img2 from '../assets/images/africa.jpeg';
import img3 from '../assets/images/girasol.jpg';
import ProductSlider from "./ProductSlider.jsx";

function Home() {
    return (
        <div id='main-carousel' className='carousel'>
        <Carousel>
            <Carousel.Item>

                <img className="img-fluid d-block w-100" src={img1} alt="First slide" />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>

                <img className="img-fluid d-block w-100" src={img2} alt="Second slide" />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>

                <img className="img-fluid d-block w-100" src={img3} alt="Third slide" />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>

        <ProductSlider/>
        </div>
    );
}

export default Home;