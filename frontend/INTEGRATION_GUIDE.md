# Integration Guide - Connecting to FastAPI Backend

This guide walks through connecting the RealEstate Pro frontend to your FastAPI backend.

## Step 1: Set API Base URL

In `js/helpers.js`, update the API_BASE_URL:

\`\`\`javascript
// Development
const API_BASE_URL = "http://localhost:8000/api"

// Production
const API_BASE_URL = "https://api.yourdomain.com"
\`\`\`

## Step 2: Authentication Flow

The frontend expects the following API responses:

### Register Response
\`\`\`json
{
  "message": "User created successfully",
  "user_id": "123",
  "role": "buyer"
}
\`\`\`

### Login Response
\`\`\`json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user_id": "123",
  "role": "buyer",
  "message": "Login successful"
}
\`\`\`

### Token Refresh Response
\`\`\`json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "message": "Token refreshed"
}
\`\`\`

## Step 3: Property Endpoints

All property endpoints should return data with this structure:

### Get Properties Response
\`\`\`json
{
  "properties": [
    {
      "id": 1,
      "title": "Beautiful House",
      "description": "A nice house",
      "price": 500000,
      "type": "house",
      "address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zip": "10001",
      "bedrooms": 3,
      "bathrooms": 2,
      "area": 1500,
      "year_built": 2020,
      "status": "approved",
      "created_at": "2024-01-15T10:00:00Z",
      "images": [
        {
          "id": 1,
          "url": "https://example.com/image1.jpg"
        }
      ],
      "agent": {
        "id": 1,
        "name": "John Smith",
        "email": "john@example.com",
        "phone": "+1234567890"
      },
      "amenities": ["Air Conditioning", "Pool"]
    }
  ],
  "total": 100,
  "limit": 12,
  "page": 1
}
\`\`\`

## Step 4: Admin Endpoints

### Pending Agents Response
\`\`\`json
{
  "agents": [
    {
      "id": 1,
      "name": "John Smith",
      "email": "john.smith@example.com",
      "license": "LIC-2024-001",
      "joinedDate": "2024-01-15",
      "status": "pending"
    }
  ]
}
\`\`\`

### Admin Dashboard Response
\`\`\`json
{
  "total_users": 156,
  "total_agents": 28,
  "total_properties": 342,
  "pending_approvals": 5,
  "platform_value": 125000000
}
\`\`\`

## Step 5: Error Handling

The frontend expects errors in this format:

\`\`\`json
{
  "message": "Invalid email or password",
  "detail": "User not found"
}
\`\`\`

## Step 6: CORS Configuration

Ensure your FastAPI backend has CORS enabled:

\`\`\`python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
\`\`\`

## Step 7: Testing the Integration

1. Start your FastAPI backend
2. Open the frontend in a browser
3. Test the registration flow
4. Verify login redirects to correct dashboard
5. Test property creation (as agent)
6. Test property approvals (as admin)

## Step 8: Handling Image Uploads

For the property image upload in the agent dashboard:

1. Frontend sends `FormData` with files to `/properties/{id}/upload`
2. Backend should return:

\`\`\`json
{
  "message": "Images uploaded successfully",
  "images": [
    {
      "id": 1,
      "url": "https://example.com/image1.jpg"
    }
  ]
}
\`\`\`

## Step 9: Token Refresh Flow

When a 401 response is received:
1. Frontend calls `POST /auth/refresh`
2. Backend returns new `access_token`
3. Frontend retries original request with new token

If refresh fails, user is redirected to login.

## Step 10: Mock to Real API

To transition from mock data to real API:

1. In each dashboard file (e.g., `js/buyer-dashboard.js`), replace mock functions with API calls
2. Example:

\`\`\`javascript
// Mock (before)
function getFavorites() {
  return {
    favorites: [...]
  }
}

// Real API (after)
async function getFavorites() {
  const response = await fetchAPI('/properties/favorites/me')
  return response
}
\`\`\`

## Common Issues & Solutions

### CORS Errors
- Verify backend has CORS middleware
- Check allowed origins in backend
- Ensure correct API URL in frontend

### 401 Unauthorized
- Check token is being stored correctly
- Verify token is included in headers
- Check token hasn't expired

### Image Upload Fails
- Ensure multipart/form-data is supported
- Check file size limits
- Verify image format is supported

### Form Validation Errors
- Frontend validates client-side
- Backend should validate server-side
- Return detailed error messages

## Production Deployment

1. **Build/Optimize**
   - Minify JavaScript
   - Optimize images
   - Set proper cache headers

2. **Environment Variables**
   - Set `REACT_APP_API_URL` to production API
   - Never commit sensitive data

3. **SSL/HTTPS**
   - Use HTTPS for all API calls
   - Ensure backend uses HTTPS

4. **Monitoring**
   - Log errors to monitoring service
   - Track API performance
   - Monitor user sessions

## NextSteps

After integration, consider:
- Adding unit tests
- Implementing error logging
- Setting up analytics
- Adding payment processing
- Implementing real-time notifications
