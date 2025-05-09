import {render, screen, fireEvent} from '@testing-library/react';
import App from '../src/App';
import '@testing-library/jest-dom';

describe('App Component', () => {
    test('renders header with correct version', () => {
        render(<App / >);
        expect(screen.getByRole('banner')).toHaveTextContent('AI Agent Workflow Orchestrator v3.9.5');
    });

    test('renders in workflow view by default', () => {
        render(<App / >);
        expect(screen.getByRole('navigation')).toBeInTheDocument();
        expect(screen.getByRole('main')).toBeInTheDocument();
    });

    test('handles global copy action', () => {
        const mockClipboard = {
            writeText: jest.fn()
        };
        Object.assign(navigator, {
            clipboard: mockClipboard
        });

        render(<App / >);
        const globalCopyButton = screen.getByRole('button', {name: /copy global/i});
        fireEvent.click(globalCopyButton);

        expect(mockClipboard.writeText).toHaveBeenCalled();
        expect(screen.getByText('Copied global workflow JSON.')).toBeInTheDocument();
    });

    test('renders ARIA live region', () => {
        render(<App / >);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });
});