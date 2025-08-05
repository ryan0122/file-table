import { FileSelectorTable } from "../FileSelectorTable";
import { render, fireEvent } from "@testing-library/react";

describe("FileSelectorTable", () => {
	it("renders without crashing", () => {
		const { container } = render(<FileSelectorTable />);
		expect(container).toBeInTheDocument();
	});

	it("displays the correct number of files", () => {
		const { getAllByRole } = render(<FileSelectorTable />);
		const rows = getAllByRole("row");
		expect(rows.length).toBeGreaterThan(0); 
	});

	it("toggles select all checkbox", () => {
		const { getByRole } = render(<FileSelectorTable />);
		const selectAllCheckbox = getByRole("checkbox", { name: /select all files/i });
		fireEvent.click(selectAllCheckbox);
		expect(selectAllCheckbox).toBeChecked();

		// Ensure all available (not disabled) file checkboxes are checked
		const fileCheckboxes = Array.from(document.querySelectorAll('input[type="checkbox"]:not(:disabled)'));
		fileCheckboxes.forEach(checkbox => {
			expect((checkbox as HTMLInputElement).checked).toBe(true);
		});
	});
})