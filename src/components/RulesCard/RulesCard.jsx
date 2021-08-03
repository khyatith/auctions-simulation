import React, { useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core";
import CustomizedButton from "../CustomizedButton/CustomizedButton";
import CustomizedModal from '../CustomizedModal/CustomizedModal';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
      width: 275,
      float: 'right',
      position: 'absolute',
      right: '0',
      top: '0'
    },
    expand: {
      zIndex: '9999'
    },
    textstyle: {
      color: 'purple',
      fontWeight: '700',
      fontSize: '20px'
    },
    manualupdatecontainer: {
      margin: '50px auto',
      width: '400px'
    },
    textinput: {
      backgroundColor: '#ffffff',
      marginTop: '50px',
      width: '300px'
    }
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

function RulesCard({ teams, updateAmtForTeam, updateArtifactNumberForTeams }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(true);
    const [doUpdateResultsManually, setDoUpdateResultsManually] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState();
    const [numberOfArtifacts,setNumberofArtifacts] = useState();
    const [currentAmt, setCurrentAmt] = useState();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const updateResultsManually = () => {
      setDoUpdateResultsManually(true);
    }

    const setUpdateResultsManually = () => {
      setDoUpdateResultsManually(false);
    }

    const updateSelectedTeam = (e) => {
      setSelectedTeam(e.target.value);
    }

    const updateNumberOfArtifacts = (e) => {
      setNumberofArtifacts(e.target.value);
    }

    const updateCurrentAmt = (e) => {
      setCurrentAmt(e.target.value);
    }

    const updateTeamInfo = () => {
      updateAmtForTeam(parseInt(currentAmt), selectedTeam);
      updateArtifactNumberForTeams(numberOfArtifacts, selectedTeam);
    }

    const renderManualUpdate = () => {
      return (
        <div className={classes.manualupdatecontainer}>
          <NativeSelect
            id="action-select"
            value={selectedTeam}
            onChange={updateSelectedTeam}
            input={<BootstrapInput />}
            className={classes.select}
          >
            <option aria-label="Select Team" value="">--Select Team--</option>
            {
              teams.map(team => {
                const { id, name } = team;
                return (
                  <option value={id}>Team {name}</option>
                )
              })
            }
          </NativeSelect>
          <TextField className={classes.textinput} id="outlined-basic" variant="outlined" placeholder="Enter number of artifacts" onChange={updateNumberOfArtifacts} value={numberOfArtifacts} />
          <TextField className={classes.textinput} id="outlined-basic" variant="outlined" placeholder="Enter total amount" onChange={updateCurrentAmt} value={currentAmt} />
          <CustomizedButton className={classes.textinput} buttoncolor="purple" buttontext="Update" onClick={updateTeamInfo} />
        </div>
      )
    }

    return (
      <>
        <Card className={classes.root} id="rules">
          <CardHeader
            title="Rules"
            action={
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: true,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more">
                <ExpandMoreIcon />
              </IconButton>
          }></CardHeader>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <CustomizedButton buttoncolor="#cccccc"  buttontext="Update results" onClick={updateResultsManually} />
              <Typography variant="body2" color="textSecondary">
                You can do 3 moves in each turn. You need to choose between -
                <p className={classes.textstyle}>Buy</p>
                <p className={classes.textstyle}>Sell</p>
                <p className={classes.textstyle}>Travel upto 2 times</p>
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
        {doUpdateResultsManually &&
          <CustomizedModal open={doUpdateResultsManually} setOpenModal={setUpdateResultsManually}>
            {renderManualUpdate()}
          </CustomizedModal>
        }
      </>
    );
}

export default RulesCard;
