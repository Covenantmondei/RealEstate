# 🏠 Real Estate API

A comprehensive RESTful API for managing real estate property listings, built with FastAPI, SQLAlchemy, and Cloudinary for image management. This platform enables agents to list properties and buyers to browse, search, and save their favorite properties.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Models](#database-models)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Usage Examples](#usage-examples)
- [Development](#development)
- [Contributing](#contributing)

## ✨ Features

### User Management
- **Dual Role System**: Users can register as Buyers or Agents
- **Email Verification**: Secure email verification using JWT tokens
- **Authentication**: JWT-based authentication with access and refresh tokens
- **Agent Profiles**: Agents can create and update detailed profiles

### Property Management (Agents Only)
- **Create Listings**: Agents can create detailed property listings
- **Image Upload**: Multiple image uploads via Cloudinary integration
- **Update/Delete**: Full CRUD operations for property management
- **Property Dashboard**: View all properties listed by the agent

### Property Discovery (All Users)
- **Browse Properties**: View all available properties
- **Advanced Filtering**: Filter by city, state, property type, listing type, price range, bedrooms, and bathrooms
- **Property Details**: View comprehensive property information with images
- **Favorites System**: Save properties to favorites for later viewing
- **Search Functionality**: Search properties with multiple parameters

### Image Management
- **Cloudinary Integration**: Secure cloud-based image storage
- **Multiple Images**: Upload multiple images per property
- **Primary Image**: Automatic primary image assignment
- **Image Ordering**: Organized image display

## 🛠 Tech Stack

- **Framework**: FastAPI 0.123.3
- **Database**: SQLite (SQLAlchemy ORM)
- **Authentication**: JWT (python-jose)
- **Password Hashing**: Passlib with bcrypt
- **Image Storage**: Cloudinary
- **Email Service**: FastAPI-Mail with SMTP
- **Validation**: Pydantic v2
- **Server**: Uvicorn

## 📁 Project Structure
