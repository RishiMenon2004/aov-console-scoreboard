import { useContext } from "react"
import { Clubs } from "../clubs"
import { EditorContext } from "../App"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

interface FixtureItemProps {
	team1: string,
	time: string,
	team2: string
}

export default function FixtureItem({team1, time, team2}: FixtureItemProps) {
	const Team1 = Clubs[team1] 
	const Team2 = Clubs[team2]

	const { displayMode } = useContext(EditorContext)

	return <>
		<div className="fixture-item">
			<div className="fixture-side left">
				{Team1.short}
				<img src={Team1.icon} alt={Team1.label} />
			</div>
			<div className="fixture-timing">{time}</div>
			<div className="fixture-side right">
				<img src={Team2.icon} alt={Team2.label} />
				{Team2.short}
			</div>
			{!displayMode && <></>}
		</div>
	</>
}