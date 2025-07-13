# Aura Auction: AI-Powered Auction Platform

Aura Auction is a modern, AI-native marketplace that revolutionizes online auctions with intelligent authenticity, dynamic pricing, and personalized negotiation agents.

## Key Features

-   **AI-Powered Product Analysis:** Sellers can upload product images, and our vision-capable AI will automatically generate a title, description, price range, and more.
-   **Conversational AI Assistant:** Buyers can chat with an AI assistant to find the perfect items, ask questions, and get recommendations.
-   **Role-Based Authentication:** A secure authentication system distinguishes between buyers and sellers, providing a tailored experience for each role.
-   **Dynamic User Interface:** The application's UI and navigation intelligently adapt based on the user's authentication status and role.
-   **Seller Dashboard:** A comprehensive dashboard allows sellers to create new listings, view their active products, and manage their sales.

## Tech Stack

-   **Core Framework:** React & Vite
-   **UI Components:** Shadcn/UI
-   **Styling:** Tailwind CSS
-   **Routing:** React Router
-   **Authentication:** Custom role-based authentication with React Context API
-   **AI Integration:** OpenRouter API
    -   **Chat:** `deepseek/deepseek-r1-0528:free`
    -   **Image Analysis:** `deepseek/deepseek-r1-0528:free`

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js and npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username_/Project-Name.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Create a `.env` file in the root of the project and add your OpenRouter API key:
    ```
    VITE_OPENROUTER_API_KEY="YOUR_API_KEY"
    ```
4.  Start the development server:
    ```sh
    npm run dev
    ```
