import { useContext } from "react"
import { Clubs } from "../clubs"
import { EditorContext } from "../App"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import DeleteButton from "./DeleteButton"
import { Id } from "../../convex/_generated/dataModel"

interface FixtureItemProps {
	team1: string,
	time: string,
	team2: string,
	docId: Id<"fixtures_day_1">
}

export default function FixtureItem({team1, time, team2, docId}: FixtureItemProps) {
	const Team1 = Clubs[team1] 
	const Team2 = Clubs[team2]

	const { displayMode } = useContext(EditorContext)

	const deleteFunction = useMutation(api.fixtures.removeFixture)

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
			{!displayMode && <DeleteButton deleteFunction={() =>  void deleteFunction({docId})}/>}
		</div>
	</>
}