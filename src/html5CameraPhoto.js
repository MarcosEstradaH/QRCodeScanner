import React, { forwardRef } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

const Html5CameraPhoto = forwardRef(({ showVideo, isNative }, ref) => {
  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
  }

  return (
    <Camera
      ref={ref}
      onTakePhoto={(dataUri) => {
        handleTakePhoto(dataUri);
      }}
    />
  );
});

export default Html5CameraPhoto;
