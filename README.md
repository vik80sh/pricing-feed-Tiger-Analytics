## Context Diagram

### Overview  
This system is a **Single Page Web Application (SPA)** that helps users manage retail pricing data.

Users can:
- Upload pricing data using CSV files (Store ID, SKU, Product Name, Price, Date)  
- Search pricing records using different filters  
- Edit and save pricing records 


### System Interaction  

- The **User** uses the **Frontend SPA** to upload files, search data, and update prices.  
- The **Frontend SPA** is built to work with a **Backend API** for saving and loading data.  
- The **Backend API** will check the uploaded CSV files and store the data in a **Database**.  
- The **Database** keeps all pricing data safely and can only be accessed through the backend API.  

The frontend does not talk directly to the database.


### Current Implementation Note  

In the current version, only the **frontend (SPA)** is implemented.  
Pricing data is stored in **Redux** and saved in **browser Local Storage** so it is not lost when the page is refreshed.

The backend API and database are not implemented yet and are shown only as part of the design.  
The frontend is built in a way that it can later connect to real backend APIs without major changes.


### Context Diagram 

```
User
|
v
Frontend SPA (React + TypeScript)
|
v
State Management (Redux)
|
v
Local Storage (Browser - Current Implementation)

Future Integration:
Redux → Backend API → Database

```


## Solution Architecture
-----------------------
### Overview

The application is a **Single Page Application (SPA)** built with **React and TypeScript**.  
It separates UI, state management, and data handling to keep the code clean and easy to maintain.

In the current version, the app is **frontend-only** with no backend service.  
CSV files are processed in the browser and the data is stored using **Redux** and **browser Local Storage**.

The design allows a backend to be added later without major changes to the frontend.

---

### High-Level Architecture

```
User
|
v
Frontend SPA (React + TypeScript)
|
v
State Management (Redux)
|
v
Local Storage (Browser - Current Implementation)

Future Integration:
Redux → Backend API → Database

```


### Component Responsibilities

- **Frontend SPA:**  
  Handles CSV upload, shows pricing data, and allows search and edit.

- **Redux:**  
  Stores pricing data and UI state in one place.

- **Local Storage:**  
  Saves data in the browser so it is not lost on refresh (demo only).



### Future Backend Integration

In a real system:
- Data will be stored using a backend API and database.
- The frontend will load only required data using APIs (with paging and filtering).


### Key Benefits

- Clean separation of UI and data  
- Easy to add backend later  
- Type-safe data with TypeScript  
- Suitable for demo and future extension  

---
##  Design Decisions

- **React (SPA):**  
  Chosen because the requirement asks for a Single Page Application. React is well-suited for building interactive UI with file upload, tables, and search features.

- **TypeScript:**  
  Used to define clear data models for pricing records and reduce runtime errors. It improves code readability and long-term maintainability.

- **Redux (State Management):**  
  Used to manage pricing data and UI state in one central place. It also prepares the application for future backend integration where Redux can store API responses instead of local data.

- **Local Storage (Current Implementation):**  
  Used to persist data across browser refresh since no backend is implemented. This is suitable for demo and small datasets only.

- **CSV Upload on Frontend:**  
  Implemented on the frontend to handle file reading, parsing, and basic validation. The same logic can later be reused when a backend service is added.

- **Future Backend Ready:**  
  The architecture is designed so Local Storage can be replaced with Backend APIs and a database without changing most of the UI logic.

---


## Non-Functional Requirements

For a retail chain with around 3000 stores across multiple countries, the system should meet the following non-functional requirements:

### Performance
- The system should respond quickly when searching and updating pricing data.  
- In the current frontend-only version, this works for small datasets.  
- In production, performance will be handled by backend APIs with pagination and filtering.

### Scalability
- The system should support growth in number of stores, products, and pricing records.  
- The design allows moving from browser storage to a backend database without changing much of the frontend code.


### Reliability
- Pricing data should not be lost and should remain consistent.  
- In production, data will be stored in a backend database instead of browser storage.

### Security
- Pricing data should be protected from unauthorized access.  
- In production, access will be controlled using authentication and secure APIs.

### Maintainability
- The system should be easy to update and enhance.  
- The use of React, TypeScript, and Redux helps keep the code modular and easy to maintain.

### Usability
- The application should be easy for business users to upload, search, and edit pricing data.  
- A simple and clean user interface is provided for these operations.

---

## Assumptions

- Users will upload pricing data in a valid CSV format with the following fields:  
  Store ID, SKU, Product Name, Price, and Date.

- The current implementation is frontend-only and does not include a backend service or database.

- Pricing data stored in Redux and browser Local Storage is meant only for demonstration and small datasets.

- In a real production system, pricing data will be stored in a backend database and accessed through secure APIs.

- Users are assumed to be business or admin users who have permission to upload and manage pricing data.

- Basic validation (such as required fields and correct data types) is sufficient for this implementation.

- The application is designed so that it can later be integrated with backend services without major changes to the frontend code.
