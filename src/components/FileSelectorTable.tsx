import React, {useEffect, useRef, useState} from "react";
import { File, sampleData } from "./data";
import { DownloadIcon  } from "./DownloadIcon";
import { FileRow } from "./FileRow";
import styles from "./styles.module.css";

export const FileSelectorTable = ({files = sampleData}) => {
	const [selected, setSelected] = useState<File[]>([]);	
	const toggleAllInput = useRef<HTMLInputElement>(null);
	
	
	const downloadableFiles = files.filter((f) => f.status === 'available');
	const isAllSelected = selected.length === downloadableFiles.length;
	const isIndeterminate = selected.length > 0 && !isAllSelected;
	const selectAllText = isAllSelected ? "Unselect All Files" : "Select All Files";
	const selectedText = selected.length === 0 ? "None selected" : `Selected ${selected.length}`;

 	useEffect(() => {
	    if (toggleAllInput.current) {
	      toggleAllInput.current.indeterminate = isIndeterminate;
	    }
  	}, [isIndeterminate]);


	const handleDownloadSelected = () => {
		
		const fileList = selected.map(file => `Device: ${file.device}, Path: ${file.path}`).join(", ");
		const alertMessage = `Downloading the following file${selected.length > 1 ? 's' : ''}: ${fileList}`;
		
		alert(alertMessage);
	};

	const handleToggleAll = () => {
	
		if (toggleAllInput.current?.checked) {
			// If the toggleAllInput is checked, select all files
			setSelected(downloadableFiles);
		} else {
			// If the toggleAllInput is unchecked, clear all selections
			setSelected([]);
		}
	};

	const handleToggleSingle = (file: File) => {
		setSelected(prevSelected => {
			// If the current vaalue is already selected, remove it; otherwise, add it.
			if (prevSelected.includes(file)) {
				return prevSelected.filter(fileName => fileName !== file);
			} else {
				// Spread the previous state and add the new file name
				return [...prevSelected, file];
			}
		}); 	
	};

	return (
		<div className={styles.fileSelector}>
			<div className={styles.toolbar}>
				<div>
					<input name="selectAllInput" aria-describedby="selectTextElem" aria-label={selectAllText} checked={isAllSelected} type="checkbox" onChange={handleToggleAll} ref={toggleAllInput} />
					<span id="selectTextElem" aria-live="polite" aria-atomic="true">{selectedText}</span>	
				</div>
				
				<button disabled={selected.length === 0} onClick={handleDownloadSelected}>
					<span>{<DownloadIcon />}</span>
					Download Selected
				</button>
			</div>
			<table className={styles.fileSelectorTable}>
				<caption className={styles.srOnly}>
				 	File list. Only files with status “Available” can be selected.
				</caption>
				<thead>
					<tr>
						<th scope="col">
							<span className={styles.srOnly}>Select Files</span>
						</th>
						<th scope="col">Name</th>
						<th scope="col">Device</th>
						<th scope="col">Path</th>
						<th scope="col">Status</th>
					</tr>
				</thead>
				<tbody>
					{files.map((file, index) => (
						<FileRow 
							key={index} 
							file={file} 
							isChecked={selected.includes(file)}
							onToggle={() => handleToggleSingle(file)}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

FileSelectorTable.displayName = "FileSelectorTable";

