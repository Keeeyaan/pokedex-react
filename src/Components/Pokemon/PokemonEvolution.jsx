import React from "react";
import classes from "./PokemonEvolution.module.css";

const PokemonEvolution = () => {
  return (
    <React.Fragment>
      <div className={classes["pokemon-evolution"]}>
        <h1 className={classes.echain}>Evolution Chain</h1>
      </div>
    </React.Fragment>
  );
};

export default PokemonEvolution;
