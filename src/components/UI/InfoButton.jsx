import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

const InfoButton = ({ message }) => {
  return (
    <Tooltip title={message} arrow>
      <IconButton color='info' size='large'>
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};

export default InfoButton;
