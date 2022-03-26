import React, { useState, useEffect, useRef } from "react";
import PokemonInfo from "./PokemonInfo";
import PokemonEvolution from "./PokemonEvolution";
import classes from "./Pokemon.module.css";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState();

  const enteredPokemon = useRef();

  useEffect(() => {
    const fetchPokemonHandler = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${page}`
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();
        setCurrentPage(data.id);

        const transformedPokemon = {
          id: data.id,
          name: data.species.name,
          height: data.height,
          weight: data.weight,
          img: data.sprites.other.dream_world.front_default,
          type: data.types.map((type) => `${type.type.name}`),
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          specialAttack: data.stats[3].base_stat,
          specialDefense: data.stats[4].base_stat,
          speed: data.stats[5].base_stat,
          ability: data.abilities.map((ability) => `${ability.ability.name}`),
          forms: data.forms.map((form) => form.name),
        };

        setPokemon(transformedPokemon);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchPokemonHandler();
  }, [page]);

  const nextPokemonHandler = () => {
    setPage(currentPage + 1);
  };

  const prevPokemonHandler = () => {
    if (currentPage === 1) {
      return;
    }
    setPage(currentPage - 1);
  };

  const loadPokemonHandler = () => {
    setPage(enteredPokemon.current.value);
  };

  let content = <p className={classes.loading}>Found no pokemon.</p>;
  if (!isLoading && !error) {
    content = (
      <React.Fragment>
        <h1 className={classes.name}>{pokemon.name}</h1>
        <PokemonInfo
          pokemon={pokemon}
          nextPokemon={nextPokemonHandler}
          prevPokemon={prevPokemonHandler}
        />
      </React.Fragment>
    );
  }
  if (error) {
    content = <p className={classes.loading}>{error}</p>;
  }
  if (isLoading) {
    content = <p className={classes.loading}>Loading...</p>;
  }

  return (
    <React.Fragment>
      <div className={classes.pokemon}>
        <div className={classes.search}>
          <input
            ref={enteredPokemon}
            className={classes.input}
            placeholder="Search pokemon (name or id)"
          />
          <button className={classes.button} onClick={loadPokemonHandler}>
            Search
          </button>
        </div>
      </div>
      {content}
    </React.Fragment>
  );
};

export default Pokemon;
