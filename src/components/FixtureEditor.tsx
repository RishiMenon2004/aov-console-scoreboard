
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ClubItem, Clubs } from "../clubs"
import { MutableRefObject, useEffect, useRef, useState } from "react";
import ClubsList from "./ClubsList";

interface FixtureEditorProps {
	confirmCallback: () => void,
	cancelCallback: () => void
}

export default function FixtureEditor({ confirmCallback, cancelCallback }: FixtureEditorProps) {

	const existingClubs: [string, ClubItem][] = useQuery(api.clubs.getClubStandings)?.map(club => { return [ club.id, Clubs[club.id] ]}) || [];

	const focusWindow: MutableRefObject<HTMLDivElement> = useRef(null!)

	const [fixtureData, setFixtureData] = useState({
		team1_id: "none",
		team2_id: "none",
		time: "none"
	})

	const [isConfirmDisabled, setIsConfirmDisabled] = useState(true)

	const addFixture = useMutation(api.fixtures.newFixture)

	useEffect(() => {
		console.log(fixtureData)
		setIsConfirmDisabled(fixtureData.team1_id === "none" || fixtureData.team2_id === "none" || fixtureData.time === "none")
	}, [fixtureData])

	useEffect(() => {
		focusWindow.current.focus()
	}, [])

	function handleConfirm() {
		void addFixture({fixtureData})
		confirmCallback()
	}

	const [sideOnePicker, setSideOnePicker] = useState(false)
	const [sideTwoPicker, setSideTwoPicker] = useState(false)

	return <>
		<div className="underlay"></div>
		
		<div className="fixture-editor-wrapper">
			{sideOnePicker && <ClubsList clubsList={existingClubs.filter(([clubId, club]) => { return clubId !== fixtureData.team2_id })} onClickHandler={(clubId: string) => {
				setFixtureData( prevData => {
					return {
						...prevData,
						team1_id: clubId
					}
				})

				setSideOnePicker(false)
			}}/>}
			<div tabIndex={0} ref={focusWindow} className="floating-window fixture-editor" onKeyDown={(event) => event.key === "Escape" && cancelCallback()}>
				<div className="title-header">
					<h3>New Fixture</h3>
				</div>
				<div className="editor-inputs">
					<div className="side-selector left" onClick={() => setSideOnePicker(true)}>
						{Clubs[fixtureData.team1_id]?.label || fixtureData.team1_id }
					</div>
					<div className="time-selector">
						<input type="time" onChange={(event) => setFixtureData(prevData => {
							return {
								...prevData,
								time: event.target.value
							}
						})}/>
					</div>
					<div className="side-selector right" onClick={() => setSideTwoPicker(true)}>
						{Clubs[fixtureData.team2_id]?.label || fixtureData.team2_id }
					</div>
				</div> 
				<div className="buttons-container">
					<div className={`confirm-window ${isConfirmDisabled ? "disabled" : ""}`} onClick={() => { !isConfirmDisabled && handleConfirm() }}>Confirm</div>
					<div className="close-window" onClick={cancelCallback}>Cancel</div>
				</div>
			</div>
			{sideTwoPicker && <ClubsList clubsList={existingClubs.filter(([clubId, club]) => { return clubId !== fixtureData.team1_id })} onClickHandler={(clubId: string) => {
				setFixtureData( prevData => {
					return {
						...prevData,
						team2_id: clubId
					}
				})

				setSideTwoPicker(false)
			}}/>}
		</div>
	</>
}