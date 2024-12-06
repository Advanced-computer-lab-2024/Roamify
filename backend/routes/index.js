const userRoutes = require("./userRoutes");
const touristRoutes = require("./touristRoutes");
const adminRoutes = require("./adminRoutes");
const tourGuideRoutes = require("./tourGuideRoutes");
const advertiserRoutes = require("./advertiserRoutes");
const sellerRoutes = require("./sellerRoutes");
const tourismGovernorRoutes = require("./tourismGovernorRoutes");
const productRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes");
const itineraryRoutes = require("./itineraryRoutes");
const activityRoutes = require("./activityRoutes");
const categoryRoutes = require("./categoryRoutes");
const historicalTagRoutes = require("./historicalTagRoutes");
const preferenceTagRoutes = require("./preferenceTagRoutes");
const placesRoutes = require("./placesRoutes");
const complaintRoutes = require("./complaintRoutes");
const exchangeRateRoutes = require("./exchangeRateRoutes");
const flightRoutes = require("./flightRoutes");
const hotelRoutes = require("./hotelRoutes");
const resetPasswordRoutes = require('./resetPasswordRoutes');
const notificationRoutes = require('./notificationRoutes');
const wishlistRoutes = require("./wishlistRoutes");
const addressRoutes = require("./addressRoutes");
const orderRoutes = require("./orderRoutes");
module.exports = [
    { path: "/api/user", route: userRoutes },
    { path: "/api/tourist", route: touristRoutes, role: ["tourist"] },
    { path: "/api/tourguide", route: tourGuideRoutes, role: ["tourGuide"] },
    { path: "/api/advertiser", route: advertiserRoutes, role: ["advertiser"] },
    { path: "/api/seller", route: sellerRoutes, role: ["seller"] },
    { path: "/api/tourismgovernor", route: tourismGovernorRoutes, role: ["tourismGovernor"] },
    { path: "/api/admin", route: adminRoutes, role: ["admin"] },
    { path: "/api/cart", route: cartRoutes, role: ["tourist"] },
    { path: "/api/wishlist",route:wishlistRoutes, role: ["tourist"] },
    { path: "/api/product", route: productRoutes },
    { path: "/api/itinerary", route: itineraryRoutes },
    { path: "/api/activity", route: activityRoutes },
    { path: "/api/category", route: categoryRoutes },
    { path: "/api/preference-tag", route: preferenceTagRoutes },
    { path: "/api/historical-tag", route: historicalTagRoutes },
    { path: "/api/places", route: placesRoutes },
    { path: "/api/complaint", route: complaintRoutes },
    { path: "/api/exchange-rate", route: exchangeRateRoutes },
    { path: "/api/flights", route: flightRoutes, role: ['tourist'] },
    { path: "/api/notifications", route: notificationRoutes, role: ['advertiser', 'tourGuide', 'seller', 'admin'] },
    { path: "/api/hotels", route: hotelRoutes, role: ['tourist'] },
    { path: "/api/reset-password", route: resetPasswordRoutes },
    { path: "/api/address", route: addressRoutes, role: ['tourist'] },
    { path: "/api/order", route: orderRoutes, role: ['tourist'] }
];
