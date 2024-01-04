import { useState } from "react";
import { useQuery } from "react-query";
import GuessWordContainer from "../guessWord/GuessWordContainer";

const Content = () => {
  const [hasBegun, setHasBegun] = useState(false);

  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("http://localhost:8000/api/word_definitions/?format=json").then((res) => res.json())
  );

  // Handle error
  if (isLoading) {
    return (
      <div>
        <p>Chargement...</p>
      </div>
    );
  }

  const beginButton = (
    <button className="button is-info is-size-4" onClick={() => setHasBegun(true)}>
      Commencer
    </button>
  );

  const content = isLoading ? <div>Chargement des mots...</div> : <GuessWordContainer wordDefinitions={data} />;

  return <div className="container mt-6 is-flex is-justify-content-center">{hasBegun ? content : beginButton}</div>;
};

export default Content;
