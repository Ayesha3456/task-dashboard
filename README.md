# 🗂️ Task Management Dashboard

A simple Kanban-style task management app where users can add, view, and move tasks between statuses. Data is persisted using a mock API (JSON Server).

## 🚀 Features

- View tasks in three columns: To Do, In Progress, Done
- Create new tasks via a modal form
- Drag and drop tasks between columns
- Data persistence using REST API (JSON Server)

## 🛠️ Technologies

- Angular
- Bootstrap
- JSON Server for mock REST API

🔧 Run the app
bash
Copy
Edit
# Start JSON Server
npx json-server --watch db.json --port 3000

# Start frontend
ng serve  # or npm start for React
📁 API Endpoints (Mock)
GET /tasks

POST /tasks

PUT /tasks/:id

DELETE /tasks/:id

yaml
Copy
Edit

---

## ✅ 4. Add a Self-Evaluation Document

Create a file named `SELF-EVALUATION.md` in the root.

### 📝 Example `SELF-EVALUATION.md`:

```markdown
# ✅ Self-Evaluation: Task Management Dashboard

## 🔹 Summary

This project is a simple Kanban-style task dashboard that allows users to manage tasks visually. The core features like viewing, adding, and dragging tasks work as expected. The UI is responsive and uses Bootstrap for layout. JSON Server is used to persist task data.

## 🔹 Self-Criticism

- I didn't add authentication or multi-user support.
- Form validation can be improved further.

## 🔹 Improvements

- Add task priority and due dates.
- Implement filtering/sorting.
- Improve accessibility (keyboard drag & drop).
- Add animations for smoother UX.

## 🔹 Technology Rating (Out of 10)

| Technology        | Rating |
|-------------------|--------|
| Angular/React     | 8/10   |
| REST API (JSON)   | 9/10   |
| Bootstrap/Styling | 8/10   |
| Drag & Drop       | 7/10   |

## 📦 Installation

```bash
git clone https://github.com/YOUR_USERNAME/task-dashboard.git
cd task-dashboard
npm install
