import React, {useState} from "react";
import { File } from "./data";

interface FileRowProps {
	file: File;
	isChecked: boolean;
	onToggle: () => void;
};

export const FileRow = ({file, isChecked, onToggle}: FileRowProps) => {
	// Requirements are unclear, but assuming we want to allow selection only for all files, but only downloard available files.
	// const isSelectable = file.status === 'available';

	return (
		<tr>
			<td>
				<input 
					type="checkbox" 
					checked={isChecked}
					onChange={() => onToggle()}
					aria-label={`Select file ${file.name} on device ${file.device}`}
				/>
			</td>
			<td>{file.name}</td>
			<td>{file.device}</td>
			<td>{file.path}</td>
			<td>{file.status}</td>
		</tr>
	);
};

FileRow.displayName = "FileRow";
