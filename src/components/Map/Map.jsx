import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import * as artifactData from "../../Data/artifacts.json";
import "../Map/Map.css";
import CardPopup from "./CardPopup";
import AirportNPC from "../AirportNPC/AirportNPC";
import RulesCard from "../RulesCard/RulesCard";
import Leaderboardchart from "../LeaderBoard/Leaderboardchart";
import TeamsDropdown from '../CurrentTeam/TeamsDropdown';
import CustomizedButton from '../CustomizedButton/CustomizedButton';
import CustomizedModal from '../CustomizedModal/CustomizedModal';
import MarketExpertModal from '../MarketExpertModal/MarketExpertModal';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 40;

function Map({ teams }) {
    const teamsData = JSON.parse(window.sessionStorage.getItem("allTeamsData")) || teams;
    const [allTeams, setAllTeams] = useState(teamsData);
    const [currentTeam, setCurrentTeam] = useState(null);

    const [viewport, setViewport] = useState({
      latitude: 40,
      longitude: 20,
      width: "100%",
      height: "100vh",
      zoom: 2,
    });
    const [selectedArtifact, setSelectedArtifact] = useState(null);
    const [auctionedArtifacts, setAuctionedArtifacts] = useState(window.sessionStorage.getItem("auctionedArtifacts") || []);
    const [renderPins, setRenderPins] = useState([]);
    const [openMarketExpert, setOpenMarketExpert] = useState(false);

    useEffect(() => {
      setRenderPins(artifactData.artifacts);

      const listener = e => {
        if (e.key === "Escape") {
            setSelectedArtifact(null);
        }
      };
      window.addEventListener("keydown", listener);

      return () => {
        window.removeEventListener("keydown", listener);
      };
    }, []);

    useEffect(() => {
      window.sessionStorage.setItem("allTeamsData", JSON.stringify(allTeams));
    }, [allTeams]);

    useEffect(() => {
      window.sessionStorage.setItem("auctionedArtifacts", auctionedArtifacts);
    }, [auctionedArtifacts])

    const handleCloseArtifact = () => {
      setSelectedArtifact(null);
    };

    const setAuctionedArtifact = () => {
      renderPins.map(car => {
        if (car && car.id === selectedArtifact.id) {
          car.render = false;
        }
      });
      setAuctionedArtifacts(prevState => [...prevState, selectedArtifact.id]);
    }

    const updateAmtForTeam = (newAmt, teamId) => {
      const updatedTeams = allTeams.reduce((acc, team) => {
        if(team.id === parseInt(teamId)) {
          team.currentAmt = newAmt;
        }
        if (acc.length === 0) {
          acc = [team];
        } else {
          acc.push(team);
        }
        return acc;
      }, []);
      setAllTeams(updatedTeams);
    }

    const updateArtifactNumberForTeams = (numberOfCars, teamId) => {
      const updatedTeams = allTeams.reduce((acc, team) => {
        if(team.id === parseInt(teamId)) {
          team.numberOfCars = numberOfCars;
        }
        if (acc.length === 0) {
          acc = [team];
        } else {
          acc.push(team);
        }
        return acc;
      }, []);
      setAllTeams(updatedTeams);
    }

    const updateCurrentTeamOnMap = (currentTeamId) => {
      setCurrentTeam(currentTeamId);
    }

    return (
      <div>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken="pk.eyJ1IjoidmFydW5zYWNoZGV2YSIsImEiOiJja3F1azYxeHowNWQwMm9vMXpsNzFjZzdnIn0.vnKW75YqDHPdsKyoEH4BdA"
          mapStyle="mapbox://styles/varunsachdeva/ckqukbhxy6dr418qsh529bunr">
          {renderPins.map(artifact => {
              const isSelectedArtifact = selectedArtifact && artifact.id === selectedArtifact.id;
              const allAuctionedData = window.sessionStorage.getItem("auctionedArtifacts") || auctionedArtifacts;
              const isRenderArtifact = !allAuctionedData.includes(artifact.id);
              return (
                <Marker key={artifact.name} latitude={artifact.geometry.coordinates[1]} longitude={artifact.geometry.coordinates[0]}>
                  <svg
                    height={SIZE}
                    viewBox="0 0 24 24"
                    style={{
                        cursor: "pointer",
                        fill: !isRenderArtifact ? '#ccc' : (isSelectedArtifact ? "#000" : "#d00"),
                        stroke: "rgba(0, 0, 0, 0.40)",
                        transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
                        zIndex: "1000",
                    }}
                    onClick={e => {
                        e.preventDefault();
                        setSelectedArtifact(artifact);
                    }}>
                    <path d={ICON} />
                  </svg>
                </Marker>
              );
            })}
            <div style={{display: 'inline'}}>
              <TeamsDropdown teams={allTeams} updateCurrentTeamOnMap={updateCurrentTeamOnMap} />
              <AirportNPC currentTeamId={currentTeam} updateAmtForTeam={updateAmtForTeam} teams={allTeams} />
              <div style={{margin: '0 25%'}}>
                <CustomizedButton buttontext={"Sell/Buy from the expert"} buttoncolor={'#794614'} onClick={setOpenMarketExpert} />
              </div>
            </div>
            <RulesCard />
            <Leaderboardchart teams={allTeams} currentTeam={currentTeam} />
            {selectedArtifact ?
              <CardPopup
                selectedArtifact={selectedArtifact}
                handleCloseArtifact={handleCloseArtifact}
                setAuctionedArtifact={setAuctionedArtifact}
                updateAmtForTeam={updateAmtForTeam}
                updateArtifactNumberForTeams={updateArtifactNumberForTeams}
                teams={allTeams}
              /> : null}
            {openMarketExpert && <CustomizedModal open={openMarketExpert} setOpenModal={setOpenMarketExpert}>
              <MarketExpertModal teams={allTeams} updateAmtForTeam={updateAmtForTeam} updateArtifactNumberForTeams={updateArtifactNumberForTeams} />
            </CustomizedModal> }
        </ReactMapGL>
      </div>
    );
}

export default Map;
