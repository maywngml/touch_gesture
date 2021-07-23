import React, { useState, useRef } from "react";
import PhotoGrid from "react-photo-feed";
import Contents from "./Contents";
import "./Image.Grid.css";
import playButton from "./assets/playButton.png";
import "react-photo-feed/library/style.css";

function ImageGrid() {
    const [isPinchAble, setIsPinchAble] = useState(true);
    const [pinchFlag, setPinchFlag] = useState({
        pinchInFlag: false,
        pinchOutFlag: false,
    });
    const { pinchInFlag, pinchOutFlag } = pinchFlag;
    const [cardWidthIndex, setCardWidthIndex] = useState(1);
    const cardWidthArray = [1, 2, 3, 4, 6];
    let pointerCache = [];
    let prevDistance = -1,
        pinchOutStartDistance = -1,
        pinchInStartDistance = -1;
    // 축소하다 확대, 확대하다 축소할 경우를 위해서 사용하는 변수
    // let pinchChangeFlag = false;
    // 아래는 지우기
    // const [location, setLocation] = useState("");
    // const [temp, setTemp] = useState(0);

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
            // pinchChangeFlag = false;
            setCardWidthIndex(cardWidthIndex + 1);
        }
    };

    const handlePinchOut = () => {
        if (!pinchOutFlag && cardWidthIndex > 0) {
            setPinchFlag({
                pinchInFlag: false,
                pinchOutFlag: true,
            });
            // pinchChangeFlag = false;
            setCardWidthIndex(cardWidthIndex - 1);
        }
    };

    const removeEvent = (e) => {
        const index = pointerCache.findIndex(
            (cache) => cache.pointerId === e.pointerId,
        );
        pointerCache.splice(index, 1);
    };
    // 평소에는 pan-y이다가 이미지 클릭했을때 뒷부분에서 터치 안되도록 막음
    const changeOptionsPinch = (isPinch) => {
        setIsPinchAble(isPinch);
    };

    const handlePointerDown = (e) => {
        pointerCache.push(e);
    };

    const handlePointerMove = (e) => {
        const index = pointerCache.findIndex(
            (cache) => cache.pointerId === e.pointerId,
        );
        pointerCache[index] = e;
        if (pointerCache.length === 2) {
            const curDistance = calDistance(pointerCache[0], pointerCache[1]);
            if (prevDistance === -1) {
                pinchOutStartDistance = curDistance;
                pinchInStartDistance = curDistance;
            } else {
                // 확대 -> 축소 / 축소 -> 확대 구현을 위한 부분
                // if (!pinchChangeFlag) {
                //     if (pinchOutFlag && curDistance < prevDistance) {
                //         pinchInStartDistance = prevDistance;
                //         pinchChangeFlag = true;
                //     }
                //     if (pinchInFlag && curDistance > prevDistance) {
                //         pinchOutStartDistance = prevDistance;
                //         pinchChangeFlag = true;
                //     }
                // }
                if (curDistance > pinchOutStartDistance + 3) {
                    handlePinchOut();
                }
                if (curDistance < pinchInStartDistance - 3) {
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
            // pinchChangeFlag = false;
            // changeOptionsAction(false, true);
            // setActionAble({ pinchAble: false, scrollAble: true });
            // changeOptionsPinch(false);
        }
    };

    return (
        <>
            <div>
                version 17, isPinchAble:
                {isPinchAble ? 1 : 0}, pinchOutFlag: {pinchOutFlag ? 1 : 0},
                cardWidthIndex: {cardWidthIndex}
            </div>
            <div
                className="touch-area"
                onPointerDown={isPinchAble && handlePointerDown}
                onPointerMove={isPinchAble && handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onPointerOut={handlePointerUp}
                onPointerLeave={handlePointerUp}
                style={{ touchAction: isPinchAble ? "pan-y" : "none" }}
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
