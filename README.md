# HCVA Card Reader Script

This repository contains JavaScript code for handling health card validation and extraction (HCVA) processes. It is specifically designed to support HCVA page functionalities, including reading and processing information from card swipes, displaying user messages, and enhancing accessibility and user experience.

## Project Overview

This script is part of the HCVA system used for securely extracting health-related information from card swipes. The code captures, processes, and verifies data from health card readers. The project was initially reported with issues by users who provided sample health cards and card readers to test and troubleshoot the code. Following the fixes, this code was successfully deployed to production.

## Key Features

- **Health Number and Version Code Extraction**: Automatically extracts the health number and version code from card swipes and displays them in designated input fields.
- **Dynamic Event Handling**: Monitors keystrokes and responds to specific key inputs (e.g., `%`, `;`, `^`) to control the flow of data extraction and prevent unintended actions.
- **User Interface Controls**:
  - Prevents double submissions on forms.
  - Disables cut, copy, paste, and print screen for enhanced security.
  - Auto-focuses on error messages and other significant elements for accessibility.
- **Accessibility Enhancements**:
  - Adds ARIA roles to alert messages, making them screen reader-friendly.
  - Automatically sets focus on error or warning messages.
- **Responsive UI Features**:
  - Unhides Material Icons after a delay to prevent screen reader interruptions.
  - Closes the application after confirmation, with restricted menu options for controlled browsing.

## Usage

### Core Functionality

- **Card Reader Input**: The main function (`stringExtraction`) captures data from a card swipe and extracts key information such as the health number and version code.
- **Event Listeners**: The script contains several event listeners that:
  - Track keystrokes for card data.
  - Prevent unintended actions (e.g., cut, copy, paste).
  - Manage dynamic display of icons and focus on messages.
- **Error Handling**: Ensures that errors are highlighted and focuses on them for a better user experience.

### Testing

- Use the provided test health cards and card readers to simulate real-world usage.
- Verify the extraction of the health number and version code in respective fields.

## Known Issues and Fixes

**Reported Issue**: The code initially failed to capture and extract health numbers accurately. Users encountered issues with real-time data validation and focus management.

**Fixes Implemented**:
- Added enhanced string extraction logic to improve data accuracy.
- Integrated focus management and accessibility features to support all users, including those using assistive technologies.
- Finalized code adjustments, resolving all reported issues and successfully pushing the script to production.

## Accessibility

This code has been designed to follow best practices in web accessibility, including screen reader support, ARIA roles, and focus management for dynamic content.
