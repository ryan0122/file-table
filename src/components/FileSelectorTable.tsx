import React, {useEffect, useRef, useState} from "react";
import { sampleData } from "./data";
import { FileRow } from "./FileRow";

export const FileSelectorTable = ({files = sampleData}) => {
	const [selected, setSelected] = useState<string[]>([]);	
	const toggleAllInput = useRef<HTMLInputElement>(null);
	const isAllSelected = selected.length === files.length;
	const isIndeterminate = selected.length > 0 && !isAllSelected;

 	useEffect(() => {
	    if (toggleAllInput.current) {
	      toggleAllInput.current.indeterminate = isIndeterminate;
	    }
  	}, [isIndeterminate]);


	const handleDownloadSelected = () => {
	
	};

	const handleToggleAll = () => {
	
		if (toggleAllInput.current?.checked) {
			// If the toggleAllInput is checked, select all files
			setSelected(files.map(file => file.name));
		} else {
			// If the toggleAllInput is unchecked, clear all selections
			setSelected([]);
		}

	};

	const handleToggleSingle = (name: string) => {
		setSelected(prevSelected => {
			// If the current vaalue is already selected, remove it; otherwise, add it.
			if (prevSelected.includes(name)) {
				return prevSelected.filter(fileName => fileName !== name);
			} else {
				// Spread the previous state and add the new file name
				return [...prevSelected, name];
			}
		}); 	
	};

	return (
		<div className="file-selector">
			<div>
				<input checked={isAllSelected} type="checkbox" onChange={handleToggleAll} ref={toggleAllInput} />
				<button onClick={handleDownloadSelected}>Download Selected</button>
			</div>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Device</th>
						<th>Path</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{files.map((file, index) => (
						<FileRow 
							key={index} 
							file={file} 
							isChecked={selected.includes(file.name)}
							onToggle={() => handleToggleSingle(file.name)}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

FileSelectorTable.displayName = "FileSelectorTable";

