import { MutableRefObject, ReactNode, useEffect, useRef } from "react"

interface FloatingWindowProps {
	cancelCallback: (...args: unknown[]) => unknown,
	confirmCallback?: (...args: unknown[]) => unknown,
	title: string,
	children: ReactNode
}

export default function FloatingWindow({ cancelCallback, confirmCallback, title, children}: FloatingWindowProps) {

	const focusWindow: MutableRefObject<HTMLDivElement> = useRef(null!)

	useEffect(() => {
		focusWindow.current.focus()
	}, [])	

	return <>
		<div className="underlay"></div>
		<div tabIndex={0} ref={focusWindow} className="floating-window club-picker" onKeyDown={(event) => event.key === "Escape" && cancelCallback()}>
			<div className="title-header">
				<h3>{title}</h3>
			</div>
			{children}
			<div className="buttons-container">
				{confirmCallback && <div className="confirm-window" onClick={confirmCallback}>Confirm</div>}
				<div className="close-window" onClick={cancelCallback}>Cancel</div>
			</div>
		</div>
	</>
}