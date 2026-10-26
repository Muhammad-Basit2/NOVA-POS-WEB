# Nova POS

Fast, Offline Point of Sale & Inventory Management System — built with **Electron** and **SQLite**.

## Overview

Nova POS is a desktop application designed for retail cashier terminals. It runs 100% offline on Windows, featuring instant invoice printing, customer credit ledger tracking, SQLite-backed data persistence, and dynamic reporting with Excel export.

## Features

- **Offline-first** — zero downtime, no internet required
- **Customer Credit Ledger** — track and manage customer accounts
- **Instant Invoice Printing** — thermal printer support with auto-detection
- **Inventory Management** — add, edit, search, and bulk-import stock
- **Excel Import** — bulk create inventory from spreadsheet files
- **Dynamic Reporting** — real-time sales and stock reports
- **SQLite Reliability** — fast, portable, local database

## Tech Stack

| Layer       | Technology      |
|-------------|-----------------|
| UI          | HTML / CSS / JS |
| Runtime     | Electron        |
| Database    | SQLite          |
| Packaging   | Electron Builder|

## Project Structure

```
NOVA POS WEB/
├── css/style.css      # All styles
├── js/main.js         # Landing page JavaScript
├── index.html         # Marketing / download landing page
├── versions.json      # Release history & download URLs
├── dist/              # Compiled installer packages (gitignored)
├── .gitignore
└── README.md
```

> **Note:** The `dist/` folder contains large `.exe` installer binaries and is excluded from version control. Rebuild from source when needed.

## Getting Started

### Running the Landing Page

The `index.html` file serves as the public download page. Open it directly in any modern browser — no build step required.

### Building the Desktop App

Requires Node.js and npm.

```bash
# Install dependencies
npm install

# Build the Electron installer (produces dist/*.exe)
npm run build
```

### Releasing a New Version

1. Update `versions.json` with the new release entry
2. Build the installer (`npm run build`)
3. Commit the version bump and push
4. Tag the release: `git tag v1.0.3 && git push origin --tags`

## License

Licensed for commercial cashier & desktop retail terminals. All rights reserved.

## Support

- **Email:** muhammadbasit9274@gmail.com
- **Web:** 
