import React from "react";
import { useState } from "react";

import RoughNotation from "./components/RoughNotation.tsx";

function App() {
  const [show, setShow] = useState(false);

  const config = {};

  return (
    <div className="tests" onClick={() => setShow(!show)}>
      <div>
        <RoughNotation {...config} show={show} type="underline">
          underline
        </RoughNotation>
      </div>
      <div>
        <RoughNotation {...config} show={show} type="box">
          box
        </RoughNotation>
      </div>
      <div>
        <RoughNotation {...config} show={show} type="circle">
          circle
        </RoughNotation>
      </div>
      <div>
        <RoughNotation {...config} show={show} type="highlight">
          highlight
        </RoughNotation>
      </div>
      <div>
        <RoughNotation {...config} show={show} type="strike-through">
          strike-through
        </RoughNotation>
      </div>
      <div>
        <RoughNotation {...config} show={show} type="crossed-off">
          crossed-off
        </RoughNotation>
      </div>
    </div>
  );
}

export default App;
