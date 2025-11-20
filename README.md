🌐 User Management System 🧩
A Complete CRUD Web App using Node.js, Express, MySQL & Vanilla JS
 🎯 Purpose

This project is built to **demonstrate a full-stack CRUD (Create, Read, Update, Delete) system** where users can:
    - ✍️ Create new user data (name, address, company)
    - 👁️ View all user records
    - ✏️ Edit existing users
    - 🗑️ Delete users by ID

It’s a simple yet **real-world example** of how the frontend and backend interact through **API endpoints**, forming the core of many web applications.

⚙️ How It Works (Overview)

🖥️ Frontend
    - Built with **HTML, CSS, and JavaScript**.  
    - The UI has 4 main sections — Create, List, Edit, and Delete.  
    - Each section is shown dynamically using `displayForm()` in `Script.js`.  
    - `fetch()` is used to communicate with the backend REST API.
💾 Backend
    - Built using **Node.js** and **Express.js**.
    - **MySQL** is used as the database for persistent storage.
    - Uses `cors`, `express.json()`, and `express.urlencoded()` to handle frontend requests.

🧱 Project Files
  File-Description
`index.html` :- Main webpage with buttons and forms for each CRUD operation
`Style.css` :- Contains UI design (colors, layout, flexbox, and shadows)
`Script.js` :- Handles form actions, fetch requests, and dynamic section display
`app.js` :- Node.js backend: connects to MySQL and defines API routes

🚀 Features Breakdown

1️⃣ Create User
🟢 Adds a new record to MySQL using the `/adduser` route.  
Data includes:
    - `name`
    - `address`
    - `company`
2️⃣ List Users
🔵 Fetches and displays all records in a table using the `/list` route.

3️⃣ Edit User
🟡 Updates existing data using the `/edit/:id` route (HTTP PUT request).

4️⃣ Delete User
🔴 Deletes a record using the `/deleteuser` route (HTTP POST with ID).

Backend Logic (app.js)

🧠 The backend:
- Connects to MySQL at port `3308`
- Defines tables: `customer`, `address`, `company`
- Handles routes for:
  - `/create-table` → Create DB tables  
  - `/adduser` → Insert a new user  
  - `/list` → Show all users  
  - `/edit/:id` → Update an existing user  
  - `/deleteuser` → Delete a user  
📦 Uses middlewares:
```js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
┌────────────────────────────┐
│     USER MANAGEMENT        │
├────────────────────────────┤
│ [Create] [List] [Edit] [Delete] │
│                                │
│  → Form fields appear by action │
│  → Data fetched and shown in table │
└────────────────────────────┘
customer(customer_id, name)
address(address_id, customer_id, address)
company(company_id, customer_id, company)
