const { authenticate } = require("../middleware/authMiddleware");
const routes = require("../routes");

const setupRoutes = (app) => {
    routes.forEach(({ path, route, role }) => {
        if (role) {
            app.use(path, authenticate(role), route);  // Role-based authentication
        } else {
            app.use(path, route);
        }
    });
};

module.exports = setupRoutes;
