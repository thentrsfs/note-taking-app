# 📝 Note Taking App

A fully functional and responsive note-taking web application built with **Next.js**, **React**, **Tailwind CSS**, **TypeScript**, and **Supabase**. This project was developed as part of a front-end/full-stack challenge, focusing on modern UI design, accessibility, and full CRUD functionality.

## 🚀 Features

- ✅ Create, read, update, and delete notes
- 📦 Archive and unarchive notes
- 🏷️ Add tags and filter notes by tag
- 🔍 Search notes by **title**, **tag**, and **content**
- 🌈 Select between multiple **color themes**
- 🔤 Switch between different **font themes**
- 📱 Fully responsive layout across all devices
- ♿ 100% keyboard navigability and accessibility
- ⚠️ Form validation with clear user feedback
- 🖱️ Hover and focus states for all interactive elements
- 💾 **Bonus**: Data persistence with **Supabase**
- 🔐 **Bonus**: Full **authentication** (sign up, login, logout, password reset)

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **UI Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **State Management**: React Context API
- **Deployment**: [Vercel](https://vercel.com/)

## 📷 Screenshots

| Home Page | Create Note | Dark Theme |
|-----------|-------------|------------|
| ![](/public/images/note-app-login-dark.png) | ![](/public/note-app-home-light.png) | ![](/public/note-app-home-dark.png) |

## 🧪 Functionality Overview

### Notes
- Each note supports:
  - Title
  - Content
  - Tags
  - Last edited timestamp
- Notes can be:
  - Archived
  - Deleted
  - Edited

### Tags
- Users can view all available tags
- Clicking a tag filters notes by that tag

### Search
- Real-time search support across:
  - Title
  - Tags

### Theming
- Switch between light/dark themes
- Choose from multiple font styles

### Authentication (Bonus)
- Sign up, log in, and log out
- Password reset via email
- Protected routes for authenticated users only

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/thentrsfs/note-taking-app.git
cd note-taking-app

```
### 2. Install dependencies
```bash
npm install
```
### 3. Configure environment variables

Create a .env.local file in the root and add your Supabase keys:

``` bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
### 4.Run the app locally
``` bash
npm run dev
```
Visit http://localhost:3000 in your browser.


