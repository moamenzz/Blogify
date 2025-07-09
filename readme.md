# Blogify

<div align="center">
<img src="/client/assets/readme-cover.png" alt="Demo Screenshot">
  
  <!-- Tech Stack -->
  
  <div>
  <img src="https://img.shields.io/badge/Javascript-3178C6?style=for-the-badge&logo=javascript&logoColor=yellow" alt="typescript" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="react" />
    <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="tailwind" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="vite" />
    <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="axios" />
    <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white" alt="zustand" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="node.js" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="express.js" />
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  </div>
</div>

<br />
<br />

[![Status](https://img.shields.io/badge/Status-Completed-green)]()
[![License](https://img.shields.io/badge/License-MIT-lightgrey)]()
[![Live Demo](https://img.shields.io/badge/Live-Demo-orange)](https://blogify319.vercel.app)

---

## 📖 Description

Blogify is a full-stack blogging platform that allows users to create, publish, and manage their own blog posts while exploring content from a vibrant community of writers. Users can write rich articles, upload cover images, and share their thoughts on any topic.

The platform also enables readers to browse, read, and engage with blogs from other users—fostering a space for inspiration, expression, and connection through written content.

---

## 🚀 Features

- 🔒 Authentication
- 📦 Full-Stack Application with Post Management/Upload Dashboard & User Interface
- 🌐 Fully responsive UI
- ⚙️ Deployment via Render + Vercel

---

## 🧠 What I Learned

This project challenged and taught me:

- ✅ React Quill

---

## 🔧 Technologies Used

| Frontend | Backend              | Database           | Other                  |
| -------- | -------------------- | ------------------ | ---------------------- |
| React    | Node.js (Express.js) | MongoDB (Mongoose) | JWT, Axios, Vite, etc. |

---

## 🖥️ Live Demo

🌐 [Click here to view the app](https://blogify319.vercel.app)

---

## 🧪 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/moamenzz/blogify.git

# Navigate to project folder
cd blogify

# Install dependencies for both frontend and backend
cd client && npm install
cd ../server && npm install

# Add .env files in both folders as per .env.example

# Run the project
npm start

```

## 🤫 .env.example

client .env:

```
VITE_BACKEND_API=
```

server .env:

```
PORT=
NODE_ENV=
MONGODB_URI=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```
