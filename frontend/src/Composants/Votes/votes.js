import React, { useState } from 'react';
import { Grid, Paper, Typography, Button, Box } from '@mui/material';

const App = () => {
  const votesinitial = [
    { player: 'Frank',votes: 0},
    { player: 'Esteban', votes : 0 },
    { player: 'Camille', votes : 0},
    { player: 'Laughan' ,votes : 0},
    { player: 'Nicolas' ,votes : 0},
    { player: 'Nicky' ,votes : 0},
  ];

  const [votes, setVotes] = useState(votesinitial);

  const handleVote = (index) => {
    setVotes((prevVotes) => {
      const updatedVotes = [...prevVotes];
      updatedVotes[index].votes += 1;
      return updatedVotes;
    });
  };

  const handleReset = () => {
    setVotes(votesinitial);
  };

  return (
    <Grid container spacing={3} justifyContent="center" paddingTop={5}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          Votes des Joueurs
        </Typography>
      </Grid>
      {votes.map((player, index) => (
        <Grid item key={index}>
          <Paper elevation={3} style={{ padding: '10px', textAlign: 'center' }}>
            <Typography variant="subtitle1" gutterBottom>
              {player.player}
            </Typography>
            <Typography variant="body1">Votes: {player.votes}</Typography>
            <Button variant="contained" color="primary" onClick={() => handleVote(index)}>
              Voter
            </Button>
          </Paper>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center">
        <Button variant="contained" color="secondary" onClick={handleReset} >
          Réinitialiser
        </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default App;
