import { useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import "../style/faceExpression.scss";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");
  const [cameraOn, setCameraOn] = useState(false);

  async function startCamera() {
    await init({ landmarkerRef, videoRef, streamRef });
    setCameraOn(true);
    setExpression("Detecting...");
  }

  function stopCamera() {
    if (landmarkerRef.current) {
      landmarkerRef.current.close();
    }
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setCameraOn(false);
  }

  async function handleDetect() {
    const result = await detect({ landmarkerRef, videoRef, setExpression });
    onClick(result);
    // stop camera immediately after detection
    stopCamera();
  }

  return (
    <div className="video-div" style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        style={{ width: "400px", borderRadius: "12px" }}
        playsInline
      />
      <h2>{expression}</h2>

      {!cameraOn ? (
        <button className="button" onClick={startCamera}>
          Start Camera
        </button>
      ) : (
        <button className="button" onClick={handleDetect}>
          Detect Mood
        </button>
      )}
    </div>
  );
}
