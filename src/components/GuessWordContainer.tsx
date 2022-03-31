import "./GuessWordContainer.css";

const GuessWordContainer = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">Définition</div>
      </div>

      <div className="card-content">
        <div className="title is-3 ">Erudit</div>
        <button className="button is-primary">Je sais !</button>
        <button className="button is-warning">Je sais pas</button>
      </div>
    </div>
  );
};

export default GuessWordContainer;
