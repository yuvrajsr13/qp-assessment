# Grocery Management API

This is a **Grocery Management API** built with **Node.js**, **Express**, **TypeScript**, and **SQLite**. It allows administrators to manage grocery items and users to view available groceries and place orders.

---

## **Features**

### **Admin Responsibilities**
- Add new grocery items to the system.
- View existing grocery items.
- Update details (e.g., name, price) of existing grocery items.
- Remove grocery items from the system.
- Manage inventory levels of grocery items.

### **User Responsibilities**
- View the list of available grocery items.
- Place an order for multiple grocery items in a single request.

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone <repo-url>
cd <repo-name>
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Start the Application**
Run the application in development mode:
```bash
npm run start
```

The application will be accessible at `http://localhost:3000`.

---

## **Database**

The application uses **SQLite** as the database. The database file (`database.sqlite`) will be automatically created in the project root when the application starts.

### **To Initialize the Database**
1. Start the application: `npm run start`.
2. The required tables will be created automatically using Sequelize.

---

## **API Documentation**

The API documentation is available via **Swagger UI** at:
```
http://localhost:3000/api-docs
```

---

## **Endpoints**

### **Admin Endpoints**
| Method | Endpoint               | Description                                      |
|--------|------------------------|--------------------------------------------------|
| POST   | `/admin/add`           | Add a new grocery item.                         |
| GET    | `/admin/view`          | View all grocery items.                         |
| PUT    | `/admin/update/:id`    | Update a grocery item by ID.                    |
| DELETE | `/admin/delete/:id`    | Delete a grocery item by ID.                    |
| PATCH  | `/admin/inventory/:id` | Update the inventory of a grocery item by ID.   |

#### **Sample Request (Add Grocery)**
```bash
curl -X POST 'http://localhost:3000/admin/add' \
-H 'Content-Type: application/json' \
-d '{
  "name": "Milk",
  "price": 50,
  "inventory": 10
}'
```

---

### **User Endpoints**
| Method | Endpoint             | Description                                     |
|--------|----------------------|-------------------------------------------------|
| GET    | `/user/available`    | View all available grocery items (inventory > 0). |
| POST   | `/user/order`        | Place an order for multiple grocery items.      |

#### **Sample Request (Place Order)**
```bash
curl -X POST 'http://localhost:3000/user/order' \
-H 'Content-Type: application/json' \
-d '{
  "items": [
    { "id": 1, "quantity": 2 },
    { "id": 4, "quantity": 1 }
  ]
}'
```

---

## **Swagger Documentation**

The project uses **Swagger** for API documentation, accessible at:
```
http://localhost:3000/api-docs
```

The documentation includes all endpoints, request/response schemas, and examples.

---

## **File Structure**

```
.
├── src
│   ├── config
│   │   ├── database.ts          # Database configuration
│   │   ├── swagger.ts           # Swagger configuration
│   ├── controllers
│   │   ├── adminController.ts   # Admin API logic
│   │   ├── userController.ts    # User API logic
│   ├── models
│   │   ├── grocery.ts           # Sequelize model for groceries
│   ├── routes
│   │   ├── adminRoutes.ts       # Admin route definitions
│   │   ├── userRoutes.ts        # User route definitions
│   ├── app.ts                   # Express app configuration
│   ├── server.ts                # Server entry point
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
├── Dockerfile                   # Builds and runs the app in a container
├── docker-compose.yml           # Manages app and services with Docker
├── .gitignore                   # Excludes unnecessary files from being tracked by Git
├── .dockerignore                # Prevents unwanted files from being included in the Docker image
```

---

## **Error Handling**

- **404 Not Found**: Returned for undefined routes.
- **500 Internal Server Error**: Returned for server-side errors.

---

## **Development**

### **Scripts**
| Script          | Description                                |
|------------------|--------------------------------------------|
| `npm run start`  | Start the application.                    |
| `npm run build`  | Compile TypeScript files to JavaScript.   |
| `npm run clean`  | Deletes the dist directory    |

### **To Run Locally**
```bash
npm install
npm run start
```

---

## **License**

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---