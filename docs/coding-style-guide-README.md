# Style Guide & Developer File Splitting Instructions

## File Splitting Overview:

When you receive this issue, you are responsible for splitting the component into the following files and following
these conventions:

- **{component}.style.ts**: All styled-components. Co-locate all styled-components here and only here.
- **{component}.tsx**: The presentational component. Should import from .style and .types only.
- **{component}.types.tsx**: All types and interfaces for the component.
- **{componentTool}.service.ts**: Any service, utility, or helper functions used specifically for this component.
- **utils.ts**: Shared functions, e.g., formatting, validation, etc.
- **SVG Asset Files**: Each SVG must be exported as a separate, optimized, and validated asset file (e.g.,
  IconName.svg). Remove unnecessary tags/attributes. icons go in icons

## Codesandbox Check:

Before submission, ensure the split files work as a self-contained unit by placing component.tsx code into App.tsx on
codesandbox.io and verifying proper UI rendering and no errors.

## GitHub Storage:

Store all files in the designated folder on GitHub. Use the prescribed file naming convention and folder structure.

## Summary Report:

After splitting, write a summary that includes:

- What was split and into which files
- Any refactoring or optimizations made
- SVG assets generated
- Results of codesandbox verification
- Any issues or blockers

# Issue Body Content EXAMPLE

## Style Guide & Developer Instructions

Please strictly follow the below steps:

### File Splitting

1. component.style.ts – Styled Components
2. component.tsx – Main Component
3. component.types.tsx – Types/Interfaces
4. componentTool.service.ts – Component-specific services/utilities
5. utils.ts – Shared helpers
6. SVGs (as individual .svg files, optimized/validated)

### Codesandbox Verification

- Ensure everything works as a self-contained unit (App.tsx)

### GitHub Storage

- Upload all files into the corresponding GitHub folder, named as specified.

### Summary Report Required on Submission

- Summarize your process, findings, and any known issues.

Full file content to split below:
(insert code here)

## Summary Report Example

### Files Created:

- FancyButton.style.ts (6 styled components)
- FancyButton.tsx
- FancyButton.types.tsx (2 interfaces)
- FancyButtonTool.service.ts (1 service function)
- utils.ts (refactored 1 shared helper)
- FancyIcon.svg (optimized, 1 SVG asset)

### Refactoring Done:

- Broke large render() into subcomponents
- Removed inline styles in favor of styled-components

### Codesandbox Verification:

- Passed, no errors/warnings

### Blockers:

- None

## Workflow Trigger (Raw JSON Example)

```json
{
  "workflowId": "create_github_styleguide_splitIssue_and_review_001",
  "ownerAgentId": "Reqqy",
  "createdAt": "2024-06-17T12:00:00Z",
  "lastTriggeredAt": "2024-06-17T12:00:00Z",
  "triggeredBy": "Compass",
  "active": true,
  "workflowStatus": {
    "step001_collect_instructions": {
      "status": "success"
    },
    "step002_create_issue_with_full_file": {
      "status": "waiting" 
    },
    "step003_split_files_and_codesandbox_test": {
      "status": "waiting"
    },
    "step004_store_to_github": {
      "status": "waiting"
    },
    "step005_write_summary_report_and_review_issue": {
      "status": "waiting"
    }
  },
  "workflowIO": {
    "input": {
      "inputType": "markdown",
      "systemPrompt": "Create a tracked GitHub issue instructing the developer to split the provided component according to the strict file structure and style guide (see markdown), verify in Codesandbox, store to GitHub, then summarize and create a review issue.",
      "userPrompt": "You must include the ENTIRE file in the issue body. Follow the specified splitting and style guidelines for files and SVGs. After storing to GitHub, summarize the work done and generate a review issue (summary in body).",
      "requiredInputs": [
        "component file/content",
        "GitHub repo/folder", 
        "SVG assets (if present)"
      ],
      "intent": "Issue creation and QA for standardized React component splitting, storage, and review."
    },
    "output": {
      "output": "Tracked issue created; instructions and style guide included; file stored; summary review issue generated for QA.",
      "outputType": "text",
      "intent": "Developer receives clear tasking, reviewer receives summary and links to the output files."
    }
  },
  "stopLoop": "true",
  "final_output": "Issue created for component splitting per style guide, Codesandbox tested, stored to GitHub, and summary report/QA review issue generated."
}
