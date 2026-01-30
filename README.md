## 📌 Context Diagram

### Overview  
This system is a **Single Page Web Application (SPA)** that allows business users to manage retail pricing data.

Users can:
- Upload pricing data using CSV files (Store ID, SKU, Product Name, Price, Date)  
- Search pricing records using different criteria  
- Edit and save pricing records  

---

### System Interaction  

- The **User** interacts with the **Frontend SPA** to upload, search, and edit pricing data.  
- The **Frontend SPA** is designed to communicate with a **Backend API** for data operations.  
- The **Backend API** is responsible for validating CSV files and persisting data into a **Database**.  
- The **Database** stores all pricing information persistently and is accessed only through the backend API.  

Direct access to the database from the frontend is not allowed.

---

### Current Implementation Note  

For the current implementation, only the **frontend (SPA)** is developed.  
Pricing data is stored temporarily in **Redux state** and persisted using **browser local storage** for demonstration purposes.

The backend API and database are assumed components and are represented conceptually.  
The frontend is designed so that it can later be integrated with real backend APIs without major changes.

---

### Context Diagram (Text Representation)


User
  |
  v
Frontend SPA (React + TypeScript)
  |
  v
Redux - Backend API (assumed)
  |
  v
Redux/Local Storage - Database (assumed)
