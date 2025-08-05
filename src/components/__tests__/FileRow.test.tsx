import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FileRow } from '../FileRow';
import { File } from '../data';
import '@testing-library/jest-dom';

describe('FileRow Component', () => {
	const file: File = {
	    name: 'netsh.exe',
	    device: 'Luigi',
	    path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
	    status: 'available'
	};

	it('renders file details', () => {
	    render(<table><tbody><FileRow file={file} isChecked={false} onToggle={() => {}} /></tbody></table>);
	    expect(screen.getByText('netsh.exe')).toBeInTheDocument();
	    expect(screen.getByText('Luigi')).toBeInTheDocument();
  	});

	it('checkbox toggles correctly', () => {
	    const toggleMock = jest.fn();
	    render(<table><tbody><FileRow file={file} isChecked={false} onToggle={toggleMock} /></tbody></table>);
	    const checkbox = screen.getByRole('checkbox');
	    fireEvent.click(checkbox);
	    expect(toggleMock).toHaveBeenCalled();
    });
});