import React, { useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { truncate } from "fs";

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
    }
}));

function RulesCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
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
            <Typography variant="body2" color="textSecondary">
              You can do 3 moves in each turn. You need to choose between -
              <p style={{color: 'purple', fontWeight: '700', fontSize: '20px'}}>Buy</p>
              <p style={{color: 'purple', fontWeight: '700', fontSize: '20px'}}>Sell</p>
              <p style={{color: 'purple', fontWeight: '700', fontSize: '20px'}}>Travel upto 2 times</p>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
}

export default RulesCard;
