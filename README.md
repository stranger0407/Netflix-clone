# Netflix Clone

A **Netflix Clone** built using **React.js** and **Firebase** for authentication and database management. This project replicates core functionalities of Netflix, including user authentication, browsing movies, adding to favorites, and responsive UI.

## Features

- **User Authentication**: Sign up and login using Firebase Authentication.
- **Movie Browsing**: Display movies using TMDB API.
- **Search Functionality**: Search for movies and TV shows.
- **Add to Favorites**: Users can add movies to their watchlist.
- **Responsive UI**: Fully responsive design for all screen sizes.
- **Dynamic Banner & Trailers**: Featured movie banners and trailer previews.
- **Secure Database**: Firebase Firestore used for storing user data.

## Technologies Used

- **React.js** (Frontend)
- **Firebase** (Authentication & Firestore Database)
- **TMDB API** (Movie Data)
- **React Router** (Navigation)
- **Redux Toolkit** (State Management)
- **Styled Components / Tailwind CSS** (Styling)

## Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/netflix-clone.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd netflix-clone
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```
4. **Set up Firebase:**
   - Create a Firebase project.
   - Enable Authentication (Email/Password or Google Sign-In).
   - Create a Firestore database.
   - Get Firebase API keys and add them to a `.env` file:
     ```ini
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```
5. **Start the development server:**
   ```sh
   npm start
   ```

## Deployment

To deploy the application:

- **Use Firebase Hosting:**
  ```sh
  npm run build
  firebase deploy
  ```
- **Or deploy using Vercel or Netlify.**

## Screenshots

![Screenshot_8-2-2025_174025_localhost](https://github.com/user-attachments/assets/21e187b8-78c9-412b-b334-7b9b7b42d5c8)
![Screenshot_30-1-2025_23748_localhost](https://github.com/user-attachments/assets/02c97b9d-8b7c-4f2a-858e-fd6eb7bd040b)


## Future Enhancements

- Implement a subscription-based model.
- Add a recommendation engine.
- Improve UI animations and transitions.

## Contributing

Contributions are welcome! Feel free to submit a pull request.

## License

This project is licensed under the **MIT License**.

## Contact

For any inquiries, reach out via [rgjha2001@gmail.com].
