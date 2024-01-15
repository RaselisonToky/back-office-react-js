import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function Input(props) {

  const {id,label , type , variant, onChange ,width, value}= props;
    return (
        <TextField
          id={id}
          sx={{ width: width }}
          size="small"
          value={value}
          label={label}
          type={type}
          InputLabelProps={{
            shrink: true,
          }}
          variant={variant}
          onChange={onChange}
        />
    );
}