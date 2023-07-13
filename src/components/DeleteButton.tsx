import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FloatingWindow from "./FloatingWindow";

interface DeleteButtonProps {
	deleteFunction: () => void
}

export default function DeleteButton({ deleteFunction }: DeleteButtonProps) {
	return <>
		<div className="button delete" onClick={}>
			<FontAwesomeIcon icon={faTrash}/>
		</div>
		<FloatingWindow />
	</>
}