# ZepTalk-Real-time-Communication-Website

I’ve built is a real-time chat web application using the MERN stack with Socket.IO.

<h1><b>Business Goal:</b></h1>
The goal was to create a secure, responsive, and user-friendly real-time chat platform that allows users to:
<ul>
  <li>Register/login securely.</li>
  <li>View all available users.</li>
  <li>Select any user to start a one-on-one conversation.</li>
  <li>Send and receive messages instantly.</li>
  <li>Maintain chat history.</li>
</ul>
This type of application is useful for social networking, customer support, internal team communication, or community platforms.

<hr/>

<h1><b>My Exact Contribution:</b></h1>
I was solely responsible for building the complete application from scratch, including:

<h3>Frontend (React):</h3>
1. Designed a clean and responsive UI using Tailwind CSS.
2. Built components for login, registration, chat window, and user list.
3. Integrated Socket.IO on the client-side to handle real-time communication.

<h3>Backend (Node.js + Express):</h3>

1. Created RESTful APIs for user registration, login, and fetching users.
2. Integrated JWT for authentication and protected routes.
3. Implemented socket connection handling and message broadcasting using Socket.IO.

<h3>Database (MongoDB):</h3>

1. Designed Mongoose schemas for users and messages.
2. Stored chat history and user data securely.

<h1><b>Tools & Technologies Used:</b></h1>
* Frontend: React.js, Tailwind CSS, Axios, React Context API

* Backend: Node.js, Express.js, Socket.IO

* Database: MongoDB (hosted on MongoDB Atlas)

* Authentication: JWT (JSON Web Tokens), bcrypt for password hashing

* Dev Tools: Postman for API testing, Git & GitHub for version control

<h1><b>Challenges Overcome:</b></h1>

<h3>Real-time Communication:</h3>
Managing socket connections between multiple users and ensuring messages were delivered in real time was tricky. I resolved this by using Socket.IO’s private rooms and events effectively.

<h3>User Authentication & Security:</h3>
Implementing secure JWT-based authentication and protecting the chat from unauthorized access required careful backend route handling.

<h3>Chat Synchronization:</h3>
Ensuring that chat history loads correctly when a user switches between different conversations was a challenge. I optimized API calls and socket event listeners to sync messages efficiently.

<h3>Frontend State Management:</h3>
Managing chat state, selected user, and message lists across components without introducing bugs required proper use of React Context and useEffect hooks.

<h1><b>Web Preview:</b></h1>
![Screenshot 2025-06-16 004109](https://github.com/user-attachments/assets/0d5112a4-092d-4332-a969-3fe92b9f868c)
![Screenshot 2025-06-16 004109](https://github.com/user-attachments/assets/0d5112a4-092d-4332-a969-3fe92b9f868c)
