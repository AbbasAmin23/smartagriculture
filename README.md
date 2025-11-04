# Smart Agriculture Tracker

The Smart Agriculture Tracker is a modern, web-based platform designed to empower farmers by providing them with real-time data, actionable insights, and a collaborative community. Built with Next.js and Firebase, this application offers a suite of tools to help farmers make informed decisions, optimize their agricultural practices, and improve their profitability.

The platform features distinct dashboards for farmers and administrators, ensuring that both users and data managers have the tools they need.

## ✨ Key Features

-   **Farmer Dashboard**: A centralized view for farmers providing:
    -   **Weather Updates**: Real-time weather data for various cities in Pakistan, helping farmers plan their activities.
    -   **Live Market Prices**: Up-to-date prices for vegetables and fruits, fetched from Firestore.
    -   **7-Day Price Trend Charts**: Interactive charts showing the price history for each produce item to visualize market trends.
    -   **Logic-Based Farming Advice**: Practical recommendations generated based on current weather conditions (e.g., irrigation advice during a heatwave).
    -   **Community Forum**: An interactive space for farmers to post questions, share knowledge, and connect with peers.
-   **Admin Dashboard**: A secure panel for administrators to:
    -   **Manage Market Data**: Easily add, update, and delete produce prices.
    -   **Track Price History**: Price updates are automatically logged to create historical trend data.
-   **Authentication**:
    -   Secure sign-up and login for farmers using Email/Password.
    -   Anonymous login option for guests.
    -   Separate, credential-based login for administrators.
-   **Multi-Language Support**: The UI seamlessly switches between English and Urdu to cater to a wider audience.
-   **Responsive Design**: A modern, mobile-first interface built with ShadCN UI and Tailwind CSS ensures a great user experience on any device.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Database**: [Cloud Firestore](https://firebase.google.com/docs/firestore)
-   **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Charts**: [Recharts](https://recharts.org/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or newer recommended)
-   npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/AbbasAmin23/smartagriculture.git
    cd smartagriculture
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up Environment Variables:**
    -   You will need API keys for Firebase and the Weather API.
    -   Rename the `.env.local.example` file to `.env.local`.
    -   Fill in the required values in your `.env.local` file:
        -   `NEXT_PUBLIC_FIREBASE_*`: Your Firebase project's client-side configuration. You can find this in your Firebase project settings.
        -   `WEATHER_API_KEY`: Your API key from [WeatherAPI.com](https://www.weatherapi.com/).
        -   `FIREBASE_SERVICE_ACCOUNT_KEY_JSON`: The JSON content of your Firebase service account key. This is required for server-side admin tasks.

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.
