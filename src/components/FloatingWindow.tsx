import { MutableRefObject, useEffect, useRef } from "react"

interface FloatingWindowProps {
	cancelCallback: (...args: unknown[]) => unknown,
	confirmCallback?: (...args: unknown[]) => unknown,
}

export default function FloatingWindow({ cancelCallback, confirmCallback}: FloatingWindowProps) {

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
			<div className="buttons-container">
				{confirmCallback && <div className="confirm-window" onClick={confirmCallback}>Confirm</div>}
				<div className="close-window" onClick={cancelCallback}>Cancel</div>
			</div>
		</div>
	</>
}