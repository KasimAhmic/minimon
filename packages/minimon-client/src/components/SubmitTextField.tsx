import React, { FC, useEffect, useState } from 'react';
import { Button, ButtonProps, TextField, TextFieldProps } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Icon } from './Icon';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  button: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

interface SubmitTextFieldProps {
  initialValue: string;
  onSubmit: (value: string) => void;
  TextFieldProps?: TextFieldProps;
  ButtonProps?: ButtonProps;
}

export const SubmitTextField: FC<SubmitTextFieldProps> = ({
  initialValue,
  onSubmit,
  TextFieldProps,
  ButtonProps,
}) => {
  const { cx, classes } = useStyles();

  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => setValue(initialValue), [initialValue]);

  return (
    <div className={classes.root} data-testid='submitTextField'>
      <TextField
        value={value}
        {...TextFieldProps}
        onChange={(e) => setValue(e.target.value)}
        className={cx(classes.textField, TextFieldProps?.className)}
        data-testid='submitTextFieldInput'
      />

      <Button
        variant='contained'
        {...ButtonProps}
        onClick={() => onSubmit(value)}
        className={cx(classes.button, ButtonProps?.className)}
        disableElevation
        data-testid='submitTextFieldButton'
      >
        <Icon icon='check' />
      </Button>
    </div>
  );
};
