# Poké-Inventory: A Pokémon Inventory Application

This is a mock inventory application where you can perform CRUD (Create, Read, Update, Delete) operations on pokémon and trainers.

[Live Preview](shopping-cart-two-ruddy.vercel.app)  
**If you want to perform a delete operation,**  
**please do so by creating a new trainer/pokémon and deleting that.**

## Tech Stack
 - React
 - Redux-Toolkit
 - shadcn/ui
 - react-select
 - Tailwind CSS
 - NodeJS
 - Express.js
 - PostgreSQL
 - Prisma ORM
 - TypeScript
 - npm workspaces

## Features

- Centralized client-side error handling, loading, state, and notification management using Redux custom middlewares and async thunks
- Centralized server-side error handling using Express middleware
- Perform CRUD operations on pokémon and trainers
- Monorepo setup with npm workspaces
- Shared types package for exporting Prisma generated types, and other types required across server & client
- Theme toggle for dark/light/system mode managed via redux state
- Client-side routing using `react-router` v7
- shadcn/ui components
- react-select for multi-select component
- Responsive design
- Skeleton loading
