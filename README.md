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

## Reflections

This was my first full-stack project and I learned a whole lot from it. I made a major decision of shifting
to ui components library and TailwindCSS from vanilla CSS. I feel that at some point we all have to move
on from vanilla CSS and explore what the dev community has to offer and explore tools actually used in production.

I will share the problems I faced and how I tackled them one by one:

### Issue 1: Initial Setup

The first and foremost issue here was how to going about making a full-stack web app. I explored and found
two major ways to go about this:

1. Create two separate repositories, one for frontend and another for backend.
2. Use monorepo approach, where both frontend and backend are part of the same repository.

There was also the handling of shared types between client and server to consider—types generated by prisma and types that were to be custom-defined. For a completely type-safe application, this was a very important factor to consider. I researched a lot before deciding on the best way forward.
Here are some of the options I found:

1. Creating a types package and publishing it and use in frontend and backend. This was an ideal approach in multi-repo setup.
2. I found out about stuff like tRPC, OpenAPI, GraphQL etc., but I decided against them since I didn't need any of those features and now wasn't the time to delve into these topics.
3. Creating a shared types package in monorepo alongside the frontend and backend packages. This was intuitive but I felt uncomfortable with the idea of having to import a type from outside the bounds of the frontend/backend.

While exploring the third option, I came across npm workspaces which allowed me to create a shared types package inside the root directory of the monorepo and then importing it wherever needed. This was exactly what I wanted!

In the end I narrowed my options down to either of the following approaches:
1. Using monorepo with npm workspaces
2. Using a types package published separately and use in multi-repo

I was excited about both of them, but decided to go with the monorepo approach this time and leave multi-repo for a future project.
I quickly set up the monorepo structure and created three packages: `frontend`, `backend`, and `shared`.

### Issue 2: TypeScript Configuration

This was probably the most challenging phase. Took me a while to figure out how to configure TS compiler correctly.
The way I had set things up initially kept throwing errors related to imports. 

I had to delve into TS docs and learn more about module resolution and module options and how they affect compile and
imports. The difference between the different options like `node16`, `nodenext`, `node`, `es2022`, `commonjs`, etc.

The cause of the issue? When I checked the compiled code in shared package, it was all in CommonJS format instead of ESM and hence the imports weren't getting resolved properly in backend which was set up in ESM.

Ultimately, the solution was to sync the `compilerOptions` for backend and shared packages which seemed to fix everything. The pre-configured settings for frontend worked fine without any changes.

### Issue 3: Creating query types from Prisma namespace

This took a while to wrap my head around. I found out that Prisma only generates types for models and not queries. It 
exports a namespace called `Prisma` which can be used to generate types for queries by simply somewhat mimic-ing the
syntax of the query itself. This project didn't require any complex queries so I didn't face much issues once I found
out about the namespace.

### Issue 4: Centralizing error handling in frontend akin to backend.

In my previous project, Shopping Cart, I used Redux Toolkit for the first time, but only the state management. I didn't
use any custom middlewares or async thunks, and I didn't initially intend to use them in this project.

I am, however, a big fan of how we can handle errors in express in one single place after throwing it anywhere in the entire application. Therefore, when I started with frontend, this was one of the things I really wanted to implement.

Therefore, I researched for ways to handle this and couldn't find much. There were Error boundaries but they only
handled UI errors, not API errors.  
Then I wondered if I could use Redux for error handling. After reading a lot of StackOverflow answers, I realized I
could use async thunks and middlewares for this purpose and for MUCH more. As a result, I decided to learn them for this project.
