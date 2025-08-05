import React from "react";
import { sampleData } from "./data";
import { FileRow } from "./FileRow";

export const FileSelectorTable = ({files = sampleData}) => {
	return (
		<div>
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
						<FileRow key={index} file={file} />
					))}
				</tbody>
			</table>
		</div>
	);
};

FileSelectorTable.displayName = "FileSelectorTable";

