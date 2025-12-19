# RealTrust - Full Stack Real Estate Application

A full-stack application with a landing page and admin panel for managing projects, clients, contact forms, and newsletter subscriptions.

## Tech Stack

- **Frontend**: React.js with JavaScript
- **Backend**: Node.js with Express.js
- **Database**: MongoDB Atlas
- **Image Processing**: Sharp (for automatic image cropping)

## Features

### Landing Page
- Hero section with call-to-action
- **Our Projects** - Display projects fetched from backend
- **Happy Clients** - Display client testimonials fetched from backend
- **Contact Form** - Submit inquiries to backend
- **Newsletter Subscription** - Subscribe to newsletter
- Responsive footer with social links

### Admin Panel
- Dashboard with statistics
- **Project Management** - Add, edit, delete projects with images
- **Client Management** - Add, edit, delete client testimonials
- **Contact Forms** - View all contact form submissions
- **Newsletter Subscribers** - View and export subscriber list

### Additional Features
- **Automatic Image Cropping** - Images are automatically cropped to 450x350 pixels when uploaded

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### 1. Configure MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Update the `.env` file in the backend folder

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file and update MONGODB_URI with your MongoDB Atlas connection string
# Example: mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/realtrust

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (multipart/form-data)
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Clients
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Create client (multipart/form-data)
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Contacts
- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Submit contact form
- `DELETE /api/contacts/:id` - Delete contact

### Newsletter
- `GET /api/newsletter` - Get all subscribers
- `POST /api/newsletter` - Subscribe to newsletter
- `DELETE /api/newsletter/:id` - Unsubscribe



## Usage

1. Start both backend and frontend servers
2. Visit `http://localhost:3000` for the landing page
3. Click "Admin Panel" button or visit `http://localhost:3000/admin` for admin access
4. Use the admin panel to:
   - Add projects (they will appear in "Our Projects" section)
   - Add clients (they will appear in "Happy Clients" section)
   - View contact form submissions
   - View newsletter subscribers

## Image Cropping

All images uploaded through the admin panel are automatically:
- Cropped to 450x350 pixels
- Centered on the main subject
- Converted to JPEG format
- Optimized with 90% quality

This ensures consistent image sizes across the website.

## Screenshots

### Landing Page
- Modern hero section with gradient background
- Project cards with hover effects
- Client testimonial cards with quote icons
- Contact form with icon inputs
- Newsletter subscription section
- Responsive footer

### Admin Panel
- Clean sidebar navigation
- Dashboard with statistics cards
- Data tables with action buttons
- Modal forms for adding/editing content

