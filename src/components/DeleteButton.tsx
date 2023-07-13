import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FloatingWindow from "./FloatingWindow";
import { useState } from "react";

interface DeleteButtonProps {
	deleteFunction: () => void
}

export default function DeleteButton({ deleteFunction }: DeleteButtonProps) {

	const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)

	return <>
		<div className="button delete" onClick={() => setIsConfirmDeleteOpen(true)}>
			<FontAwesomeIcon icon={faTrash}/>
		</div>
		{isConfirmDeleteOpen && <FloatingWindow title="Delete Fixture" confirmCallback={() => {
			deleteFunction()
			setIsConfirmDeleteOpen(false)
		}} cancelCallback={() => setIsConfirmDeleteOpen(false)}>
			<div style={{padding: "1rem", fontSize: "1.25rem"}}>Are you sure you want to delete this fixture?</div>
		</FloatingWindow>}
	</>
}