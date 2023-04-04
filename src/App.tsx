import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ImageConverter from "./ImageConverter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Offline Image Converter</h1>

      <ImageConverter />

      {/* Footer */}
      <footer>
        <p>
          This website will convert your image on your browser, without sending
          it to any external server. In other words, it will work offline.
        </p>
      </footer>
    </div>
  );
}

export default App;
