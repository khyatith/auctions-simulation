import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import * as artifactData from "../../Data/artifacts.json";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import TeamsDropdown from '../CurrentTeam/TeamsDropdown';
import CustomizedButton from "../CustomizedButton/CustomizedButton";
import currency from "currency.js";

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 500,
		margin: "40px auto",
		height: "600px",
		overflowY: "scroll",
	},
	cardcontent: {
    margin: '0px 30%',
  },
  select: {
    marginBottom: '20px',
    marginTop: '20px'
  },
  form: {
		margin: "20px 0px",
		width: 200,
	},
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

export default function MarketExpertModal({ updateAmtForTeam, teams, updateArtifactNumberForTeams }) {
  const classes = useStyles();
  const [playerAction, setAction] = useState();
  const [selectedTeam, setTeam] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const [finalPrice, setFinalPrice] = useState();
  const [convertedPrice, setConvertedPrice] = useState();

  const handleActionChange = (e) => {
    setAction(e.target.value);
  }

  const updateTeamForMarketExpert = (teamId) => {
    setTeam(teamId);
  }

  const handleSelectedCarChange = (e) => {
    setSelectedCar(e.target.value);
  }

  const goToMarketExpert = () => {
    const selectedItem = artifactData.artifacts.filter(artifact => artifact.id === parseInt(selectedCar));
    if (playerAction === '0') {
      setFinalPrice(selectedItem[0].sellingPrice);
      const conversion = currency(selectedItem[0].sellingPrice, { pattern: `# ` }).format();
      setConvertedPrice(conversion);
    } else {
      setFinalPrice(selectedItem[0].buyingPrice);
      const conversion = currency(selectedItem[0].buyingPrice, { pattern: `# ` }).format()
      setConvertedPrice(conversion)
    }
  }

  const makeTheDeal = () => {
    let updatedAmt = 0;
    let totalCars = 0;
    teams.forEach(team => {
      const { id, currentAmt, numberOfCars } = team;
      if (id === parseInt(selectedTeam) && playerAction === '0') {
        updatedAmt = parseInt(currentAmt) - parseInt(finalPrice);
        totalCars = parseInt(numberOfCars) + 1;
        console.log('totalCars in buying', totalCars);
      } else if (id === parseInt(selectedTeam) && playerAction === '1') {
        updatedAmt = parseInt(currentAmt) + parseInt(finalPrice);
        totalCars = parseInt(numberOfCars) <= 0 ? 0 : Math.abs(parseInt(numberOfCars) - 1);
      }
    })
    updateAmtForTeam(updatedAmt, selectedTeam);
    updateArtifactNumberForTeams(totalCars, selectedTeam)
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardContent className={classes.cardcontent}>
          <FormControl className={classes.margin}>
            <NativeSelect
              id="action-select"
              value={playerAction}
              onChange={handleActionChange}
              input={<BootstrapInput />}
              className={classes.select}
            >
              <option aria-label="Select Action" value="">--Select Action--</option>
              <option value='0'>Buy</option>
              <option value='1'>Sell</option>
            </NativeSelect>
          </FormControl>
          <TeamsDropdown teams={teams} updateTeamForMarketExpert={updateTeamForMarketExpert} />
          <NativeSelect
              id="car-select"
              value={selectedCar}
              onChange={handleSelectedCarChange}
              input={<BootstrapInput />}
              className={classes.select}
            >
              <option aria-label="Select Car" value="">--Select Car--</option>
              {artifactData.artifacts.map(car => {
                return <option key={car.id} value={car.id}>{car.name}</option>
              })}
            </NativeSelect>
            <TextField className={classes.form} size="small" name="Total" placeholder="Price from market expert" variant="outlined" value={convertedPrice} />
            <CustomizedButton buttontext={'Tell me the price!'}  onClick={goToMarketExpert} />
            <CustomizedButton buttontext={playerAction === '0' ? 'Buy the car' : 'Sell the car'} buttoncolor={'green'}  onClick={makeTheDeal} />
        </CardContent>
      </Card>
    </div>
  );
}
