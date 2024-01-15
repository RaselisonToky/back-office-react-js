import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function MyButton(props) {
    const {variant,designation, onClick}= props;


    const buttonStyle = {
      fontSize:'16px',
      backgroundColor:'#e87524',
      height: '40px',
      color: 'white', 
    
    };

  return (
    <Stack spacing={2} direction="row">
      <Button variant={variant} onClick={onClick} style={buttonStyle}>{designation}</Button>
    </Stack>
  );
}