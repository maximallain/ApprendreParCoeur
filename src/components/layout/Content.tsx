import { useState } from "react";
import GuessWordContainer from "../GuessWordContainer";

const Content = () => {
  const [hasBegun, setHasBegun] = useState(false);

  return (
    <div className="content">
      {hasBegun ? <GuessWordContainer /> : <button onClick={() => setHasBegun(true)}>Commencer</button>}
    </div>
  );
};

export default Content;
