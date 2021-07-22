import React, { useState, useRef } from "react";
import PhotoGrid from "react-photo-feed";
import { useGesture, usePinch } from "react-use-gesture";
import Contents from "./Contents";
// import QuickPinchZoom from "react-quick-pinch-zoom";
// import Hammer from "react-hammerjs";
import "./Image.Grid.css";
import playButton from "./assets/playButton.png";
import "react-photo-feed/library/style.css";

import golf from "./assets/golf.jpg";
import sampleVideo from "./assets/sample_video.mp4";
import shot from "./assets/shot.png";

function ImageGrid() {
    const [cardWidthIndex, setCardWidthIndex] = useState(2);
    const [pinchAble, setPinchAble] = useState(true);
    // const [scrollAble, setScrollAble] = useState(true);
    const [pinchFlag, setPinchFlag] = useState({
        pinchInFlag: false,
        pinchOutFlag: false,
    });
    const { pinchInFlag, pinchOutFlag } = pinchFlag;
    const [distance, setDistance] = useState(0);
    const cardWidthArray = [1, 2, 3, 4, 6];
    let pointerCache = [];
    let prevDistance = -1,
        pinchOutStartDistance = -1,
        pinchInStartDistance = -1;
    let pinchChangeFlag = false;

    const calDistance = (prev, cur) => {
        const distanceX =
            Math.abs(prev.clientX - cur.clientX) *
            Math.abs(prev.clientX - cur.clientX);
        const distanceY =
            Math.abs(prev.clientY - cur.clientY) *
            Math.abs(prev.clientY - cur.clientY);
        return Math.sqrt(distanceX + distanceY);
    };

    const handlePinchIn = () => {
        if (!pinchInFlag && cardWidthIndex < 4) {
            setPinchFlag({
                pinchInFlag: true,
                pinchOutFlag: false,
            });
            pinchChangeFlag = false;
            setCardWidthIndex(cardWidthIndex + 1);
        }
    };

    const handlePinchOut = () => {
        if (!pinchOutFlag && cardWidthIndex > 0) {
            setPinchFlag({
                pinchInFlag: false,
                pinchOutFlag: true,
            });
            pinchChangeFlag = false;
            setCardWidthIndex(cardWidthIndex - 1);
        }
    };

    const removeEvent = (e) => {
        const index = pointerCache.findIndex(
            (cache) => cache.pointerId === e.pointerId,
        );
        pointerCache.splice(index, 1);
    };

    const changeOptionsPinch = (able) => {
        setPinchAble(able);
    };

    const handlePointerDown = (e) => {
        pointerCache.push(e);
        // pointerCache가 1개일때는 div touch-action: none 아님,
        // none 부분을 state값으로 주기
        // if (pointerCache.length >= 2) {
        //     setPinchAble(true);
        // }
    };

    const handlePointerMove = (e) => {
        const index = pointerCache.findIndex(
            (cache) => cache.pointerId === e.pointerId,
        );
        pointerCache[index] = e;
        if (pointerCache.length === 2) {
            const curDistance = calDistance(pointerCache[0], pointerCache[1]);
            // changeOptionsPinch(true);
            // setDistance(curDistance);
            if (prevDistance === -1) {
                pinchOutStartDistance = curDistance;
                pinchInStartDistance = curDistance;
            } else {
                if (!pinchChangeFlag) {
                    if (pinchOutFlag && curDistance < prevDistance) {
                        pinchInStartDistance = prevDistance;
                        pinchChangeFlag = true;
                    }
                    if (pinchInFlag && curDistance > prevDistance) {
                        pinchOutStartDistance = prevDistance;
                        pinchChangeFlag = true;
                    }
                }
                if (curDistance > pinchOutStartDistance + 1) {
                    handlePinchOut();
                }
                if (curDistance < pinchInStartDistance - 1) {
                    handlePinchIn();
                }
            }
            prevDistance = curDistance;
        }
    };

    const handlePointerUp = (e) => {
        removeEvent(e);
        if (pointerCache.length < 2) {
            prevDistance = -1;
            pinchOutStartDistance = -1;
            pinchInStartDistance = -1;
            setPinchFlag({
                pinchInFlag: false,
                pinchOutFlag: false,
            });
            pinchChangeFlag = false;
            // changeOptionsPinch(false);
        }
    };

    return (
        <>
            <div>
                version 2, {pinchAble ? 1 : 0}, pinchInFlag:
                {pinchInFlag ? 1 : 0}, pinchOutFlag: {pinchOutFlag ? 1 : 0},
                distance: {distance}
            </div>
            <div
                className="touch-area"
                // ref={touchTarget}
                onPointerDown={pinchAble && handlePointerDown}
                onPointerMove={pinchAble && handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onPointerOut={handlePointerUp}
                onPointerLeave={handlePointerUp}
                // style={{ touchAction: pinchAble ? "none" : "auto" }}
                style={{ touchAction: "none" }}
            >
                <PhotoGrid
                    pinchInFlag={pinchInFlag}
                    pinchOutFlag={pinchOutFlag}
                    columns={cardWidthArray[cardWidthIndex]}
                    photos={Contents}
                    playButton={playButton}
                    changeOptionsPinch={changeOptionsPinch}
                />
            </div>
        </>
    );
}

export default ImageGrid;
