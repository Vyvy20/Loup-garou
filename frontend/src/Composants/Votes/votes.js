import React, { useState } from 'react';
import { Grid, Radio, RadioGroup, FormControl, FormControlLabel, Button } from '@mui/material';

const Votes = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(''); 
  const [votes, setVotes] = useState([]);
  const players = ['Joueur 1', 'Joueur 2', 'Joueur 3', 'Joueur 4','Joueur 5'];  

  const handlePlayerSelection = (event) => {
    setSelectedPlayer(event.target.value);
  };

  const handleVote = () => {
    if (selectedPlayer !== '') {
      setVotes((prevVotes) => [...prevVotes, selectedPlayer]);
      setSelectedPlayer('');
    }
  };

  const handleResetVotes = () => {
    setVotes([]);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid  justifyContent="center">
        <h2>Vote de jour</h2>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="players"
            name="players"
            value={selectedPlayer}
            onChange={handlePlayerSelection}
          >
            {players.map((player) => (
              <FormControlLabel key={player} value={player} control={<Radio />} label={player} />
            ))}
          </RadioGroup>
        </FormControl>
        <Button disabled={selectedPlayer === ''} onClick={handleVote}>
          Valider le vote
        </Button>
      </Grid>

      <Grid justifyContent="center">
        <h3>Votes enregistrés :</h3>
        {votes.length > 0 ? (
          votes.map((player, index) => <p key={index}>{player}</p>)
        ) : (
          <p>Aucun vote enregistré.</p>
        )}
        {votes.length > 0 && <Button onClick={handleResetVotes}>Réinitialiser les votes</Button>}
      </Grid>
    </Grid>
  );
};

export default Votes;


