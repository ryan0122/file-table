import React from "react";
import { File } from "./data";

interface FileRowProps {
	file: File;
};

export const FileRow = ({file}: FileRowProps) => {
	return (
		<tr>
			<td>{file.name}</td>
			<td>{file.device}</td>
			<td>{file.path}</td>
			<td>{file.status}</td>
		</tr>
	);
};

FileRow.displayName = "FileRow";
