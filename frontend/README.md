# Real Estate Platform Frontend

A modern, fully-featured real estate platform built with React, Vite, and Tailwind CSS.

## Features

- **Multi-role Support**: Buyer, Agent, and Admin dashboards
- **Authentication**: JWT-based authentication with token refresh
- **Property Management**: Browse, search, filter, and manage properties
- **Favorites System**: Save properties to favorites (buyers)
- **Agent Tools**: Create, edit, and manage property listings
- **Admin Panel**: Approve agents and properties, manage users
- **Responsive Design**: Mobile-first design from 360px to 4K screens
- **Error Handling**: Comprehensive error states and loading skeletons
- **Toast Notifications**: Real-time user feedback

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- ES6+

## Setup

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env` file based on `.env.example`:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. Update `VITE_API_URL` in `.env` to point to your FastAPI backend:
   \`\`\`
   VITE_API_URL=http://localhost:8000/api
   \`\`\`

5. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
├── context/            # React context (Auth, Toast)
├── pages/              # Page components
│   ├── public/         # Public pages
│   ├── auth/          # Auth pages
│   ├── buyer/         # Buyer dashboard pages
│   ├── agent/         # Agent dashboard pages
│   └── admin/         # Admin dashboard pages
├── utils/             # Utility functions and API client
├── App.jsx            # Main app component
└── main.jsx           # Entry point
\`\`\`

## Key Components

- **Navbar**: Sticky navigation with user menu
- **PropertyCard**: Reusable property display component
- **FilterSidebar**: Advanced property filters
- **Pagination**: Page navigation for property listings
- **StatsCard**: Dashboard statistics display
- **Toast**: Global notification system
- **EmptyState**: User-friendly empty states
- **ErrorFallback**: Error boundary component

## Authentication Flow

1. User registers or logs in
2. API returns access_token and refresh_token
3. Tokens stored in localStorage
4. Access token added to Authorization header for all requests
5. Automatic token refresh on 401 response
6. Automatic logout on token refresh failure

## API Integration

All API endpoints are configured in `src/utils/api.js` with:
- Automatic token injection
- Automatic token refresh on expiration
- Proper error handling
- Request/response interceptors

## Environment Variables

\`\`\`
VITE_API_URL=http://localhost:8000/api
\`\`\`

## Deployment

To build for production:

\`\`\`bash
npm run build
\`\`\`

The build output will be in the `dist` folder.

## License

MIT
