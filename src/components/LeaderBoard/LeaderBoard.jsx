import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Avatar, makeStyles } from "@material-ui/core";
import { yellow, blue, green } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1000,
    position: "absolute",
    bottom: "10px",
    marginLeft: "500px",
  },
  margin: {
    maxWidth: "300px",
  },
  avatarRed: {
    backgroundColor: yellow[500],
  },
  avatarBlue: {
    backgroundColor: blue[500],
  },
  avatarGreen: {
    backgroundColor: green[500],
  },
}));

function LeaderBoard() {
  const classes = useStyles();
  const [teams, setTeams] = useState([
    {
      color: classes.avatarRed,
      teamName: "Team 1",
      gold: 0,
    },
    {
      color: classes.avatarBlue,
      teamName: "Team 2",
      gold: 0,
    },
    {
      color: classes.avatarGreen,
      teamName: "Team 3",
      gold: 0,
    },
]);

    return (
        <Card className={classes.root}>
            <CardContent>
                {teams.map(team => {
                    return (
                        <div key={team.id} className={classes.margin}>
                            <Grid key={team.id} container spacing={1}>
                                <Grid key={team.id} item>
                                    <Avatar key={team.id} className={team.color}> </Avatar>
                                </Grid>
                                <Grid key={team.id} item>
                                    <TextField key={team.id} label={team.teamName} />
                                </Grid>
                            </Grid>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}

export default LeaderBoard;
