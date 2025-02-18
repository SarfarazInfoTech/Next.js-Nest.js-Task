# Next.js & Nest.js Task

This repository contains a **full-stack web application** built using **Nest.js** for the backend and **Next.js** for the frontend.

## 🌍 Live Demo

See this project in live action:

- **Backend**: [Nest.js API](https://nest-js-task.onrender.com/menus)
- **Frontend**: [Next.js App](https://next-js-nest-js-task.vercel.app/)

---

## 📂 Project Structure

```
Next.js-Nest.js-Task/
│-- nestjs-backend/    # Backend (Nest.js)
│-- nextjs-app/        # Frontend (Next.js)
```

## 🚀 Technologies Used

- **Backend**: Nest.js, PostgreSQL, Prisma ORM, TypeScript
- **Frontend**: Next.js, React, Tailwind CSS
- **Database**: PostgreSQL
- **API Communication**: REST API

---

## 📌 Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/SarfarazInfoTech/Next.js-Nest.js-Task.git
cd Next.js-Nest.js-Task
```

---

## 🔹 Backend Setup (Nest.js)

### 📥 Install Dependencies

```bash
cd nestjs-backend
npm install
```

### 🛠 Configure Environment Variables

Create a **.env** file in the `nestjs-backend` folder and add your database credentials:

```env
DATABASE_URL="postgresql://menu_management_db_xabb_user:1ZBhQao5TeNe45zk3CyDsbhZUSBkUm62@dpg-cuqcrmtds78s739b6b8g-a.oregon-postgres.render.com/menu_management_db_xabb?schema=public"
PORT=3000
```

### 📌 Run Migrations

```bash
npx prisma migrate dev --name init
```

### ▶ Start the Server

```bash
npm run start:dev
```

The backend will be running on `http://localhost:3000`

---

## 🔹 Frontend Setup (Next.js)

### 📥 Install Dependencies

```bash
cd ../nextjs-app
npm install
```

### 🛠 Configure Environment Variables

Create a **.env.local** file in the `nextjs-app` folder and set the API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/menus
```

### ▶ Start the Development Server

```bash
npm run dev
```

The frontend will be running on `http://localhost:3001`

---

## 🔗 API Endpoints (Backend) 

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | `/menus`     | Get all menus       |
| POST   | `/menus`     | Create a new menu   |
| GET    | `/menus/:id` | Get menu by ID      |
| PUT    | `/menus/:id` | Update menu details |
| DELETE | `/menus/:id` | Delete menu         |

---

## 🎯 Features

✅ **Backend**: REST API with Nest.js, PostgreSQL, Prisma ORM\
✅ **Frontend**: Next.js app with Tailwind UI\
✅ **Authentication** (if applicable)\
✅ **CRUD Operations**

---

## 🤝 Contributing

Feel free to create a pull request if you want to improve this project.

---

## 📝 License

This project is licensed under the **MIT License**.

---

🚀 **Developed by Sarfaraz**

