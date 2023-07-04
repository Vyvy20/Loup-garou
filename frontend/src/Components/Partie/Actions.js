import React from "react";
import {Box, Typography, Button, Fab} from "@mui/material";
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';

function Actions() {
    return(
      <Box>
        <Box sx={{border: '1px solid', width: '30%', backgroundColor: 'grey', marginTop: '20%', marginLeft: '37%'}}>
          <Typography variant="h4">Actions</Typography>
          <Button variant="contained">action1</Button>
          <Fab color="primary" aria-label="add" sx={{marginLeft: '80%'}}>
            <DoneOutlinedIcon />
          </Fab>
        </Box>
      </Box>
    )
  }
  export default Actions;