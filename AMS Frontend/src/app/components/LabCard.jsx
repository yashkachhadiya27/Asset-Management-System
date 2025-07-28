import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const LabCard = ({ lab }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{lab.name}</Typography>
        <Typography variant="body2">Layout: {JSON.stringify(lab.layout)}</Typography>
      </CardContent>
    </Card>
  );
};

export default LabCard;
