import React, { useState, forwardRef } from "react";
import { Camera } from "react-camera-pro";

const Component = forwardRef(({ showVideo, isNative }, ref) => {
  // const camera = useRef(null);
  const [image, setImage] = useState(null);

  return (
    <div>
      <Camera ref={ref} className="video-element" />
      <button onClick={() => setImage(ref.current.takePhoto())}>
        Take photo
      </button>
      <img src={image} alt="Taken photo" />
    </div>
  );
});

export default Component;
