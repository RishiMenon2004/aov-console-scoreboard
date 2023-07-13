import { Doc } from "../../convex/_generated/dataModel"
import { Clubs } from "../clubs";

interface StandingsItemProps {
	team: Doc<"participating_clubs">,
	index: number
}

export default function StandingsItem({team, index}: StandingsItemProps) {
 const teamData = Clubs[team.id] || { short: "null", label: "null", icon: "null"}
 
 return <>
	<div className="club-item">
		<div className="label">
			<div className="counter">{index}</div>
			<div className="label-text">
				<img src={teamData.icon} alt={teamData.label} />
				{teamData.label}
			</div>
		</div>
		<div>{team.wins}</div>
		<div>{team.losses}</div>
		<div>{team.points}</div>
	</div>
 </>
}