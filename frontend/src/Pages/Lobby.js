import React, { useContext, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import logo from '../images/Loup.png';
import Game from '../helpers/Partie';
import { SetGameContext } from './Interface';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom';
import { Voyante } from '../helpers/Roles/Voyante';
import { Villageois } from '../helpers/Roles/Villageois';
import { Sorciere } from '../helpers/Roles/Sorciere';
import { Pyromane } from '../helpers/Roles/Pyromane';
import { PetiteFille } from '../helpers/Roles/PetiteFille';
import { LoupGarouBlanc } from '../helpers/Roles/LoupGarouBlanc';
import { LoupGarou } from '../helpers/Roles/LoupGarou';
import { Cupidon } from '../helpers/Roles/Cupidon';
import { Corbeau } from '../helpers/Roles/Corbeau';

function CustomTypefield({ onValidate, onRemove }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('lightblue');

  const handleValidate = () => {
    if (name === '') {
      return;
    }
    const valided = onValidate(name);
    if (valided) {
      setColor('lightgreen');
    }
  };

  const handleRemove = () => {
    onRemove(name);
    setName('');
    setColor('lightblue');
  };

  return (
    <Box sx={{ mb: '16px' }}>
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ backgroundColor: color }}
      />
      <Button endIcon={<DoneIcon color="success" />} onClick={handleValidate} />
      <Button endIcon={<ClearIcon color="error" />} onClick={handleRemove} />
    </Box>
  );
}

function Lobby() {
  const [players, setPlayers] = useState([]);
  const [num, setNum] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const setGame = useContext(SetGameContext);

  const handleAdd = (name) => {
    if (!name) {
      return false;
    }
    for (const player in players) {
      if (players[player] === name) {
        return false;
      }
    }
    setPlayers((old) => {
      return [...old, name];
    });
    setNum((old) => {
      return old + 1;
    });
    return true;
  };

  const handleRemove = (name) => {
    if (!name) {
      return;
    }
    setPlayers((old) => {
      return players.filter((value) => value !== name);
    });
    setNum((old) => {
      return old - 1;
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const startGame = () => {
    if (players.length < 9) {
      setOpen(true);
      return;
    }

    const roles = [
      new Voyante(players[0]),
      new Villageois(players[1]),
      new Sorciere(players[2]),
      new Pyromane(players[3]),
      new PetiteFille(players[4]),
      new LoupGarouBlanc(players[5]),
      new LoupGarou(players[6]),
      new Cupidon(players[7]),
      new Corbeau(players[8]),
    ];

    const gameInstance = new Game(players, roles); // Créer une nouvelle instance de Game
    gameInstance.printPlayers(); // Imprimer les joueurs et leurs rôles
    setGame(gameInstance); // Passer l'instance de jeu au contexte
    navigate('/app/game');
  };

  let typefields = [
    <CustomTypefield onValidate={handleAdd} onRemove={handleRemove} />,
  ];
  for (let i = 0; i < num; i++) {
    typefields.push(
      <CustomTypefield onValidate={handleAdd} onRemove={handleRemove} />
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop={1}
      marginBottom="5px"
    >
      <Box textAlign="left" width="100%">
        <img
          src={logo}
          alt="Logo"
          style={{ width: '100px', height: '100px' }}
        />
        <Typography variant="h6">Loups Garou</Typography>
      </Box>
      <Typography variant="h6">Joueurs</Typography>
      {typefields.map((typefield, i) => {
        return typefield;
      })}
      <Box m={1}>
        <Button variant="contained" color="primary" onClick={startGame}>
          Play
        </Button>
        <Typography variant="h6">Nombre de joueurs: {num}</Typography>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Vous avez besoin d'au moins 9 joueurs pour commencer le jeu.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Lobby;
