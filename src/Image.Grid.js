import React, { useState, useEffect } from "react";
import PhotoGrid from "react-photo-feed";
import Hammer from "react-hammerjs";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "./Image.Grid.css";
import golf from "./assets/golf.jpg";
import sample from "./assets/sample.mp4";
import "react-photo-feed/library/style.css";

function ImageGrid() {
    const [cardWidthIndex, setCardWidthIndex] = useState(2);
    const [pinchFlag, setPinchFlag] = useState({
        pinchInFlag: false,
        pinchOutFlag: false,
    });
    const { pinchInFlag, pinchOutFlag } = pinchFlag;
    const cardWidthArray = [1, 2, 3, 5];

    const handlePinchIn = () => {
        if (!pinchInFlag && cardWidthIndex < 3) {
            setPinchFlag({ pinchInFlag: true, pinchOutFlag: false });
            setCardWidthIndex(cardWidthIndex + 1);
        }
    };

    const handlePinchOut = () => {
        if (!pinchOutFlag && cardWidthIndex > 0) {
            setPinchFlag({ pinchInFlag: false, pinchOutFlag: true });
            setCardWidthIndex(cardWidthIndex - 1);
        }
    };

    const handlePinchEnd = () => {
        setPinchFlag({ pinchInFlag: false, pinchOutFlag: false });
    };

    const contents = [
        {
            id: 1,
            src: golf,
            bigSrc: golf,
        },
        {
            id: 1,
            src: golf,
            bigSrc: golf,
        },
        {
            id: 1,
            src: golf,
            bigSrc: golf,
        },
        {
            id: 1,
            src: golf,
            bigSrc: golf,
        },
        {
            id: 1,
            src: golf,
            bigSrc: golf,
        },
        {
            id: 1,
            src: golf,
            bigSrc: golf,
        },
        {
            id: 1,
            src: golf,
            bigSrc: golf,
        },
        {
            id: 1,
            src: golf,
            bigSrc: golf,
        },
        {
            id: 1,
            src: golf,
            bigSrc: golf,
        },
        {
            id: 1,
            src: golf,
            bigSrc: golf,
        },
        {
            id: 1,
            src: golf,
            bigSrc: golf,
        },
        {
            id: 1,
            src: golf,
            bigSrc: golf,
        },
        {
            id: 1,
            src: golf,
            bigSrc: golf,
        },
        {
            id: 1,
            src: golf,
            bigSrc: golf,
        },
    ];

    return (
        <Hammer
            onPinchIn={handlePinchIn}
            onPinchOut={handlePinchOut}
            onPinchEnd={handlePinchEnd}
            options={{
                recognizers: {
                    pinch: { enable: true },
                },
            }}
        >
            {/* <div>{cardWidthIndex}</div> */}
            <div className="touch-area">
                version 17, {pinchInFlag ? 1 : 0}, {pinchOutFlag ? 1 : 0},{" "}
                {cardWidthIndex}
                <PhotoGrid
                    columns={cardWidthArray[cardWidthIndex]}
                    photos={contents}
                />
            </div>
        </Hammer>
    );
}

export default ImageGrid;
