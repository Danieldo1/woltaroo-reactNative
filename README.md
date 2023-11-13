# Woltaroo - Food Delivery App
![Gif showcasing the app](./video/capture.gif)

Woltaroo is a React Native-based food delivery app that draws inspiration from the user-friendly interface of Deliveroo. This app streamlines the food ordering process, offering a seamless experience for users to discover, choose, and order their favorite dishes from local restaurants.

## Technologies Used

-   **React Native**: The core framework used to develop the cross-platform mobile application.
-   **Expo**: Leveraged Expo templates for accelerated development and simplified deployment.
-   **Google Maps API Integration**: Integrated Google Maps API to provide users with a map interface for selecting their current location.
-   **Expo Router**: Implemented navigation between different screens using Expo Router, ensuring a smooth user experience.
-   **Zustand**: Utilized Zustand package to manage state, enabling real-time updates to the shopping cart and total price.

## Features

### 1. Landing Screen

-   Users are greeted with a visually appealing landing screen.
-   Filters available for users to refine their food choices based on preferences.

### 2. Location Selection

-   Integration of Google Maps API to allow users to select and set their current location.

### 3. Restaurant Information

-   Detailed information about each restaurant, including menu items, prices, and descriptions.
-   Photos of dishes to enhance the user's visual experience.

### 4. Product Pages

-   Utilizing Expo Router to create dedicated pages for each product.
-   Users can choose the quantity of a particular item and add it to their cart.

### 5. Shopping Cart

-   A responsive cart interface displaying all selected items.
-   Users can remove items, and the total price adjusts dynamically using Zustand.

### 6. Checkout Process

-   Seamless checkout process with a redirection to the home screen upon completion.

## Getting Started

To run the project locally, follow these steps:

1.  Clone the repository:
    
    bashCopy code
    
    `git clone https://github.com/your-username/woltaroo.git` 
    
2.  Install dependencies:
    
    bashCopy code
    
    `cd woltaroo
    npm install` 
    
3.  Run the application:
    
    bashCopy code
    
    `expo start` 

4. Setting up env doc:
	Please visit Google Console to set up your Google Maps API key
    

## Contributing

We welcome contributions! Feel free to open issues, submit pull requests, or provide feedback to help improve Woltaroo.

## License

This project is licensed under the [MIT License](https://chat.openai.com/c/LICENSE).

----------

Enjoy using Woltaroo and have a delightful food delivery experience! 🍔🚀