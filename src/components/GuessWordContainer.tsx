import "./GuessWordContainer.css";

const GuessWordContainer = () => {
  return (
    <div className="card guess-word-container">
      <div className="card-content is-flex is-flex-direction-column is-justify-content-space-between">
        <div className="title is-flex-1 is-1 has-text-centered has-text-weight-bold">Erudit</div>
        <div className="buttons-container is-flex is-justify-content-center">
          <button className="button is-primary is-size-4">Je sais !</button>
          <button className="button is-warning is-size-4">Je sais pas</button>
        </div>
      </div>
    </div>
  );
};

export default GuessWordContainer;
