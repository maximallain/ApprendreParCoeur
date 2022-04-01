import { useState } from "react";
import GuessWordContainer from "../GuessWordContainer";

const Content = () => {
  const [hasBegun, setHasBegun] = useState(false);

  return (
    <div className="container is-flex is-justify-content-center is-align-items-center">
      {hasBegun ? (
        <GuessWordContainer />
      ) : (
        <button className="button is-info is-size-4" onClick={() => setHasBegun(true)}>
          Commencer
        </button>
      )}
    </div>
  );
};

export default Content;
