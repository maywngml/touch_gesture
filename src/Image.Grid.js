import React, { useState } from "react";
import PhotoGrid from "react-photo-feed";
import Hammer from "react-hammerjs";
import "./Image.Grid.css";
import golf from "./assets/golf.jpg";
import sampleVideo from "./assets/sample_video.mp4";
import shot from "./assets/shot.png";
import sampleImg from "./assets/sample_img.jpg";
import "react-photo-feed/library/style.css";

function ImageGrid() {
    const [cardWidthIndex, setCardWidthIndex] = useState(0);
    const [pinchFlag, setPinchFlag] = useState({
        pinchInFlag: false,
        pinchOutFlag: false,
    });
    const { pinchInFlag, pinchOutFlag } = pinchFlag;
    const cardWidthArray = [1, 2, 3, 4, 5];

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
            isVideo: false,
        },
        {
            id: 2,
            src: sampleVideo,
            bigSrc: sampleVideo,
            isVideo: true,
        },
        {
            id: 3,
            src: golf,
            bigSrc: golf,
            isVideo: false,
        },
        {
            id: 4,
            src: shot,
            bigSrc: shot,
            isVideo: false,
        },
        {
            id: 5,
            src: golf,
            bigSrc: golf,
            isVideo: false,
        },
        {
            id: 6,
            src: sampleVideo,
            bigSrc: sampleVideo,
            isVideo: true,
        },
        {
            id: 7,
            src: shot,
            bigSrc: shot,
            isVideo: false,
        },
        {
            id: 8,
            src: golf,
            bigSrc: golf,
            isVideo: false,
        },
        {
            id: 9,
            src: sampleVideo,
            bigSrc: sampleVideo,
            isVideo: true,
        },
        {
            id: 10,
            src: golf,
            bigSrc: golf,
            isVideo: false,
        },
        {
            id: 11,
            src: shot,
            bigSrc: shot,
            isVideo: false,
        },
        {
            id: 12,
            src: golf,
            bigSrc: golf,
            isVideo: false,
        },
        {
            id: 13,
            src: golf,
            bigSrc: golf,
            isVideo: false,
        },
        {
            id: 14,
            src: golf,
            bigSrc: golf,
            isVideo: false,
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
            <div className="touch-area">
                version 24, {pinchInFlag ? 1 : 0}, {pinchOutFlag ? 1 : 0},{" "}
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
