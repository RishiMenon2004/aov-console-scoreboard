import { useState } from "react"
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import StandingsItem from "./StandingsItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { EditorContext } from "../App";
import { useMutation } from "convex/react-internal";
import ClubPicker from "./ClubPicker";
import { Clubs } from "../clubs"



export default function Standings() {
	const clubs = useQuery(api.clubs.getClubStandings) || [];
	const addClub = useMutation(api.clubs.newParticipatingClub);

	const { displayMode } = useContext(EditorContext)

	const [clubPickerIsActive, setClubPickerIsActive] = useState(false)

	function selectClub(clubId: string) {
		void addClub({ clubId })
		setClubPickerIsActive(false)
	}

	function closePicker() {
		setClubPickerIsActive(false)
	}

	const existingClubs = useQuery(api.clubs.getClubStandings)?.map(club => club.id) || [];
	const availableClubs = Object.entries(Clubs).filter(([clubId, club]) => !existingClubs.includes(clubId))

	return <>
		<div className="standings">
			<div className="title-header">
				<h2>Standings</h2>
			</div>
			<div className="clubs-list">
				<div className="club-item header">
					<div className="label">Club Name</div>
					<div>Wins</div>
					<div>Losses</div>
					<div>Points</div>
				</div>
				{clubs.map((club, index) => {
					return <StandingsItem team={club} index={index + 1} key={club._id}/>
				})}
				{ !displayMode && <>
					<div className="club-item button" tabIndex={1} onClick={() => setClubPickerIsActive(true)}>
						<div className="label">
							<div className="label-text">
								<FontAwesomeIcon icon={faPlusCircle}/>
								Add Club
							</div>
						</div>
					</div>
				</>}
			</div>
		</div>
		{ clubPickerIsActive && <>
			<ClubPicker confirmCallback={(clubId: string) => selectClub(clubId)} cancelCallback={closePicker} clubsList={availableClubs}/>
		</>}
	</>
}