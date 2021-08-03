import React from "react";
import Map from "./components/Map/Map";
import "./App.css";
import { yellow, blue, green } from "@material-ui/core/colors";

const teams = [{
	id: 1,
	name: 'blue',
	color: blue[500],
	initialAmt: 200000,
	currentAmt: 200000,
	numberOfCars: 0,
},{
	id: 2,
	name: 'green',
	color: green[500],
	initialAmt: 200000,
	currentAmt: 200000,
	numberOfCars: 0,
},{
	id: 3,
	name: 'yellow',
	color: yellow[500],
	initialAmt: 200000,
	currentAmt: 200000,
	numberOfCars: 0,
}];

function App() {
	return (
		<div>
			<Map teams={teams} />
		</div>
	);
}

export default App;
