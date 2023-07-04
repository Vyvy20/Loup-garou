import React from "react";
import {Box, Typography} from "@mui/material";
import { IntToPhases } from "../../helpers/Phases";
import ExempleAction from "./Actions/ExempleAction";

const translate = {
  "Jourée": <ExempleAction />,
  "Corbeau": {
    "Nuit": <Typography>Action du Corbeau de nuit</Typography>,
  },
  "Cupidon": {
    "Phase préparatoire": <Typography>Action du Cupidon de nuit</Typography>,
  },
  "LoupGarou": {
    "Nuit": <Typography>Action du Loup Garou de nuit</Typography>,
  },
  "LoupGarouBlanc": {
    "Nuit": <Typography>Action du Loup Garou Blanc de nuit</Typography>,
  },
  "PetiteFille": {
    "Nuit": <Typography>Action de la Petite Fille de nuit</Typography>,
  },
  "Pyromane": {
    "Nuit": <Typography>Action du Pyromane de nuit</Typography>,
  },
  "Voyante": {
    "Nuit": <Typography>Action de la Voyante de nuit</Typography>,
  }
}

function translateAction(phase, role) {
  if (phase === 2) {
    return translate[IntToPhases[phase]]
  }
  else {
    return translate[role][IntToPhases[phase]]
  }
}

function Actions({phase, role}) {
    return(
        <Box sx={{border: '1px solid', width: '30%', backgroundColor: 'grey', marginTop: '20%', marginLeft: '37%'}}>
			{translateAction(phase, role)}
        </Box>
    )
  }
  export default Actions;