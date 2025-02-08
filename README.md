Netflix Clone

A Netflix Clone built using React.js and Firebase for authentication and database management. This project replicates core functionalities of Netflix, including user authentication, browsing movies, adding to favorites, and responsive UI.

Features

User Authentication: Sign up and login using Firebase Authentication.

Movie Browsing: Display movies using TMDB API.

Search Functionality: Search for movies and TV shows.

Add to Favorites: Users can add movies to their watchlist.

Responsive UI: Fully responsive design for all screen sizes.

Dynamic Banner & Trailers: Featured movie banners and trailer previews.

Secure Database: Firebase Firestore used for storing user data.

Technologies Used

React.js (Frontend)

Firebase (Authentication & Firestore Database)

TMDB API (Movie Data)

React Router (Navigation)

Redux Toolkit (State Management)

Styled Components / Tailwind CSS (Styling)

Installation & Setup

Clone the repository:

git clone https://github.com/your-username/netflix-clone.git

Navigate to the project directory:

cd netflix-clone

Install dependencies:

npm install

Set up Firebase:

Create a Firebase project.

Enable Authentication (Email/Password or Google Sign-In).

Create a Firestore database.

Get Firebase API keys and add them to a .env file:

REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
REACT_APP_FIREBASE_APP_ID=your_app_id

Start the development server:

npm start

Deployment

To deploy the application:

Use Firebase Hosting:

npm run build
firebase deploy

Or deploy using Vercel or Netlify.

Screenshots
![Screenshot_30-1-2025_23748_localhost](https://github.com/user-attachments/assets/699c4e5d-e9ea-4cd1-b367-c68cb36a2120)

![image](https://github.com/user-attachments/assets/a3bec1cd-8bc0-446b-9a7b-7cdc842cea7b)


Future Enhancements

Implement a subscription-based model.

Add a recommendation engine.

Improve UI animations and transitions.

Contributing

Contributions are welcome! Feel free to submit a pull request.

License

This project is licensed under the MIT License.

Contact

For any inquiries, reach out via [your email or GitHub link].




 
