import { useCallback, useRef, forwardRef } from "react";

import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const WebcamCapture = forwardRef(({ showVideo, isNative }, ref) => {
  console.log("ref", ref.current);
  // const webcamRef = useRef(null);

  // const capture = useCallback(() => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  // }, [webcamRef]);

  const capture = useCallback(() => {
    const imageSrc = ref.current.getScreenshot();
  }, [ref]);

  const videoOutput = (
    <>
      {isNative ? (
        <video ref={ref} className="video-element" />
      ) : (
        <Webcam
          className="video-element"
          audio={false}
          height={720}
          ref={ref}
          // ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
      )}
    </>
  );

  return <div>{videoOutput}</div>;
});

export default WebcamCapture;
