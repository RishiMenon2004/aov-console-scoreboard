import { ClubItem } from "../clubs"

export default function ClubsList({clubsList, onClickHandler}: {clubsList: [string, ClubItem][], onClickHandler: (...args: any[]) => void}) {
	return <>
		<div className="clubs-list">
			{clubsList.map(([clubId, club]) => {
				return <div key={clubId} className="club-item" onClick={() => onClickHandler(clubId)} title={club.label}>
					<img src={club.icon} alt={club.label}/>
				</div>
			})}
		</div>
	</>
}