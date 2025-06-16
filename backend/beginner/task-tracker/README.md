# TaskCLI 🗒️

A simple command-line task manager built with Node.js.

## 🚀 Installation & Initial Setup

1. Install dependencies:

```bash
npm install
```

2. Build the project:

```bash
npm run build
```

3. Make the CLI file executable:

```bash
chmod +x dist/TaskCli.js
```

4. Fix the import extension:  

In the `dist/TaskCli.js` file, add the `.js` extension to the TaskModel import (probably around line 11):  

```js
import TaskModel from './TaskModel.js';
```

5. (Optional) Make the command globally accessible by creating a symbolic link:

```bash
sudo ln -s $(pwd)/dist/TaskCli.js /usr/local/bin/taskcli
```

---

## 🛠️ Available Commands

### ➕ Add a Task

```bash
taskcli add "<task description>"
```

### 📜 List Tasks

List all tasks:

```bash
taskcli list
```

List tasks by status (`todo`, `in-progress`, `done`):

```bash
taskcli list <status>
```

Example:

```bash
taskcli list done
```

### 🔄 Update a Task

```bash
taskcli update <task id> "<new description>"
```

### 🗑️ Delete a Task

```bash
taskcli delete <task id>
```

### ✅ Change Task Status

Mark as **in progress**:

```bash
taskcli mark-in-progress <task id>
```

Mark as **done**:

```bash
taskcli mark-done <task id>
```

---

## 📦 Usage Example

```bash
taskcli add "Learn Node.js"
taskcli list
taskcli mark-in-progress 1
taskcli mark-done 1
taskcli delete 1
```

---

## 🧠 Notes

Task statuses can be:

- `todo`
- `in-progress`
- `done`

> This is a simple CLI project built with Node.js, intended for learning purposes.  
> It can be expanded with features like file/database persistence, filtering, and more.

### Project URL: https://roadmap.sh/projects/task-tracker
