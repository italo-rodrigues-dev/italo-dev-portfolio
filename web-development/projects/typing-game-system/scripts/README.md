# Scripts Folder

This folder contains the main JavaScript and PHP scripts responsible for the game logic, database connection, authentication flow, page behavior, and backend structure of the Typing Game project.

The project was developed as the final assignment for the Web Development course and combines front-end interaction with PHP and MySQL integration.

Several scripts were created under time constraints during academic activities, focusing on functionality, organization, and modularization.

---

# Structure

```text
scripts/
│
├── database-config.php
├── database-connection.php
├── create-database.php
├── create-tables.php
├── logout-script.php
├── game-script.js
└── pages-script.js
```

---

# Scripts Description

## database-config.php

Stores database configuration constants such as:

- Database host
- Username
- Password
- Database name

Used as a centralized configuration file for backend scripts.

---

## database-connection.php

Responsible for creating the MySQL database connection using `mysqli`.

### Features

- UTF-8 charset configuration
- Connection validation
- Reusable database connection structure

---

## create-database.php

Creates the main project database automatically through PHP.

### Purpose

Although the project also includes `.sql` scripts for easier testing and recreation, this file was maintained because the course examples used PHP-based database creation.

### Concepts Used

- MySQL connection
- SQL execution with PHP
- Database initialization

---

## create-tables.php

Creates the required project tables if they do not already exist.

### Current Tables

- `users`

### Concepts Used

- SQL table creation
- Constraints
- Primary keys
- Auto increment
- Unique fields

---

## logout-script.php

Handles user logout and session destruction.

### Features

- Session cleanup
- Cookie invalidation
- Secure logout flow
- Redirect handling

### Concepts Used

- PHP sessions
- Authentication flow
- HTTP headers

---

## pages-script.js

Responsible for dynamic page behavior shared across the website.

### Main Features

#### Navigation System
- Dynamic header injection
- Automatic navigation generation
- Active page highlighting
- Reusable navigation structure

#### Path Management
- Relative path detection
- Automatic path correction between directories
- Shared navigation handling for root and subpages

#### Interface Behavior
- Dynamic DOM rendering
- Header component creation
- Version badge rendering

### Concepts Used

- DOM manipulation
- Dynamic rendering
- Event listeners
- Navigation logic
- Conditional rendering
- Path handling

---

## game-script.js

Main gameplay script responsible for the Typing Game mechanics.

This is the core of the project and controls gameplay state, interactions, movement, typing validation, level progression, scoring system, customer interaction, and interface updates.

### Main Features

#### Gameplay System
- Multi-level progression
- Dynamic order generation
- Restaurant interaction system
- Typing-based gameplay

#### Player Mechanics
- Character movement using keyboard
- Interaction detection
- Proximity calculations
- Collision boundary control

#### Customer System
- Procedural table generation
- Randomized customer dialogues
- Dynamic reviews and feedback

#### HUD and Interface
- Score tracking
- Orders counter
- Level progression display
- Dialogue rendering system

#### Typing Mechanics
- Real-time typing validation
- Accuracy verification
- Dynamic feedback system

### Concepts Used

- State management
- DOM manipulation
- Event-driven programming
- RequestAnimationFrame loop
- Procedural generation
- Collision and proximity calculations
- Dynamic rendering
- Object-oriented organization

---

# Notes

- Some scripts still contain variable names and comments in Portuguese because they were originally developed during academic activities.
- The project is gradually being refactored and documented in English.
- The primary focus during development was functionality, modularization, and gameplay flow.

---

# Future Improvements

Planned improvements include:

- Full internationalization of the codebase
- Better modular separation
- Save system integration
- Responsive improvements
- Sound effects and animations
- Database score integration
- Persistent login sessions
- Mobile support
- Difficulty scaling system