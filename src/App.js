// https://www.npmjs.com/package/qr-scanner
// Browsers: Chrome, Firefox, Edge
// not working on safari
import QrScanner from "qr-scanner";
import { useEffect, useState, useCallback, useRef } from "react";
// import Webcam from "./webcam";
// import CameraPro from "./cameraPro";
import Html5CameraPhoto from "./html5CameraPhoto";
import "./styles.css";

import QrScannerWorkerPath from "!!raw-loader!./libs/qr-scanner-worker.min.js";
QrScanner.WORKER_PATH = URL.createObjectURL(new Blob([QrScannerWorkerPath]));

const isNative = 1;

export default function App() {
  const [qrScanner, setQrScanner] = useState(null);
  const [qrCode, setQrCode] = useState("");

  const [showVideo, setShowVideo] = useState(false);
  const videoElem = useRef(null);

  const start = useCallback(() => {
    const videoElement = isNative ? videoElem.current : videoElem.current.video;

    console.log("videoElement", videoElement);
    const scanner = new QrScanner(videoElement, (result) => {
      setQrCode(result);
      console.log(result);
    });

    console.log("scanner", scanner);
    setQrScanner(scanner);
    setShowVideo(true);
    scanner.start();
  }, []);

  // useEffect(()=>{
  //   qrScanner?.start()
  // },[qrScanner])

  useEffect(() => {
    if (qrCode && qrScanner) {
      qrScanner.stop();
      setShowVideo(false);
    }
  }, [qrCode]);

  useEffect(() => {
    const scannedRegion = document.querySelector(".scanned-region");
    if (qrScanner && scannedRegion) {
      console.log("______________________________");
      scannedRegion.appendChild(qrScanner.$canvas);
    }
  }, [qrScanner]);

  useEffect(() => {
    return () => {
      if (qrScanner) {
        qrScanner.destroy();
        setQrScanner(null);
      }
    };
  }, [qrScanner]);
  console.log("showVideo", showVideo);
  return (
    <div className="App">
      <h1>QR Code Reader</h1>
      <button onClick={() => start(qrScanner)}>Start</button>
      <video ref={videoElem} className="video-element" />
      {/* <Webcam ref={videoElem} showVideo={showVideo} isNative={isNative} /> */}
      {/* <CameraPro ref={videoElem} showVideo={showVideo} isNative={isNative} /> */}
      {/* <Html5CameraPhoto
        ref={videoElem}
        showVideo={showVideo}
        isNative={isNative}
      /> */}
      QR Code: {qrCode}
      {showVideo && <div className="scanned-region" />}
    </div>
  );
}
