# Roamify: Your All-in-One Travel Planner

Introducing our all-in-one travel platform designed to make your vacation planning effortless and exciting! Whether you’re dreaming of historic landmarks, relaxing beaches, or family-friendly adventures, our app brings everything together for the perfect trip.

## Motivation

Planning a vacation can often feel overwhelming, with countless websites and apps needed to organize accommodations, activities, and itineraries. Our all-in-one travel platform was born out of the need to simplify this process and make vacation planning not just easy, but enjoyable. Whether you're a history buff exploring iconic landmarks, a beach lover seeking the perfect getaway, or a family searching for memorable adventures, our app consolidates all aspects of your trip into one seamless experience. With this platform, we aim to transform the way people plan vacations, making it stress-free and truly exciting.

## Build Status

**Current State: Partially Functional with Known Limitations**

### Known Issues and Missing Features

As Roamify is actively under development, we aim to be transparent about its current limitations to manage expectations and ensure clarity for users and contributors. Below is a list of identified issues and missing functionalities that are affecting the system:

- **Tour Guide Features**:
    - Inability to create, read, or update profiles with comprehensive details like previous work and experience.

- **Account Deletion**:
    - The feature allowing users (Tourist/Tour Guide/Advertiser/Seller) to request account deletion is currently not available.

- **Admin Features**:
    - Missing functionality to add another admin to the system.

- **Tourism Management**:
    - Incomplete features for creating and updating details of museums and historical places.

- **Reporting Tools**:
    - Sellers cannot view sales reports detailing revenue.
    - Tour Guides and Advertisers lack access to reports showing the total number of tourists using their services.

- **Moderation Tools**:
    - Admins cannot flag activities as required.

- **User Guidance**:
    - Missing comprehensive step-by-step guide for tourists on starting their vacation.

- **Feedback and Interaction**:
    - Tourists are currently unable to rate, comment on tour guides, itineraries, or events they attended.

- **Historical Data**:
    - Tourists cannot view past activities or itineraries they paid for.

- **Notification System**:
    - The system does not support notifications for events booking start, nor does it send reminders for upcoming events via the app or email.
    - Missing functionality for birthday promo code distribution via email and system notifications.
    - Sellers do not receive notifications when products are out of stock.

- **Loyalty and Rewards**:
    - The system does not currently track or award loyalty points for payments made for events or itineraries.

- **Product Management**:
    - Missing ability for sellers to archive or unarchive products.

We are actively working to address these issues and plan to roll out updates in the upcoming releases. Our team appreciates your patience and support as we strive to enhance Roamify's capabilities and reliability.

### Development Roadmap

We are prioritizing these issues based on their impact and the frequency of feedback from our users. If you encounter any problems or have suggestions, please report them via our GitHub issues page or contact our support team directly.

## Code Style

Roamify adheres to best practices in software development to ensure a clean, maintainable, and scalable codebase. Here's a detailed overview of our code style and architectural choices:

### Architecture

- **Model-View-Controller (MVC)**: Our backend is structured following the MVC pattern. This approach separates data modeling, business logic, and user interface concerns, making the codebase more organized and maintainable.
- **Component-Based Architecture**: The frontend utilizes React's component-based architecture, allowing for reusable UI components. This modularity enhances the maintainability and scalability of the user interface.

### Coding Standards

- **JavaScript/ES6+**: We leverage modern JavaScript features, employing ES6+ syntax for cleaner and more efficient code.
- **Indentation and Formatting**: Uniform use of 2 spaces for indentation across all JavaScript and JSX files. We utilize Prettier as an automated code formatter to maintain consistent style.
- **Naming Conventions**:
    - **Variables and Functions**: Use camelCase for identifiers.
    - **Classes and React Components**: Use PascalCase.
    - **Constants**: Defined in UPPER_CASE.
- **Comments and Documentation**: Extensive commenting is encouraged, especially for complex logic. Major functions and components are documented using JSDoc to clarify purpose and usage.

### Code Reviews

- **Pull Requests**: Changes to the codebase are submitted through pull requests, each requiring at least one peer review to ensure adherence to coding standards and overall quality.
- **Linting**: ESLint is configured to enforce coding standards and prevent common errors. It runs automatically as part of our continuous integration process.

This structured approach to coding and architecture ensures that Roamify's codebase remains robust, readable, and easy to navigate for both current developers and new contributors.

## Screenshots

### Screenshot 1
![Screenshot 1](https://github.com/Advanced-computer-lab-2024/Roamify/blob/main/Screenshots/SC%201.png)

### Screenshot 2
![Screenshot 2](https://github.com/Advanced-computer-lab-2024/Roamify/blob/main/Screenshots/SC%202.png)

### Screenshot 3
![Screenshot 3](https://github.com/Advanced-computer-lab-2024/Roamify/blob/main/Screenshots/SC%203.png)

### Screenshot 4
![Screenshot 4](https://github.com/Advanced-computer-lab-2024/Roamify/blob/main/Screenshots/SC%204.png)

### Screenshot 5
![Screenshot 5](https://github.com/Advanced-computer-lab-2024/Roamify/blob/main/Screenshots/SC%205.png)

### Screenshot 6
![Screenshot 6](https://github.com/Advanced-computer-lab-2024/Roamify/blob/main/Screenshots/SC%206.png)

### Screenshot 7
![Screenshot 7](https://github.com/Advanced-computer-lab-2024/Roamify/blob/main/Screenshots/SC%207.png)


## Tech Stack

Roamify leverages a diverse set of technologies to deliver a robust and user-friendly platform. Here's a breakdown of our technical stack:

### Frontend

- **React**: Powers the interactive elements of our user interface, ensuring a responsive and dynamic user experience.
- **Bootstrap & Tailwind**: Utilized for styling and layout, these frameworks help in creating a modern and mobile-responsive design.

### Backend

- **Node.js**: Provides the runtime environment for our backend.
- **Express**: A web application framework for Node.js, used to build our server-side logic including RESTful APIs.
- **CronJob & Agenda**: Used for scheduling tasks that need to run periodically or at specific times.

### Database

- **MongoDB**: A NoSQL database used to store and retrieve data dynamically, enhancing performance and scalability.

### Styling/UI

- **Material-UI & Chakra-ui**: These libraries provide a comprehensive suite of UI tools and components that adhere to modern design principles, enabling us to craft aesthetically pleasing interfaces.

### API Testing

## Testing Tool
API testing was conducted using Postman, a popular tool for API development and testing.

Click the [link](https://app.getpostman.com/join-team?invite_code=e6395d034c2526948a9c1387583c1f5859bf9df77e69803a0e89ea020a3148e7&target_code=6b3dec255fefd7f8a1ba0379edbed9ec) to join the shared Postman workspace for testing.

## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform

## API Reference
# API Routes Documentation

| Method  | Endpoint                                              | Description                                    |
|---------|-------------------------------------------------------|------------------------------------------------|
| POST    | /api/user/create-user                                 | Create a new user                              |
| POST    | /api/user/login                                       | User login                                     |
| POST    | /api/user/change-password                             | Change user password                          |
| POST    | /api/user/upload-documents                            | Upload user documents                         |
| PUT     | /api/user/accept-reject-terms-and-conditions          | Accept or reject terms and conditions         |
| DELETE  | /api/user/delete-account                              | Delete user account                           |
| POST    | /api/tourist/create-profile                           | Create a tourist profile                      |
| GET     | /api/tourist/get-profile                              | Get tourist profile                           |
| GET     | /api/tourist/get-wallet                               | Get tourist wallet information                |
| PUT     | /api/tourist/update-profile                           | Update tourist profile                        |
| POST    | /api/tourist/book-itinerary                           | Book an itinerary                             |
| POST    | /api/tourist/book-place                               | Book a place                                  |
| DELETE  | /api/tourist/cancel-place                             | Cancel a booked place                         |
| POST    | /api/tourist/book-activity                            | Book an activity                              |
| PUT     | /api/tourist/select-preferences                       | Select tourist preferences                    |
| POST    | /api/tourist/book-transportation                      | Book transportation                           |
| DELETE  | /api/tourist/cancel-itinerary-booking                 | Cancel itinerary booking                      |
| DELETE  | /api/tourist/cancel-activity-booking                  | Cancel activity booking                       |
| DELETE  | /api/tourist/cancel-transportation-booking            | Cancel transportation booking                 |
| GET     | /api/tourist/get-booked-transportations               | Get all booked transportations                |
| GET     | /api/tourist/get-all-booked-activities                | Get all booked activities                     |
| GET     | /api/tourist/get-all-booked-places                    | Get all booked places                         |
| GET     | /api/tourist/get-all-booked-itineraries               | Get all booked itineraries                    |
| GET     | /api/tourist/get-all-upcoming-booked-itineraries      | Get all upcoming booked itineraries           |
| GET     | /api/tourist/get-all-upcoming-booked-activities       | Get all upcoming booked activities            |
| GET     | /api/tourist/get-all-transportation                   | Get all available transportation              |
| GET     | /api/tourist/view-points-level                        | View tourist points level                     |
| GET     | /api/tourist/view-total-refunds                       | View total refunds                            |
| PUT     | /api/tourist/redeem-points                            | Redeem points                                 |
| GET     | /api/tourist/get-upcoming-booked-transportations      | Get upcoming booked transportations           |
| GET     | /api/tourist/tour-guide/unrated                       | Get unrated tour guides                       |
| POST    | /api/tourist/review/rate/tour-guide/:tourGuideId      | Rate a tour guide                             |
| POST    | /api/tourist/review/comment/tour-guide/:tourGuideId   | Comment on a tour guide                       |
| POST    | /api/tourist/review/rate/itinerary/:itineraryId       | Rate an itinerary                             |
| POST    | /api/tourist/review/comment/itinerary/:itineraryId    | Comment on an itinerary                       |
| POST    | /api/tourist/review/rate/activity/:activityId         | Rate an activity                              |
| POST    | /api/tourist/review/comment/activity/:activityId      | Comment on an activity                        |
| PUT     | /api/tourist/enable-notifications-on-events           | Enable notifications on events                |
| POST    | /api/tourguide/create-profile                         | Create a tour guide profile                   |
| GET     | /api/tourguide/get-profile                            | Get tour guide profile                        |
| PUT     | /api/tourguide/update-profile                         | Update tour guide profile                     |
| POST    | /api/tourguide/create-itinerary                       | Create an itinerary                           |
| PUT     | /api/tourguide/update-itinerary/:itineraryId          | Update an itinerary                           |
| DELETE  | /api/tourguide/delete-itinerary/:itineraryId          | Delete an itinerary                           |
| GET     | /api/tourguide/get-my-itineraries                     | Get all itineraries created by the tour guide |
| POST    | /api/tourguide/upload-profile-picture                 | Upload a profile picture                      |
| PUT     | /api/tourguide/set-status-itinerary                   | Set the status of an itinerary                |
| GET     | /api/tourguide/view-revenue                           | View revenue                                  |
| GET     | /api/tourguide/view-tourists                          | View tourists                                 |
| POST    | /api/advertiser/create-profile                        | Create an advertiser profile                  |
| GET     | /api/advertiser/get-profile                           | Get advertiser profile                        |
| PUT     | /api/advertiser/update-profile                        | Update advertiser profile                     |
| POST    | /api/advertiser/create-activity                       | Create an activity                            |
| PUT     | /api/advertiser/update-activity/:activityId           | Update an activity                            |
| DELETE  | /api/advertiser/delete-activity/:activityid           | Delete an activity                            |
| PUT     | /api/advertiser/disable-activity-booking              | Disable activity booking                      |
| PUT     | /api/advertiser/enable-activity-booking               | Enable activity booking                       |
| POST    | /api/advertiser/upload-logo                           | Upload advertiser logo                        |
| GET     | /api/advertiser/get-my-activities                     | Get all activities by the advertiser          |
| POST    | /api/advertiser/create-transportation                 | Create transportation                        |
| GET     | /api/advertiser/get-transportations                   | Get all transportations                       |
| GET     | /api/advertiser/get-my-transportations                | Get advertiser's transportations              |
| DELETE  | /api/advertiser/delete-transportation                 | Delete transportation                        |
| PUT     | /api/advertiser/edit-transportation                   | Edit transportation                          |
| GET     | /api/advertiser/view-revenue                          | View advertiser's revenue                     |
| GET     | /api/advertiser/view-tourists                         | View tourists for advertiser                  |
| POST    | /api/seller/create-profile                            | Create seller profile                         |
| GET     | /api/seller/get-profile                               | Get seller profile                            |
| PUT     | /api/seller/update-profile                            | Update seller profile                         |
| POST    | /api/seller/upload-logo                               | Upload seller logo                            |
| GET     | /api/seller/sales-report                              | Get sales report                              |
| POST    | /api/tourismgovernor/create-place                     | Create a place                                |
| GET     | /api/tourismgovernor/get-places                       | Get all places                               |
| PUT     | /api/tourismgovernor/update-place/:historicalPlaceId  | Update a place                                |
| DELETE  | /api/tourismgovernor/delete-place/:historicalPlaceId  | Delete a place                                |
| GET     | /api/tourismgovernor/get-my-places                    | Get all places created by the governor        |
| POST    | /api/tourismgovernor/create-historical-tag            | Create a historical tag                      |
| POST    | /api/admin/add-tourism-governor                       | Add a tourism governor                       |
| DELETE  | /api/admin/delete-account/:id                         | Delete a user account                        |
| POST    | /api/admin/add-admin                                  | Add an admin                                 |
| GET     | /api/admin/get-users/:role                            | Get users by role                            |
| POST    | /api/admin/create-category                            | Create a category                            |
| PUT     | /api/admin/update-category/:id                        | Update a category                            |
| DELETE  | /api/admin/delete-category/:id                        | Delete a category                            |
| POST    | /api/admin/create-preference-tag                      | Create a preference tag                      |
| GET     | /api/admin/get-all-preference-tags                    | Get all preference tags                      |
| PUT     | /api/admin/update-preference-tag/:id                  | Update a preference tag                      |
| DELETE  | /api/admin/delete-preference-tag/:id                  | Delete a preference tag                      |
| POST    | /api/admin/create-historical-tag                      | Create a historical tag                      |
| PUT     | /api/admin/edit-product/:id                           | Edit a product                               |
| PUT     | /api/admin/add-product/:id                            | Add a product                                |
| GET     | /api/admin/view-uploaded-docs/:userId                 | View uploaded documents                      |
| PUT     | /api/admin/accept-reject-user                         | Accept or reject a user                      |
| PUT     | /api/admin/flag-itinerary                             | Flag an itinerary                            |
| PUT     | /api/admin/flag-activity                              | Flag an activity                             |
| PUT     | /api/admin/unflag-itinerary                           | Unflag an itinerary                          |
| GET     | /api/admin/get-pending-users                          | Get pending users                            |
| GET     | /api/admin/view-users                                 | View all users                               |
| GET     | /api/cart/                                            | Get cart details                             |
| POST    | /api/cart/product                                     | Add product to cart                          |
| DELETE  | /api/cart/product/:productId                          | Remove product from cart                     |
| PATCH   | /api/cart/product/:productId/decrement                | Decrement product quantity in cart           |
| PATCH   | /api/cart/product/:productId/increment                | Increment product quantity in cart           |
| POST    | /api/cart/checkout                                    | Checkout                                     |
| POST    | /api/wishlist/:productId                              | Add product to wishlist                      |
| POST    | /api/wishlist/:productId/cart                         | Add wishlist product to cart                 |
| DELETE  | /api/wishlist/:productId                              | Remove product from wishlist                 |
| GET     | /api/wishlist/                                        | Get wishlist details                         |
| PUT     | /api/bookmark/activity                                | Bookmark an activity                         |
| PUT     | /api/bookmark/itinerary                               | Bookmark an itinerary                        |
| GET     | /api/bookmark/activity                                | Get bookmarked activities                    |
| GET     | /api/bookmark/itinerary                               | Get bookmarked itineraries                   |
| DELETE  | /api/bookmark/activity                                | Remove bookmark from activity                |
| DELETE  | /api/bookmark/itinerary                               | Remove bookmark from itinerary               |
| POST    | /api/product/add-product                              | Add a product                               |
| PUT     | /api/product/edit-product/:id                         | Edit a product                              |
| GET     | /api/product/                                         | Get product details                         |
| GET     | /api/product/fetch-my-products                        | Get products created by user                |
| POST    | /api/product/archive/:id                              | Archive a product                           |
| POST    | /api/product/unarchive/:id                            | Unarchive a product                         |
| POST    | /api/product/review                                   | Review a product                            |
| GET     | /api/itinerary/                                       | Get itineraries                             |
| GET     | /api/activity/                                        | Get activities                              |
| GET     | /api/category/get-all                                 | Get all categories                          |
| GET     | /api/preference-tag/get-all                           | Get all preference tags                     |
| GET     | /api/historical-tag/get-all                           | Get all historical tags                     |
| GET     | /api/places/                                          | Get places                                 |
| POST    | /api/complaint/create                                 | Create a complaint                         |
| GET     | /api/complaint/                                       | Get complaints                             |
| GET     | /api/complaint/details/:complaintId                   | Get complaint details                      |
| GET     | /api/complaint/my-complaints                         | Get user's complaints                      |
| PATCH   | /api/complaint/resolve/:complaintId                   | Resolve a complaint                        |
| PATCH   | /api/complaint/reply/:complaintId                     | Reply to a complaint                       |
| GET     | /api/exchange-rate/fetch-all                          | Fetch all exchange rates                   |
| POST    | /api/flights/search                                  | Search for flights                         |
| GET     | /api/notifications/                                  | Get notifications                          |
| PUT     | /api/notifications/                                  | Update notifications                       |
| POST    | /api/hotels/search                                   | Search for hotels                         |
| POST    | /api/reset-password/send-otp                         | Send OTP for password reset               |
| POST    | /api/reset-password/check-otp                        | Check OTP for password reset              |
| POST    | /api/reset-password/                                 | Reset password                            |
| POST    | /api/address/                                        | Add an address                            |
| GET     | /api/address/                                        | Get addresses                             |
| PATCH   | /api/address/:id/default                             | Set default address                       |
| DELETE  | /api/address/:id                                     | Delete an address                         |
| PATCH   | /api/order/:orderId/address/:addressId               | Update order address                      |
| POST    | /api/order/:orderId/payment                          | Make payment for order                    |
| PATCH   | /api/order/:orderId/delivery                         | Mark order as delivered                   |
| POST    | /api/order/:orderId/confirm-cod                      | Confirm COD for order                     |
| GET     | /api/order/                                          | Get orders                                |
| GET     | /api/order/:orderId                                  | Get order details                         |
| PATCH   | /api/order/:orderId/cancel                           | Cancel an order                           |
| PATCH   | /api/order/:orderId/promo-code/:promoCode            | Apply promo code to order                 |
| POST    | /api/promocode/                                      | Create a promo code                       |


## Code Examples

Below are several code snippets that demonstrate how key functionalities are implemented within our Roamify application, spanning both backend logic and frontend components.

### Add Address
This function allows users to add a new address to their profile, ensuring all necessary fields are provided:
```javascript
const addAddress = async (req, res) => {
    try {
        const { name, street, city, state, postalCode, country, isDefault } = req.body;
        if (!name || !street || !city || !postalCode || !country) {
            return res.status(400).json({
                message: "Name, street, city, postal code, and country are required."
            });
        }
        const newAddress = new addressModel({
            user: req.user._id,
            name,
            street,
            city,
            state,
            postalCode,
            country,
            isDefault: isDefault || false,
        });
        if (isDefault) {
            await addressModel.updateMany({ user: req.user._id }, { isDefault: false });
        }
        const savedAddress = await newAddress.save();
        if (!savedAddress) {
            return res.status(500).json({
                message: "An error occurred while creating the address. Please try again later."
            });
        }
        res.status(201).json({ message: "Address added successfully." });
    } catch (error) {
        res.status(500).json({
            message: "An unexpected error occurred while adding the address.",
            error: error.message,
        });
    }
};
```
### Create Category
```javascript
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "Name and description are required." });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "A category with this name already exists. Please choose a unique name." });
    }

    const newCategory = new categoryModel({ name, description });
    await newCategory.save();

    res.status(201).json({
      message: "Category created successfully.",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({
      message: "An unexpected error occurred while creating the category. Please try again later.",
      error: error.message,
    });
  }
};
```
### Rate Tour Guide
```javascript
const rateTourGuide = async (req, res) => {
    try {
        const userId = req.user._id;
        const tourGuideId= req.params.tourGuideId;
        const {rating} = req.body;

        // Verify that the user exists
        const tourist = await userModel.findById(userId);
        if (!tourist) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        // Retrieve itinerary tickets where the itinerary date has passed
        const itineraryTickets = await itineraryTicketModel
            .find({ tourist: userId, status: 'active' })
            .populate({
                path: 'itinerary',
                select: '_id name tourGuide availableDates',
                populate: {
                    path: 'tourGuide',
                    select: '_id username', // Get tour guide ID and username only
                },
            });

        // Filter tickets to include only those with past dates
        const completedItineraries = itineraryTickets.filter(ticket => {
            return ticket.itinerary && ticket.itinerary.availableDates.some(date => new Date(date) < new Date());
        });

        // Extract unique tour guides the tourist has toured with
        const uniqueTourGuides = Array.from(
            new Map(
                completedItineraries.map(ticket => [ticket.itinerary.tourGuide._id.toString(), {
                    tourGuideId: ticket.itinerary.tourGuide._id,
                    tourGuideName: ticket.itinerary.tourGuide.username
                }])
            ).values()
        );

        // Check if the provided tourGuideId is in the list of unique tour guides
        const isTourGuideCompleted = uniqueTourGuides.some(guide => guide.tourGuideId.toString() === tourGuideId);
        if (!isTourGuideCompleted) {
            return res.status(400).json({ message: 'You can only rate a tour guide you have completed a tour with' });
        }

        // Check if a rating already exists for this tourist and tour guide, if so, update it
        const existingReview = await tourGuideReviewModel.findOne({ tourist: userId, tourGuide: tourGuideId });
        if (existingReview) {
            existingReview.rating = rating;
            await existingReview.save();
            return res.status(200).json({ message: 'Tour guide rating updated successfully' });
        }

        // If no existing review, create a new one
        const newReview = await tourGuideReviewModel.create({
            tourist: userId,
            tourGuide: tourGuideId,
            rating
        });

        res.status(201).json({ message: 'Tour guide rated successfully', review: newReview });
    } catch (error) {
        console.error("Error rating tour guide:", error);
        res.status(500).json({ message: "An error occurred while rating the tour guide" });
    }
};
```
### Tour Guide Create Profile
```javascript
const createProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "User authentication failed. Please log in and try again." });
    }

    const user = await userModel.findById(userId);

    if (user.status === "pending") {
      return res.status(403).json({ message: "Your account is pending admin approval. Please wait for approval before creating a profile." });
    }

    if (!user.termsAndConditions) {
      return res.status(400).json({ message: "You must accept the terms and conditions to create a profile." });
    }

    const existingProfile = await tourGuideModel.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({ message: "A profile already exists for this account. Duplicate profiles are not allowed." });
    }

    const { mobileNumber, yearsOfExperience, previousWork } = req.body;

    if (!mobileNumber) {
      return res.status(400).json({ message: "Mobile number is required to create a profile." });
    }

    await userModel.findByIdAndUpdate(userId, { status: "active" });

    const newTourGuide = new tourGuideModel({
      mobileNumber,
      yearsOfExperience,
      previousWork,
      user: userId,
    });

    await newTourGuide.save();

    res.status(201).json({ message: "Your tour guide profile has been created successfully!" });
  } catch (error) {
    console.error("Error creating tour guide profile:", error.message);
    res.status(500).json({ message: "An unexpected error occurred while creating your profile. Please try again later.", error: error.message });
  }
};
```
### Cart Item Display
```javascript
import React, { useState } from "react";

const CartItem = (item, handleIncrement, handleDecrement) => {
  const [count, setCount] = useState(item.quantity);
  return (
    <div
      key={item.productId}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "15px",
        height: "35vh",
        padding: "30px",
        border: "1px solid var(--secondary-border-color)",
        borderRadius: "8px",
        backgroundColor: "var(--secondary-color)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "80%",
          padding: "30px 0px",
          borderRadius: "8px",
        }}
      >
        <img
          src={item.image}
          alt={item.name}
          style={{
            flex: 1,
            objectFit: "cover",
            borderRadius: "0px",
            marginRight: "10px",
          }}
        />
      </div>
      <div>
        <strong style={{ fontSize: "25px" }}>{item.name}</strong>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          flex: "0 0 auto",
        }}
      >
        <button
          type="button"
          style={{
            width: "60px",
            height: "40px",
            backgroundColor: "#8b3eea",
            border: "none",
            borderRadius: "5px",
            fontSize: "25px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            handleDecrement(item.productId);
          }}
        >
          {item.quantity == 1 ? (
            <DeleteIcon fill="white" height="20px" width="20px" />
          ) : (
            "-"
          )}
        </button>
        <span
          style={{
            minWidth: "40px",
            height: "40px",
            lineHeight: "40px",
            textAlign: "center",
            fontSize: "20px",
          }}
        >
          {item.quantity}
        </span>
        <button
          type="button"
          style={{
            width: "60px",
            height: "40px",
            backgroundColor: "#8b3eea",
            border: "none",
            borderRadius: "5px",
            fontSize: "22px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => handleIncrement(item.productId)}
        >
          +
        </button>
      </div>
      <button
        type="button"
        style={{
          backgroundColor: "transparent",
          border: "none",
          color: "#f44336",
          cursor: "pointer",
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => handleDelete(item.productId)}
      >
        <DeleteIcon fill="var(--text-color)" height="20px" width="20px" />
      </button>
    </div>
  );
};

export default CartItem;
```

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
cd Roamify/frontend
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
cd Roamify/frontend
npm run dev
```
For the backend server:
```bash
cd Roamify/backend
npm start
```

## How to Use

1. **Access the Application**
    - Clone or download the repository.
    - Run the server locally and access it at `http://localhost:3000`.

2. **Authentication**
    - **Register**:
        - Create an account by submitting the required information (username, password, and email).
    - **Login**:
        - Use your credentials to log in.

3. **Explore Features**
    - **User Management**:
        - Update your profile, change passwords, or manage account preferences.
    - **Bookings and Transactions**:
        - Browse and book activities, itineraries, or places.
    - **Cart and Wishlist**:
        - Add items to your cart or wishlist for later checkout.
    - **Admin Features**:
        - Access detailed analytics, manage users, and monitor transactions.

4. **API Usage**
    - Use Postman to test the API endpoints.
    - Example:  
      **Endpoint**: `POST /api/user/login`  
      **Body**:
      ```json
      {
        "username": "tourguide1",
        "password": "Password123!"
      }
      ```
      **Response**:
      ```json
      {
        "email": "mohamed.sweidan@student.guc.edu.eg",
        "username": "tourguide1",
        "role": "tourGuide",
        "status": "active"
      }
      ```

5. **Tips for Optimal Use**
    - Use a modern browser (Chrome or Firefox) for the best performance.
    - Ensure the server is running correctly to avoid connection issues.

---

## Contributing

We welcome contributions to enhance this project! Here’s how you can help:

1. **Report Issues**
    - Found a bug? Report it [here](https://github.com/your-repository/issues).

2. **Submit Code**
    - Fork this repository and create a branch for your feature or fix:
      ```bash
      git checkout -b feature-name
      ```
    - Push your changes:
      ```bash
      git push origin feature-name
      ```
    - Open a pull request with a detailed description of your changes.

3. **Follow Guidelines**
    - Ensure all code is tested before submitting.
    - Write clear comments and adhere to the project’s style guide.

---

### Code of Conduct
We are committed to creating a respectful and inclusive community. By contributing, you agree to abide by our [Code of Conduct](https://www.contributor-covenant.org/).

---

## Credits

We extend our gratitude to the following resources and contributors:

1. **Educational Platforms**
    - [Net Ninja](https://www.youtube.com/c/TheNetNinja) for tutorials on JavaScript, Node.js, and API development.
    - [Udemy](https://www.udemy.com/) and the **Dr. Angela Yu Course** for foundational knowledge in web development.

2. **Online Resources**
    - [Stack Overflow](https://stackoverflow.com/) for troubleshooting and solutions.
    - [YouTube Tutorials](https://www.youtube.com/) by Traversy Media.

3. **Technologies and Tools**
    - [Node.js](https://nodejs.org/) for backend.
    - [Express.js](https://expressjs.com/) for middleware and routing.
    - [MongoDB](https://www.mongodb.com/) for the database.
    - [React](https://reactjs.org/) for UI development.

---

## License

This project is licensed under multiple licenses to cover various technologies:

1. **[MIT License](https://choosealicense.com/licenses/mit/)** - For general usage and contributions.
2. **[Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)** - Required for any integration with services like Stripe.
3. **[Server Side Public License (SSPL)](https://www.mongodb.com/licensing/server-side-public-license)** - For MongoDB usage.

---



