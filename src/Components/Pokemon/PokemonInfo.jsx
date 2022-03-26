import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import "react-circular-progressbar/dist/styles.css";
import classes from "./PokemonInfo.module.css";

const PokemonInfo = (props) => {
  const {
    id,
    height,
    weight,
    ability,
    type,
    forms,
    hp,
    defense,
    attack,
    img,
    specialAttack,
    specialDefense,
    speed,
  } = props.pokemon;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const styleType = !type
    ? ""
    : props.pokemon.type.map((name) => (
        <span key={name} className={`${classes.type} ${classes[name]}`}>
          {name}
        </span>
      ));

  const styleAbility = !ability
    ? ""
    : props.pokemon.ability.map((ability) => (
        <span key={ability} className={`${classes.type}`}>
          {ability}
        </span>
      ));

  return (
    <React.Fragment>
      <div className={classes["pokemon-info"]}>
        <MdArrowBackIos className={classes.prev} onClick={props.prevPokemon} />
        {/* INFO */}
        <motion.div
          className={classes.info}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          initial={{
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <p>ID #{id}</p>
          <p>Height {height}</p>
          <p>Weight {weight}</p>
          <p>Abilities {styleAbility}</p>
          <p>Type {styleType}</p>
          <p>Forms {forms}</p>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          className={classes.container}
          style={{ x, y, rotateX, rotateY, z: 100 }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          initial={{
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          drag
          dragElastic={0.16}
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            className={classes.card}
            style={{ x, y, rotateX, rotateY, z: 10000 }}
            drag
            dragElastic={0.12}
            whileTap={{ cursor: "grabbing" }}
          >
            <img src={img} />
          </motion.div>
        </motion.div>

        {/* STATS */}
        <motion.div
          className={classes.stats}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          initial={{
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <div style={{ marginRight: "1rem" }}>
            <div className={classes["circle-stats"]}>
              <div style={{ width: 100, height: 100 }}>
                <CircularProgressbar
                  value={hp}
                  text={`${hp}%`}
                  styles={buildStyles({
                    textColor: "#000000",
                    pathColor: "#68AE28",
                  })}
                />
              </div>
              <p>HP</p>
            </div>

            <div className={classes["circle-stats"]}>
              <div style={{ width: 100, height: 100 }}>
                <CircularProgressbar
                  value={attack}
                  text={`${attack}%`}
                  styles={buildStyles({
                    textColor: "#000000",
                    pathColor: "#68AE28",
                  })}
                />
              </div>
              <p>Attack</p>
            </div>

            <div className={classes["circle-stats"]}>
              <div style={{ width: 100, height: 100 }}>
                <CircularProgressbar
                  value={defense}
                  text={`${defense}%`}
                  styles={buildStyles({
                    textColor: "#000000",
                    pathColor: "#68AE28",
                  })}
                />
              </div>
              <p>Defense</p>
            </div>
          </div>

          <div style={{ marginLeft: "1rem" }}>
            <div className={classes["circle-stats"]}>
              <div style={{ width: 100, height: 100 }}>
                <CircularProgressbar
                  value={specialAttack}
                  text={`${specialAttack}%`}
                  styles={buildStyles({
                    textColor: "#000000",
                    pathColor: "#68AE28",
                  })}
                />
              </div>
              <p>Spc. Attack</p>
            </div>

            <div className={classes["circle-stats"]}>
              <div style={{ width: 100, height: 100 }}>
                <CircularProgressbar
                  value={specialDefense}
                  text={`${specialDefense}%`}
                  styles={buildStyles({
                    textColor: "#000000",
                    pathColor: "#68AE28",
                  })}
                />
              </div>
              <p>Spc. Defense</p>
            </div>

            <div className={classes["circle-stats"]}>
              <div style={{ width: 100, height: 100 }}>
                <CircularProgressbar
                  value={speed}
                  text={`${speed}%`}
                  styles={buildStyles({
                    textColor: "#000000",
                    pathColor: "#68AE28",
                  })}
                />
              </div>
              <p>Speed</p>
            </div>
          </div>
        </motion.div>
        <MdArrowForwardIos
          className={classes.next}
          onClick={props.nextPokemon}
        />
      </div>
    </React.Fragment>
  );
};

export default React.memo(PokemonInfo);
