import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./style.css";

const images = [
    "https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/4495936/pexels-photo-4495936.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2634202/pexels-photo-2634202.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/8004299/pexels-photo-8004299.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/6710897/pexels-photo-6710897.jpeg?auto=compress&cs=tinysrgb&w=600"
];

export default function Slider () {

    const [currentIndexImageUrl, setCurrentIndexImageUrl] = useState(0);
    const handleDotClick = (indexDot) => {
        setCurrentIndexImageUrl(indexDot);
    };
    const handleLeftClick = () => {
        const prev = (currentIndexImageUrl === 0)? images.length - 1: currentIndexImageUrl - 1;
        setCurrentIndexImageUrl(prev);
    };
    const handleRightClick = () => {
        const next = (currentIndexImageUrl === images.length - 1)? 0: currentIndexImageUrl + 1;
        setCurrentIndexImageUrl(next);
    };

    return <section className="section-slider">
        <h2 className="section-slider__title">Slider</h2>
        {
            images && images.length?
            <div className="container">
                <div className="slider">
                    <img className="img" src={images[currentIndexImageUrl]} alt="Image" />
                    <div className="arrows-navigation">
                        <div className="arrow left" onClick={handleLeftClick}><FaChevronLeft /></div>
                        <div className="arrow right" onClick={handleRightClick}><FaChevronRight /></div>
                    </div>
                    <div className="dots-navigation">
                        {images.map((image, i) => {
                            return <div
                                        className={`dot ${(i === currentIndexImageUrl)? "active": ""}`}
                                        key={i}
                                        onClick={() => handleDotClick(i)}>
                                            <img src={images[i]} alt="Image" />
                                    </div>;
                        })}
                    </div>
                </div>
            </div>: null
        }
    </section>;

}