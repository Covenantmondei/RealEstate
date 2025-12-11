# RealEstate Pro - Frontend

A modern, fully responsive real estate platform frontend built with vanilla HTML, CSS (Tailwind), and JavaScript. Features role-based dashboards for buyers, agents, and admins with comprehensive property management capabilities.

## Project Structure

\`\`\`
/
├── index.html                 # Home page
├── properties.html            # Properties listing
├── property-detail.html       # Property details
├── login.html                 # Login page
├── register.html              # Registration page
├── dashboard/
│   ├── buyer.html            # Buyer dashboard
│   ├── agent.html            # Agent dashboard
│   └── admin.html            # Admin dashboard
├── css/
│   └── styles.css            # Global styles
├── js/
│   ├── helpers.js            # Utility functions & API configuration
│   ├── auth.js               # Authentication logic
│   ├── properties.js         # Properties API functions
│   ├── favorites.js          # Favorites API functions
│   ├── admin.js              # Admin API functions
│   ├── home.js               # Home page logic
│   ├── login.js              # Login page logic
│   ├── register.js           # Register page logic
│   ├── properties-listing.js # Properties listing logic
│   ├── property-detail.js    # Property detail logic
│   ├── buyer-dashboard.js    # Buyer dashboard logic
│   ├── agent-dashboard.js    # Agent dashboard logic
│   └── admin-dashboard.js    # Admin dashboard logic
└── public/
    └── images/               # Image assets
\`\`\`

## Features

### Public Pages
- **Home Page**: Hero banner, featured properties carousel, category browsing
- **Properties Listing**: Advanced filtering, grid/list view toggle, sorting, pagination
- **Property Detail**: Image gallery, property info, agent contact, similar properties
- **Authentication**: Secure login/register with role selection

### Buyer Dashboard
- **Overview**: Favorite count, account status, member since
- **My Favorites**: Saved properties with management
- **Profile Settings**: Personal info, address, preferences, password change

### Agent Dashboard
- **Overview**: Active listings, total views, pending approvals, revenue stats
- **My Properties**: Property management table with edit/delete
- **Create Property**: Multi-step form with image upload

### Admin Dashboard
- **Overview**: Platform statistics and quick actions
- **Pending Agents**: Agent approval/rejection workflow
- **Pending Properties**: Property approval/rejection workflow
- **User Management**: User suspension/activation, role filtering
- **Activity Logs**: Audit trail of system activities

## API Integration

Update the `API_BASE_URL` in `js/helpers.js` to point to your FastAPI backend:

\`\`\`javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api"
\`\`\`

### Required Endpoints

**Authentication**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Token refresh
- `GET /auth/verify-email?token=` - Email verification

**Properties**
- `GET /properties/all` - Get all properties with filters
- `GET /properties/{property_id}` - Get property details
- `POST /properties/create` - Create new property
- `PUT /properties/{property_id}/update` - Update property
- `DELETE /properties/{property_id}/delete` - Delete property
- `POST /properties/{property_id}/upload` - Upload property images
- `GET /properties/agent/me` - Get agent's properties

**Favorites**
- `POST /properties/{property_id}/favorite` - Add to favorites
- `DELETE /properties/{property_id}/unfavorite` - Remove from favorites
- `GET /properties/favorites/me` - Get user's favorites

**Admin**
- `GET /admin/dashboard` - Admin dashboard stats
- `GET /admin/agents/pending` - Pending agent approvals
- `POST /admin/agents/approve` - Approve agent
- `POST /admin/agents/reject` - Reject agent
- `GET /admin/properties/pending` - Pending property approvals
- `POST /admin/properties/approve` - Approve property
- `POST /admin/properties/reject` - Reject property
- `GET /admin/users` - Get all users
- `POST /admin/users/suspend` - Suspend user
- `POST /admin/users/{user_id}/unsuspend` - Activate user
- `GET /admin/activity-logs` - Get activity logs

## Authentication

The frontend uses JWT tokens stored in localStorage:
- Tokens are automatically refreshed every 30 minutes
- Token refresh is triggered on 401 responses
- All authenticated requests include the `Authorization: Bearer <token>` header

## Form Validation

All forms include client-side validation:
- Email format validation
- Password strength (minimum 8 characters)
- Password confirmation matching
- Required field validation
- Real-time error messages

## Features Implemented

### Navigation & Layout
- Sticky navbar with role-based navigation
- Mobile-responsive design (360px to 4K)
- Footer with links and information
- Breadcrumb navigation

### Property Management
- Grid/List view toggle
- Advanced filtering (location, type, price, bedrooms, bathrooms)
- Property sorting (newest, price ascending/descending)
- Pagination with smart page buttons
- Image gallery slider
- Responsive image gallery

### Dashboard Features
- Tab-based navigation
- Role-based content rendering
- Loading states and skeletons
- Toast notifications
- Modal dialogs for confirmations
- Form validation and error handling

### User Experience
- Smooth animations and transitions
- Loading indicators
- Toast notifications (success, error, info)
- Empty states with helpful messaging
- Responsive form layouts
- Mobile-friendly navigation

## Styling

The project uses:
- **Tailwind CSS v4** for utility-based styling
- **Custom CSS** for animations and complex styles
- **CSS variables** for theming (in globals.css)
- **Responsive design** with mobile-first approach

## Installation & Running

### Option 1: Direct File Usage
1. Download all files
2. Serve via a local web server (required for fetch API)
3. Update `API_BASE_URL` in `js/helpers.js`

### Option 2: Using Node.js/npm
1. Create a `package.json` file
2. Install dependencies: `npm install`
3. Use a dev server like `http-server` or Vite

### Option 3: Deploy to Vercel
1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variable: `REACT_APP_API_URL`
4. Deploy with one click

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Environment Variables

Set these in your deployment platform:

\`\`\`env
REACT_APP_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000 (if using Supabase)
\`\`\`

## Security Notes

- All API calls are made with proper CORS headers
- Sensitive data (passwords) are never logged
- JWT tokens are stored in localStorage (consider upgrading to httpOnly cookies)
- Form inputs are validated before submission
- Email addresses are validated client-side

## Performance

- Lazy loading of images
- Efficient DOM manipulation
- Minimal JavaScript bundle
- Responsive images
- Optimized CSS with Tailwind

## Future Enhancements

- Advanced search with map integration
- Real-time property notifications
- Video tours for properties
- Agent reviews and ratings
- Saved searches
- Price alerts
- CRM for agents
- Analytics dashboard

## Support

For issues or questions about the frontend:
1. Check the browser console for errors
2. Verify API endpoints are correct
3. Ensure backend is running
4. Check network tab in DevTools

## License

MIT License - Feel free to use this template for your projects
