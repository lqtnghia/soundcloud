"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box, Button, Divider } from "@mui/material";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const NextArrow = (props: any) => {
  return (
    <Button
      variant="outlined"
      onClick={props.onClick}
      sx={{
        position: "absolute",
        right: 0,
        top: "43%",
        zIndex: 2,
        minWidth: 30,
        width: 35
      }}
    >
      <ChevronRight />
    </Button>
  );
};

const PrevArrow = (props: any) => {
  return (
    <Button
      variant="outlined"
      onClick={props.onClick}
      sx={{
        position: "absolute",
        top: "43%",
        zIndex: 2,
        minWidth: 30,
        width: 35
      }}
    >
      <ChevronLeft />
    </Button>
  );
};

const MainSlider = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };
  return (
    <Box
      sx={{
        margin: "0 50px",
        ".item": { padding: "0 10px" },
        h3: {
          border: "1px solid #ccc",
          padding: "20px",
          height: "200px"
        }
      }}
    >
      <h2>Multiple tracks</h2>
      <Slider {...settings}>
        <div className="item">
          <h3>Track 1</h3>
        </div>
        <div className="item">
          <h3>Track 2</h3>
        </div>
        <div className="item">
          <h3>Track 3</h3>
        </div>
        <div className="item">
          <h3>Track 4</h3>
        </div>
        <div className="item">
          <h3>Track 5</h3>
        </div>
        <div className="item">
          <h3>Track 6</h3>
        </div>
        <div className="item">
          <h3>Track 7</h3>
        </div>
        <div className="item">
          <h3>Track 8</h3>
        </div>
        <div className="item">
          <h3>Track 9</h3>
        </div>
      </Slider>
      <Divider />
    </Box>
  );
};

export default MainSlider;
