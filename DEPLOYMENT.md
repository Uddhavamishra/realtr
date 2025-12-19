# RealTrust - Full Stack Real Estate Application

A modern real estate application with a landing page and admin panel for managing projects, clients, contacts, and newsletter subscriptions.

## 🚀 Features

- **Landing Page**: Responsive design with hero section, services, projects showcase, testimonials, and contact form
- **Admin Panel**: Complete CRUD operations for projects, clients, contacts, and newsletter management
- **Image Upload**: Automatic image processing and cropping (450x350px)
- **Newsletter**: Email subscription system with duplicate prevention
- **Contact Forms**: Client inquiry management
- **MongoDB Integration**: Persistent data storage with MongoDB Atlas

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn package manager

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd realtrust
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🏃‍♂️ Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5000`.

## 📦 Production Build

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run build
```

The optimized production build will be created in the `frontend/build` directory.

## 🌐 Deployment

### Backend Deployment (e.g., Render, Railway, Heroku)

1. Set environment variables on your hosting platform:
   - `PORT` (usually auto-assigned)
   - `MONGODB_URI` (your MongoDB Atlas connection string)
   - `NODE_ENV=production`
   - `FRONTEND_URL` (your deployed frontend URL)

2. Deploy the `backend` directory

### Frontend Deployment (e.g., Vercel, Netlify, Render)

1. Set environment variable:
   - `REACT_APP_API_URL` (your deployed backend API URL)

2. Build command: `npm run build`
3. Publish directory: `build`

### Environment Variables

**Backend (.env):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/realtrust
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

**Frontend (.env):**
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## 📁 Project Structure

```
realtrust/
├── backend/
│   ├── middleware/       # Upload middleware with Sharp processing
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── uploads/         # Uploaded images
│   ├── server.js        # Express server
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Landing page and admin panel
│   │   ├── services/    # API configuration
│   │   └── App.js
│   └── package.json
└── README.md
```

## 🔧 Tech Stack

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- Multer & Sharp (image processing)
- CORS & dotenv

### Frontend
- React 18
- Tailwind CSS (CDN)
- Axios
- React Router DOM
- Lucide React (icons)
- React Toastify (notifications)

## 🎨 Design System

- Primary Color: Royal Blue (#2563EB)
- Action Color: Bright Orange (#F97316)
- Font: Poppins
- Image Processing: 450x350px, 90% JPEG quality

## 📝 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Clients
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Create new client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Contacts
- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create new contact
- `DELETE /api/contacts/:id` - Delete contact

### Newsletter
- `GET /api/newsletter` - Get all subscribers
- `POST /api/newsletter` - Subscribe email
- `DELETE /api/newsletter/:id` - Unsubscribe

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use `.env.example` files as templates
- Keep MongoDB credentials secure
- Use environment variables for all sensitive data
- Enable CORS only for trusted domains in production

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify your MongoDB Atlas connection string
- Ensure IP whitelist includes your deployment server
- Check if database name is included in connection string

### CORS Errors
- Update `FRONTEND_URL` in backend `.env`
- Verify CORS configuration in `server.js`

### Image Upload Issues
- Ensure `uploads/` directory exists
- Check file size limits (current: 5MB)
- Verify Sharp is properly installed

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For issues and questions, please open an issue on the GitHub repository.
