import React, { useEffect, useRef, useState } from "react";
import "../style/Slider.css";

const Slider = (stock) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    { id: 1, src: "./img1.jpeg", title: "Name Slider 1", description: "Description 1" },
    { id: 2, src: "image/img2.jpg", title: "Name Slider 2", description: "Description 2" },
    { id: 3, src: "image/img3.jpg", title: "Name Slider 3", description: "Description 3" },
    { id: 4, src: "image/img4.jpg", title: "Name Slider 4", description: "Description 4" },
  ];

  const carouselRef = useRef(null);
  const listRef = useRef(null);
  const thumbnailRef = useRef(null);
  const timeRef = useRef(null);
  const nextRef = useRef(null);
  const prevRef = useRef(null);

  const timeRunning = 3000; // Time for animation
  const timeAutoNext = 4000; // Time between slides

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, timeAutoNext);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [activeIndex]);

  const handleNext = () => {
    showSlider("next");
  };

  const handlePrev = () => {
    showSlider("prev");
  };

  const showSlider = (type) => {
    const sliderItems = listRef.current.children;
    const thumbnailItems = thumbnailRef.current.children;

    if (type === "next") {
      listRef.current.appendChild(sliderItems[0]);
      thumbnailRef.current.appendChild(thumbnailItems[0]);
      carouselRef.current.classList.add("next");
    } else {
      listRef.current.prepend(sliderItems[sliderItems.length - 1]);
      thumbnailRef.current.prepend(thumbnailItems[thumbnailItems.length - 1]);
      carouselRef.current.classList.add("prev");
    }

    setTimeout(() => {
      carouselRef.current.classList.remove("next");
      carouselRef.current.classList.remove("prev");
    }, timeRunning);
  };

  return (
    <div className="carousel" ref={carouselRef}>
      <div className="list" ref={listRef}>
        {images.map((image, index) => (
          <div key={image.id} className="item">
            <img src={image.src} alt={`Slide ${image.id}`} />
            <div className="content">
              <div className="author">LUNDEV</div>
              <div className="title">DESIGN SLIDER {index}</div>
              <div className="topic">ANIMAL</div>
              <div className="des">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?
              </div>
              <div className="buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="thumbnail" ref={thumbnailRef}>
        {images.map((image) => (
          <div key={image.id} className="item">
            <img src="../pages/image/img1.jpg" alt={`Thumbnail ${image.id}`} />
            <div className="content">
              <div className="title">{image.title}</div>
              <div className="description">{image.description}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="arrows">
        <button id="prev" ref={prevRef} onClick={handlePrev}>
          &lt;
        </button>
        <button id="next" ref={nextRef} onClick={handleNext}>
          &gt;
        </button>
      </div>
      <div className="time" ref={timeRef}></div>
    </div>
  );
};

export default Slider;
