import { ClubItem  } from "../clubs"
import { MutableRefObject, useEffect, useRef } from "react";
import ClubsList from "./ClubsList";

interface ClubPickerProps {
	confirmCallback: (clubId: string) => void,
	cancelCallback: () => void,
	clubsList: [string, ClubItem][]
}

export default function ClubPicker({ confirmCallback, cancelCallback, clubsList }: ClubPickerProps) {

	const focusWindow: MutableRefObject<HTMLDivElement> = useRef(null!)

	useEffect(() => {
		focusWindow.current.focus()
	}, [])	

	return <>
		<div className="underlay"></div>
		<div tabIndex={0} ref={focusWindow} className="floating-window club-picker" onKeyDown={(event) => event.key === "Escape" && cancelCallback()}>
			<div className="title-header">
				<h3>Select Club</h3>
			</div>
			{ clubsList.length > 0 ?
				<ClubsList onClickHandler={confirmCallback} clubsList={clubsList}/>
			:
				<div className="clubs-list empty">All Clubs Participating</div>
			}
			<div className="buttons-container">
				<div className="close-window" onClick={cancelCallback}>Cancel</div>
			</div>
		</div>
	</>
}