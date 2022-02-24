import React, { useState } from "react";
import "./ProductDetails.css";
import similar1 from "../Image/download.png";
import similar2 from "../Image/images (1).jpeg";
import similar3 from "../Image/images (2).jpeg";
import similar4 from "../Image/images (3).jpeg";
import similar5 from "../Image/24mh_monitor_4.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faChevronUp,
  faChevronDown,
  faMapMarkerAlt,
  faLock,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const AddToCart = () => {
  const showMore = (e) => {
    e.preventDefault();
    const aboutItem = document.querySelector(".productInformation p");
    aboutItem.style.maxHeight = "unset";
    e.target.style.display = "none";
    document.querySelector(".showLess").style.display = "block";
  };
  const showLess = (e) => {
    e.preventDefault();
    const aboutItem = document.querySelector(".productInformation p");
    aboutItem.style.maxHeight = "350px";
    e.target.style.display = "none";
    document.querySelector(".showMore").style.display = "block";
  };
  window.addEventListener("scroll", () => {
    const addtoCartMainHeight =
      document.querySelector(".addToCartMain").clientHeight - 450;

    const scrollToTop = document.body.getBoundingClientRect().top;
    const scrollToTopPosative = Math.abs(scrollToTop);
    if (100 > scrollToTopPosative) {
      document
        .querySelector(".productImgFixed")
        .classList.remove("productImagesFixed");
      document
        .querySelector(".productImgFixed")
        .classList.remove("productImagesNormal");
      document
        .querySelector(".deliveryStatusFix")
        .classList.remove("addDeliveryFix");
      document
        .querySelector(".deliveryStatusFix")
        .classList.remove("deliveryNormal");
    }
    if (100 <= scrollToTopPosative) {
      document
        .querySelector(".productImgFixed")
        .classList.add("productImagesFixed");
      document
        .querySelector(".deliveryStatusFix")
        .classList.add("addDeliveryFix");
    }

    if (addtoCartMainHeight < scrollToTopPosative) {
      document
        .querySelector(".productImgFixed")
        .classList.remove("productImagesFixed");
      document
        .querySelector(".productImgFixed")
        .classList.add("productImagesNormal");
      document
        .querySelector(".deliveryStatusFix")
        .classList.remove("addDeliveryFix");
      document
        .querySelector(".deliveryStatusFix")
        .classList.add("deliveryNormal");
    }
    if (addtoCartMainHeight == scrollToTopPosative) {
      document
        .querySelector(".productImgFixed")
        .classList.add("productImagesFixed");
      document
        .querySelector(".productImgFixed")
        .classList.remove("productImagesNormal");
      document
        .querySelector(".deliveryStatusFix")
        .classList.add("addDeliveryFix");
      document
        .querySelector(".deliveryStatusFix")
        .classList.remove("deliveryNormal");
    }
  });

  const imageMagnifier = () => {
    const mainImg = document.querySelector(".mainProductImg img");
    const createDiv = document.createElement("div");

    createDiv.setAttribute("class", "magnifier");
    mainImg.parentElement.insertBefore(createDiv, mainImg);

    document.querySelector(".zoomImg").classList.add("addZoomStyle");
    const magnifier = document.querySelector(".magnifier");
    document.querySelector(".magnifier").classList.add("magnifierFirst");

    const zoomSizeWidth = mainImg.offsetWidth / magnifier.offsetWidth;
    const zoomSizeHeight = mainImg.offsetHeight / magnifier.offsetHeight;

    const getZoomDiv = document.querySelector(".addZoomStyle");
    getZoomDiv.style.backgroundImage = "url('" + mainImg.src + "')";
    getZoomDiv.style.backgroundRepeat = "no-repeat";
    getZoomDiv.style.backgroundSize =
      mainImg.width * zoomSizeWidth +
      "px " +
      mainImg.height * zoomSizeHeight +
      "px";

    const cursor = (f) => {
      const getGapFromTop = document
        .querySelector(".mainProductImg img")
        .getBoundingClientRect();
      let x = f.pageX - getGapFromTop.left;
      let y = f.pageY - getGapFromTop.top;

      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    };

    const move = (e) => {
      e.preventDefault();

      var e = e || window.event;

      var get = cursor(e);

      var x = get.x - magnifier.offsetWidth / 2;
      var y = get.y - magnifier.offsetHeight / 2;

      if (x > mainImg.width - magnifier.offsetWidth) {
        x = mainImg.width - magnifier.offsetWidth;
      }
      if (x < 0) {
        x = 0;
      }
      if (y > mainImg.height - magnifier.offsetHeight) {
        y = mainImg.height - magnifier.offsetHeight;
      }
      if (y < 0) {
        y = 0;
      }

      magnifier.style.left = x + 100 + "px";
      magnifier.style.top = y + 100 + "px";

      getZoomDiv.style.backgroundPosition =
        "-" + x * zoomSizeWidth + "px -" + y * zoomSizeHeight + "px";
    };

    document.querySelector(".magnifier").addEventListener("mousemove", move);
    mainImg.addEventListener("mousemove", move);
    document.querySelector(".magnifier").addEventListener("touchmove", move);
    mainImg.addEventListener("touchmove", move);
  };

  const removeMagnifier = () => {
    document.querySelector(".zoomImg").classList.remove("addZoomStyle");
    document.querySelector(".magnifier").classList.remove("magnifierFirst");
  };

  const changeMainImg = (e) => {
    const getHoverImages = document.querySelectorAll(".similar img").length;
    for (let i = 0; i < getHoverImages; i++) {
      document.querySelectorAll(".similar img")[i].classList.remove("active");
    }

    e.target.classList.add("active");

    const mainImg = document.querySelector(".mainProductImg img");
    mainImg.src = e.target.src;
  };

  const mobileSlideLeft = (event) => {
    const imageWidth = document.querySelector(
      ".productImagesInMobile .images"
    ).clientWidth;
    document.querySelector(".productImagesInMobile").scrollLeft -= imageWidth;
  };

  const mobileSlideRight = (event) => {
    const imageWidth = document.querySelector(
      ".productImagesInMobile .images"
    ).clientWidth;
    document.querySelector(".productImagesInMobile").scrollLeft += imageWidth;
  };
  const [total, setTotal] = React.useState(0);
  const totalPrice = (e) => {
    e.preventDefault()
    const qty = parseInt(e.target.value);
    const productPrize = document.querySelector(".productPrize").innerHTML;
    const prize = productPrize.substring(1);
    const prizeInt = parseInt(prize);
    setTotal(qty * prizeInt);
  };
  React.useEffect(() => {
    const getPrice = document.querySelector('.productPrize').innerHTML
    const price = getPrice.substring(1)
    total == 0 && setTotal(parseInt(price))
  },[total])

  let items = []
  const getLocal = localStorage.getItem('item')
  getLocal ? items = JSON.parse(getLocal):
  console.log('hello')
  const addToCart = (e) => {
    e.preventDefault()
    const title = document.querySelector('.Title').innerHTML
    const qty = document.querySelector('form select').value
    const src = document.querySelector('.mainProductImg img').src
    const allItem = {title,qty,src,total}
    items.push(allItem)
    localStorage.setItem('item',JSON.stringify(items))
    window.location.replace('/orders')
  }

  
  return (
    <>
      <div className="addToCart">
        <div className="addToCartMain AddToCartInPc">
          <div className="productImages">
            <div className="productImgFixed">
              <div className="similar">
                <img
                  onMouseOver={changeMainImg}
                  className="active"
                  src={similar1}
                  alt=""
                />
                <img onMouseOver={changeMainImg} src={similar2} alt="" />
                <img onMouseOver={changeMainImg} src={similar3} alt="" />
                <img onMouseOver={changeMainImg} src={similar4} alt="" />
                <img onMouseOver={changeMainImg} src={similar5} alt="" />
              </div>
              <div onMouseLeave={removeMagnifier} className="mainProductImg">
                <img onMouseMove={imageMagnifier} src={similar1} alt="" />
              </div>
            </div>
          </div>
          <div className="productDetails">
            <div className="aboutProduct">
              <h3 className="Title" >
                HP 24mh FHD Monitor - Computer Monitor with 23.8-Inch IPS
                Display (1080p) - Built-In Speakers and VESA Mounting -
                Height/Tilt Adjustment for Ergonomic Viewing - HDMI and
                DisplayPort - (1D0J9AA#ABA)
              </h3>
            </div>
            <div className="productStatus">
              <h5 className="productPrize">$226.99</h5>
              <form action="">
                <label htmlFor="">Quality:</label>
                <select onChange={totalPrice} className="" name="" id="">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </form>
              <p>$218.45 Shipping & Import Fees Deposit to Bangladesh</p>
              <br />
              <p>
                <b>Specific Uses</b>
                <span>Multimedia, Personal, Gaming</span>
              </p>
              <p>
                <b>For Product</b>
              </p>
              <p>
                <b>Refresh Rate</b>
                <span>75 Hz</span>
              </p>
              <p>
                <b>Brand</b>
                <span>HP</span>
              </p>
              <p>
                <b>Screen Size</b>
                <span>23.8 Inches</span>
              </p>
              <p>
                <b>Screen</b>
                <span>Flat</span>
              </p>
            </div>
            <div className="productInformation">
              <h6>About this item</h6>
              <p>
                OUTSTANDING VISUALS – This FHD display with IPS technology gives
                you brilliant visuals and unforgettable quality; with a maximum
                resolution of 1920 x 1080 at 75 Hz, you’ll experience the image
                accuracy and wide-viewing spectrums of premium tablets and
                mobile devices MORE SCREEN, LESS SPACE – Enjoy more desk space
                than you thought possible with an attractive and ultra-slim
                design PANORAMIC VIEWING – Vibrant detail from practically any
                position with consistent color and image clarity maintained
                across an ultra-wide 178° horizontal and vertical viewing angles
                MICRO-EDGE DISPLAY – With virtually no bezel encircling the
                display on three sides, an ultra-wide viewing experience
                provides for seamless multi-monitor setups EASY CONNECTIVITY –
                Get the picture quality you’ve been looking for without the
                additional dongles; easily connect to your PC, gaming console,
                and peripherals for big-screen entertainment with a broad range
                of ports, including HDMI, DisplayPort, and VGA ports BUILT-IN
                SPEAKERS – Experience incredible sound and more immersive
                entertainment with two built-in 2W speakers LOW BLUE LIGHT – Put
                less strain on your eyes as a Low Blue Light mode shifts colors
                to a warmer spectrum and makes whites more natural HEIGHT
                ADJUSTMENT – Easily adjust your display to the most comfortable
                position with 100mm range of travel TILTABLE SCREEN – Adjust the
                screen to your personal preference with a 5° forward or 23°
                backward tilt WARRANTY AND SUSTAINABILITY – Rest easy and work
                confidently with an environmentally conscious and
                energy-efficient monitor, backed by HP standard 1-year limited
                warranty
              </p>
              <a className="showMore" onClick={showMore} href="">
                <FontAwesomeIcon icon={faChevronDown} />
                See more
              </a>
              <a className="showLess" onClick={showLess} href="">
                <FontAwesomeIcon icon={faChevronUp} />
                See less
              </a>
            </div>
          </div>
          <div className="deliveryFix">
            <div className="deliveryStatusFix">
              <div className="aboutDeliveryStatus">
                <h5>Total price:{total == 0 ? "$226.99" : `$${total}`}</h5>
                <p>$218.45 Shipping & Import Fees Deposit to Bangladesh</p>
                <p className="delivery">
                  Delivery <b>Friday, January 21</b>. Order within{" "}
                  <span className="deliveryTime">12 hrs 16 mins</span>
                </p>
                <h5 className="stock">Only 4 left in stock - order soon.</h5>
                <button onClick={addToCart}>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="addToCartInMobile">
          <h6>
            HP 24mh FHD Monitor - Computer Monitor with 23.8-Inch IPS Display
            (1080p) - Built-In Speakers and VESA Mounting - Height/Tilt
            Adjustment for Ergonomic Viewing - HDMI and DisplayPort -
            (1D0J9AA#ABA)
          </h6>
          <div className="productImagesInMobile">
            <div className="images">
              <img src={similar1} alt="" />
            </div>
            <div className="images">
              <img src={similar1} alt="" />
            </div>
            <div className="images">
              <img src={similar1} alt="" />
            </div>
            <div className="images">
              <img src={similar1} alt="" />
            </div>
            <div className="images">
              <img src={similar1} alt="" />
            </div>
          </div>
          <div className="similarSliderArrow">
            <div onClick={mobileSlideLeft} className="arrowMobile leftArrow">
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div onClick={mobileSlideRight} className="arrowMobile rightArrow">
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
          <h2>$229</h2>
          <form action="">
            <label htmlFor="">Quality:</label>
            <select onChange={totalPrice} className="" name="" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </form>
          <p>Total price:{total == 0 ? " $226.99" : `$${total}`}</p>
          <p>$218.45 Shipping & Import Fees Deposit to Bangladesh</p>
          <div className="productInformation">
            <h6>About this item</h6>
            <p>
              OUTSTANDING VISUALS – This FHD display with IPS technology gives
              you brilliant visuals and unforgettable quality; with a maximum
              resolution of 1920 x 1080 at 75 Hz, you’ll experience the image
              accuracy and wide-viewing spectrums of premium tablets and mobile
              devices MORE SCREEN, LESS SPACE – Enjoy more desk space than you
              thought possible with an attractive and ultra-slim design
              PANORAMIC VIEWING – Vibrant detail from practically any position
              with consistent color and image clarity maintained across an
              ultra-wide 178° horizontal and vertical viewing angles MICRO-EDGE
              DISPLAY – With virtually no bezel encircling the display on three
              sides, an ultra-wide viewing experience provides for seamless
              multi-monitor setups EASY CONNECTIVITY – Get the picture quality
              you’ve been looking for without the additional dongles; easily
              connect to your PC, gaming console, and peripherals for big-screen
              entertainment with a broad range of ports, including HDMI,
              DisplayPort, and VGA ports BUILT-IN SPEAKERS – Experience
              incredible sound and more immersive entertainment with two
              built-in 2W speakers LOW BLUE LIGHT – Put less strain on your eyes
              as a Low Blue Light mode shifts colors to a warmer spectrum and
              makes whites more natural HEIGHT ADJUSTMENT – Easily adjust your
              display to the most comfortable position with 100mm range of
              travel TILTABLE SCREEN – Adjust the screen to your personal
              preference with a 5° forward or 23° backward tilt WARRANTY AND
              SUSTAINABILITY – Rest easy and work confidently with an
              environmentally conscious and energy-efficient monitor, backed by
              HP standard 1-year limited warranty
            </p>
          </div>
          <button onClick={addToCart}>Add to Cart</button>
        </div>
        <div className="zoomImg"></div>
      </div>
    </>
  );
};

export default AddToCart;
