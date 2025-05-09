"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@testing-library/react");
require("@testing-library/jest-dom");
describe('App Component', function () {
    test('renders header with correct version', function () {
        (0, react_1.render)(/ >);
        expect(react_1.screen.getByRole('banner')).toHaveTextContent('AI Agent Workflow Orchestrator v3.9.5');
    });
    test('renders in workflow view by default', function () {
        (0, react_1.render)(/ >);
        expect(react_1.screen.getByRole('navigation')).toBeInTheDocument();
        expect(react_1.screen.getByRole('main')).toBeInTheDocument();
    });
    test('handles global copy action', function () {
        var mockClipboard = {
            writeText: jest.fn()
        };
        Object.assign(navigator, {
            clipboard: mockClipboard
        });
        (0, react_1.render)(/ >);
        var globalCopyButton = react_1.screen.getByRole('button', { name: /copy global/i });
        react_1.fireEvent.click(globalCopyButton);
        expect(mockClipboard.writeText).toHaveBeenCalled();
        expect(react_1.screen.getByText('Copied global workflow JSON.')).toBeInTheDocument();
    });
    test('renders ARIA live region', function () {
        (0, react_1.render)(/ >);
        expect(react_1.screen.getByRole('status')).toBeInTheDocument();
    });
});
