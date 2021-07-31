import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { purple } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    fontWeight: '700'
  },
}));

export default function CustomizedButton(props) {
  const { buttontext, buttoncolor} = props;
  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: buttoncolor ? buttoncolor : purple[500],
      '&:hover': {
        backgroundColor: buttoncolor ? buttoncolor : purple[700],
      },
    },
  }))(Button);
  const classes = useStyles();
  return (
    <div>
      <ColorButton variant="contained" color={buttoncolor} className={classes.margin} {...props}>
        {buttontext}
      </ColorButton>
    </div>
  );
}