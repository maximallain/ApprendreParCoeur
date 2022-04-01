import { useMemo, useState } from "react";
import "./GuessWordContainer.css";

const GuessWordContainer = () => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [knowsTheDefinition, setKnowsTheDefinition] = useState<boolean | null>(null);

  const answer = () => setHasAnswered(true);
  const answerAndKnow = () => {
    answer();
    setKnowsTheDefinition(true);
  };

  const answerAndDontKnow = () => {
    answer();
    setKnowsTheDefinition(false);
  };

  const definitionContainer = (
    <p className="has-text-centered">
      Qui a des connaissances approfondies dans une matière, en particulier des connaissances historiques.
    </p>
  );

  const answerButtons = (
    <div className="columns">
      <div className="column is-centered">
        <button className="button is-primary is-large has-text-weight-bold is-fullwidth" onClick={answerAndKnow}>
          Je sais !
        </button>
      </div>

      <div className="column">
        <button className="button is-warning is-large has-text-weight-bold is-fullwidth" onClick={answerAndDontKnow}>
          Je sais pas
        </button>
      </div>
    </div>
  );

  const answerAndKnowsButtons = (
    <div className="columns">
      <div className="column is-centered">
        <button
          className="button is-primary is-large has-text-weight-bold is-fullwidth"
          onClick={() => console.log("Je confirme que je sais")}
        >
          Je confirme que je sais
        </button>
      </div>

      <div className="column">
        <button
          className="button is-warning is-large has-text-weight-bold is-fullwidth"
          onClick={() => console.log("Ah ! En fait, non, je ne l'avais pas")}
        >
          Ah ! En fait, non, je ne l{"'"}avais pas
        </button>
      </div>
    </div>
  );

  const buttons = useMemo(() => {
    if (knowsTheDefinition === true) {
      return answerAndKnowsButtons;
    }
    return answerButtons;
  }, [knowsTheDefinition]);

  return (
    <div className="card guess-word-container">
      <div className="card-content is-flex is-flex-direction-column is-justify-content-space-between">
        <div className="title is-1 has-text-centered has-text-weight-bold mt-6 mb-0">Erudit</div>

        {hasAnswered && definitionContainer}
        {buttons}
      </div>
    </div>
  );
};

export default GuessWordContainer;
