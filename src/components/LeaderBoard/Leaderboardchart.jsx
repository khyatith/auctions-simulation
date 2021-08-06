import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1000,
    position: "absolute",
    bottom: "10px",
    marginLeft: "500px",
    display: 'flex'
  },
  chart1: {
    display: 'inline'
  },
  chart2: {
    display: 'inline'
  }
}));
 
const Leaderboardchart = ({ teams }) => {
  const classes = useStyles();
  const [barChartData, setBarChartData] = useState();
  const [numberOfCarsData, setNumberOfCarsData] = useState();

  useEffect(() => {
    const firstColumn = teams.map(team => team.name);
    let data = [];
    firstColumn.unshift('Teams');
    data.push(firstColumn);
    const finalData = teams.reduce((acc, team) => {
      if (acc.length === 0) {
        acc.push(team.currentAmt);
      } else {
        acc.push(team.currentAmt);
      }
      return acc;
    }, []);
    finalData.unshift('Gold');
    data.push(finalData);
    setBarChartData(data);
  }, [teams]);

  useEffect(() => {
    const firstColumn = teams.map(team => team.name);
    let data = [];
    firstColumn.unshift('Teams');
    data.push(firstColumn);
    const finalData = teams.reduce((acc, team) => {
      if (acc.length === 0) {
        acc.push(team.numberOfCars);
      } else {
        acc.push(team.numberOfCars);
      }
      return acc;
    }, []);
    finalData.unshift('Number of paintings');
    data.push(finalData);
    setNumberOfCarsData(data);
  }, [teams])
  console.log('teams in leaderboard', teams);
  return (
  <div className={classes.root}>
    <div className={classes.chart1}>
      <Chart
          width={'300px'}
          height={'300px'}
          chartType="Bar"
          loader={<div>Loading Results</div>}
          data={numberOfCarsData}
          options={{
            // Material design options
            chart: {
              title: 'Results',
            },
            colors: ['blue', 'green', 'yellow'],
          }}
        />
    </div>
    <div className={classes.chart2}>
      <Chart
        width={'300px'}
        height={'300px'}
        chartType="Bar"
        loader={<div>Loading Results</div>}
        data={barChartData}
        options={{
          // Material design options
          chart: {
            title: 'Results',
          },
          colors: ['blue', 'green', 'yellow'],
        }}
      />
    </div>
    </div>
  )
};

export default Leaderboardchart;
