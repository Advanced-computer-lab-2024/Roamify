# Roamify 

Introducing our all-in-one travel platform designed to make your vacation planning effortless and exciting! Whether you’re dreaming of historic landmarks, relaxing beaches,
or family-friendly adventures, our app brings everything together for the perfect trip.

## Motivation

Planning a vacation can often feel overwhelming, with countless websites and apps needed to organize accommodations, activities, and itineraries. Our all-in-one travel platform was born out of the need to simplify this process and make vacation planning not just easy, but enjoyable. Whether you're a history buff exploring iconic landmarks, a beach lover seeking the perfect getaway, or a family searching for memorable adventures, our app consolidates all aspects of your trip into one seamless experience. With this platform, we aim to transform the way people plan vacations, making it stress-free and truly exciting.



## Tech Stack

- **Frontend**: React  
- **Backend**: Node.js, Express  
- **Database**: MongoDB  
- **Styling/UI**: Material-UI , Chakra-ui 
- **API Testing**: Postman  
## Features
- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Advanced-computer-lab-2024/Roamify/
   ```
2. Navigate to the project directory:

```bash
cd Roamify
```
3. Install dependencies for both servers:
For the frontend server:
```bash
cd Roamify-frontend
npm i
```
For the backend server:
```bash
cd backend
npm i
```

4. Start both servers:
For the frontend server:
```bash
cd Roamify-frontend
npm run dev
```
For the backend server:
```bash
cd backend
npm start

## API Reference
// Function to list all routes, including sub-routers
const listRoutes = (app) => {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Routes registered directly on app
      routes.push({
        method: Object.keys(middleware.route.methods)[0].toUpperCase(),
        path: middleware.route.path,
      });
    } else if (middleware.name === 'router') {
      // Routes added via app.use()
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          routes.push({
            method: Object.keys(handler.route.methods)[0].toUpperCase(),
            path: `${middleware.regexp.source.replace(/\\/g, '').replace('^', '').replace('\\/?$', '')}${handler.route.path}`,
          });
        }
      });
    }
  });

  // Log or return the routes
  console.log(routes);
  return routes;
};

const fs = require('fs');
const routes = listRoutes(app);
// Save routes to a file
fs.writeFileSync('routes.json', JSON.stringify(routes, null, 2), 'utf-8');

console.log('Routes saved to routes.json');

## Tests
The API was tested using **Postman** to ensure all endpoints function correctly. Below is an overview of the tests performed:

### **1. Authentication Tests**
- **Login Endpoint** (`POST /users/login`):
  - Test with valid credentials to ensure successful login.
  - Test with invalid credentials to verify proper error handling.

  Example:
  ```json
  Request Body:
  {
    "Username": "tourist1",
    "Password": "password123!"
  }

  Expected Response:
  {
    "token": "eyJhbGci...",
    "message": "Login successful"
  }

## How to Use
1. **Access the Application**

   - For local usage, run the application and navigate to `http://localhost:5173`.

2. **Create an Account or Log In**
   - If you are a new user:
     - Click on **Register**.
     - Fill in the registration form with your details.
     - Submit the form to create your account.
   - Existing users can log in with their credentials.

3. **Explore Features**
   - **Browse Products or Activities**:
    
   - **Manage Your Cart**:
   - **Book Events**:

   - **Wishlist**:
4. **Track Orders and Bookings**
5. **Update Your Profile**
6. **Log Out**
7. **Tips for Best Use**
   - Ensure a stable internet connection for a seamless experience.
   - For the best performance, use a modern web browser like Google Chrome, Firefox, or Edge.
   - Enable notifications to receive updates about bookings, orders, or special offers.

## Contributing
We welcome contributions to improve and enhance the application! Here’s how you can get involved:

1. **Report Issues**
   - If you encounter any bugs or have suggestions for improvements, please report them by creating an issue in the [GitHub repository](https://github.com/Roamify/issues).
2. **Submit Code**
   - Fork the repository.
   - Create a new branch for your feature or fix:
     ```bash
     git checkout -b feature-or-bugfix-branch-name
     ```
   - Commit your changes with clear, concise messages.
   - Push your branch:
     ```bash
     git push origin feature-or-bugfix-branch-name
     ```
   - Open a pull request detailing the changes and the purpose.
3. **Guidelines for Contributions**
   - Follow the **code style** used in the project (e.g., MVC structure for backend, proper component structuring for React).
   - Write clear comments to explain your code.
   - Ensure your changes are tested locally before submitting a pull request.
---
### **Code of Conduct**
By contributing, you agree to abide by our Code of Conduct, which ensures a respectful and welcoming environment for everyone.
---
We’re excited to collaborate with you to make this project even better!
## Credits

We would like to acknowledge the following for their contributions and support in building this project:

1. **Open-Source Libraries and Tools**
   - [React](https://reactjs.org/) - For building the user interface.
   - [Node.js](https://nodejs.org/) - For the backend framework.
   - [Express](https://expressjs.com/) - For routing and middleware.


2. **Online Resources**
   - Guides and examples from the [Stack Overflow](https://stackoverflow.com/) community.
   - YouTube tutorials by [Traversy Media](https://www.youtube.com/c/TraversyMedia) for React and Node.js guidance.


## License
[MIT](https://choosealicense.com/licenses/mit/)
[Server Side Public License (SSPL)](https://www.mongodb.com/licensing/server-side-public-license)
[Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

