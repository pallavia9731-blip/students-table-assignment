# 🎓 Students Table

A modern **React.js frontend application** for managing student records with full **CRUD operations**, live search, Excel export, and a polished dark UI.

---

## 🚀 Live Demo

https://students-table-assignment-b9ir.vercel.app/

---

## 📂 Repository

## https://github.com/pallavia9731-blip/students-table-assignment

## 🛠️ Tech Stack

| Technology        | Purpose                           |
| ----------------- | --------------------------------- |
| React.js          | UI framework                      |
| JavaScript (ES6+) | Application logic                 |
| CSS3              | Custom dark glassmorphism styling |
| xlsx              | Excel file generation             |
| file-saver        | File download trigger             |

---

## ✨ Features

- **Add Student** — form with full validation (name, email, age all required; valid email format enforced)
- **Edit Student** — pre-filled form, same validations apply
- **Delete Student** — confirmation dialog before removal
- **Live Search** — filters table by name or email in real time with highlighted matches
- **Success Alerts** — portal-based modal confirmation after add and edit actions
- **Excel Export** — exports current (filtered or full) list as `.xlsx`
- **Simulated Loading** — 3-second loading state with spinner on form submit
- **Navbar** — sticky navigation with Add Student, Students List, and Download Excel tabs
- **Responsive** — table layout on desktop, card layout on mobile

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/ABHI4570165/students-table.git

# 2. Navigate into the project
cd students-table

# 3. Install dependencies
npm install

# 4. Install required libraries
npm install xlsx file-saver

# 5. Start the development server
npm start
```

App runs at `http://localhost:3000`

---

## 📁 Project Structure

```
students-table/
├── src/
│   ├── App.js           # Root component — state, navbar, routing between tabs
│   ├── App.css          # Global styles
│   ├── StudentForm.js   # Add / Edit form with validation and loading state
│   ├── StudentTable.js  # Table, search, delete confirmation, Excel export
│   └── index.js         # React entry point
├── package.json
└── README.md
```

---

## 📊 Excel Export

Uses **xlsx** to convert student JSON data into a spreadsheet and **file-saver** to trigger the browser download.

- Exports filtered results when a search is active
- Exports all records when no search is applied
- Output file: `students.xlsx`

---

## ⚙️ How It Works

All data is managed in **React component state** (`useState`). No backend or database is required. Data resets on page refresh — this is intentional for the assignment scope.

CRUD flow:

- **Create** → validated form → 3s simulated load → student added to state → success alert
- **Read** → students rendered in table (desktop) or cards (mobile) with live search filtering
- **Update** → edit button pre-fills form → same validation → success alert on save
- **Delete** → confirmation modal via React Portal → removed from state

---

## 📜 License

Built for educational and assignment purposes.
