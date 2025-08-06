import React, {useId} from "react";
import { File } from "./data";
import styles from "./styles.module.css";

interface FileRowProps {
	file: File;
	isChecked: boolean;
	onToggle: () => void;
};

export const FileRow = ({file, isChecked, onToggle}: FileRowProps) => {

	// Requirements are unclear, but assuming we shouldn't let the user select files that are not available to download
	const isSelectable = file.status === 'available';
	const checkboxSrText = isSelectable ? `Select file ${file.name} on device ${file.device}` : `File ${file.name} on device ${file.device} is not available for selection`;

	const checkboxId = useId();
	
	// Define the class names for the status cell based on the file's status
	const statusClasses = [
		styles.statusCell,
		isSelectable ? styles.statusAvailable : ''
	].join(' ');
	file.status === 'available' ? styles.statusAvailable : styles.statusScheduled;

	return (
		// Requirements do no indicate that rows should be clickable, so will rely on the checkbox for selection
		<tr className={`${isChecked ? styles.selected : ''} ${isSelectable ? styles.selectable : ''}`}>
			<td>
				<input 
					type="checkbox" 
					checked={isChecked}
					onChange={() => onToggle()}
					disabled={!isSelectable}
					name={file.name}
					id={checkboxId}
				/>
				<label htmlFor={checkboxId}><span className={styles.srOnly}>{checkboxSrText}</span></label>
			</td>
			<td>{file.name}</td>
			<td>{file.device}</td>
			<td>{file.path}</td>
			<td className={statusClasses}>{file.status}</td>
		</tr>
	);
};

FileRow.displayName = "FileRow";
