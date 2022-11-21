import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import "./GuessWordContainer.css";
import WordCardContent from "./WordCardContent";

export type WordDefinition = {
  word: string;
  definition: string;
};

const WORDS_DEFINITIONS: WordDefinition[] = [
  { word: "cimaise", definition: "Moulure qui forme la partie supérieure d'une corniche." },
  { word: "acuité", definition: "Caractère aigu, intense. Degré de sensibilité (d'un sens)." },
  { word: "prosaïque", definition: "Qui tient trop de la prose. Qui manque d'élégance." },
  { word: "éphèbe", definition: "Adolescent grec. Jeune homme." },
  {
    word: "phéromone",
    definition:
      "Molécule chimique produite par un organisme, qui induit un comportement spécifique chez un autre membre de la même espèce.",
  },
  {
    word: "colluvion",
    definition: "Dépôt de sédiments qui se forme sur une petite distance et en fine couche sur un versant.",
  },
  {
    word: "syntagme",
    definition:
      "En linguistique, le syntagme est un constituant syntaxique et sémantique de la phrase. On l'appelle aussi groupe ou entité car il est composé d'un ou plusieurs mots allant jusqu'à la phrase simple.",
  },
  {
    word: "parataxe",
    definition:
      "Juxtaposition de propositions sans mot de liaison. Exemple : J’ai pris l’autobus à 2 heures. Il faisait très chaud. J’ai mangé au restaurant, chez Céleste, comme d’habitude. (Albert Camus, L'Étranger)",
  },
  {
    word: "asyndète",
    definition: "Absence de liaison entre deux termes ou groupes de termes en rapport étroit (ex. bon pied bon œil).",
  },
  {
    word: "anaphore",
    definition:
      "Répétition d'un mot en tête de plusieurs membres de phrase, pour obtenir un effet de renforcement ou de symétrie. Exemple : Paris ! Paris outragé ! Paris brisé ! Paris martyrisé !",
  },
];

const GuessWordContainer = () => {
  const [wordDefinitionIndex, setWordDefinitionIndex] = useState(0);
  const [isListTerminated, setIsListTerminated] = useState(false);
  const [score, setScore] = useState(0);

  const currentWordDefinition = useMemo(() => WORDS_DEFINITIONS[wordDefinitionIndex], [wordDefinitionIndex]);
  const progress = useMemo(() => 100 * (wordDefinitionIndex / WORDS_DEFINITIONS.length), [wordDefinitionIndex]);

  const increment = useCallback((wordDefinitionIndex: number) => {
    if (wordDefinitionIndex + 1 >= WORDS_DEFINITIONS.length) {
      setIsListTerminated(true);
    } else {
      setWordDefinitionIndex(wordDefinitionIndex + 1);
    }
  }, []);

  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("/api/word_definitions/?format=json").then((res) => {
      console.log("res", res);
      return res.json();
    })
  );
  console.log("isLoading", isLoading);
  console.log("data", data);
  console.log("error", error);

  const displayNextWord = (incrementingScore: boolean) => {
    increment(wordDefinitionIndex);
    if (incrementingScore) setScore(score + 1);
  };

  return (
    <div className="card guess-word-container">
      {isListTerminated ? (
        <div className="title is-1 has-text-centered has-text-weight-bold mt-6 mb-0">
          Ton score : {score}/{WORDS_DEFINITIONS.length}
        </div>
      ) : (
        <WordCardContent wordDefinition={currentWordDefinition} progress={progress} displayNextWord={displayNextWord} />
      )}
    </div>
  );
};

export default GuessWordContainer;
