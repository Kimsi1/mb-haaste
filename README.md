# MB-Haaste

**Simple full stack application for testing people applying for Mad Booster**

Application manages list of customers and contacts. `Express` server provides records over `REST API` for frontend written with `react`, bootstrapped with `vite`. `Redux` is used for state management and styles with good ol' `bootstrap`



---
## My solution

- Refactored the file structure

    - Separated Database to its own folder

    - Moved Backend tests to their own folder

    - Moved Frontend components, hooks, pages and slices to their own folder

- Did the `MB-TODO` tasks

- Started to work on Mocha / Chai tests for Backend

- Fixed various bugs and misspellings in the code

- Created a way to add new customer contacts

- Added comments to the code

- And more! Download the project and try it.


## Prerequisites

[Node.js v18](https://nodejs.org/en/download/current)

---

## Setup

```bash
# Fork or clone the project
git clone https://github.com/Kimsi1/mb-haaste
cd mb-haaste
npm install
# On separate windows/tabs
# Starts server with `nodemon` on http://localhost:3100
npm run dev --workspace backend
# Starts react app with `vite` on http://localhost:3000
npm run dev --workspace frontend

# Search project for `MB-TODO` comments and start exploring
```
---
