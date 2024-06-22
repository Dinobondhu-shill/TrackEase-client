# TrackEase

Introducing StoryForge: Your Gateway to Inspiring Narratives

Welcome to StoryForge, a captivating blog website meticulously crafted to ignite your imagination and fuel your thirst for captivating narratives. Powered by cutting-edge technologies on both the client and server sides, StoryForge seamlessly blends the power of React, Firebase, Framer Motion, LottieFiles, Tanstack Query, Node.js, Express, and MongoDB to deliver an immersive storytelling experience like no other.

At StoryForge, we believe that every story has the power to transport, inspire, and transform. Whether you're a seasoned wordsmith or an avid reader seeking your next literary adventure, our platform offers a diverse array of stories spanning genres, styles, and perspectives. From heartwarming tales of triumph to spine-tingling adventures in far-off realms, there's something for every reader to discover and cherish.

As a reader on StoryForge, you have unfettered access to a treasure trove of stories waiting to be explored. Dive into our curated collections, browse trending topics, or embark on a journey of serendipitous discovery as you explore the rich tapestry of narratives woven by our community of talented storytellers.

But StoryForge isn't just a platform for consumption; it's a vibrant community where creators and readers come together to share, collaborate, and inspire. For aspiring writers, our intuitive interface makes it easy to craft and publish your own stories, complete with multimedia elements and interactive features. And for avid readers, our robust user accounts allow you to bookmark your favorite stories, engage with authors through comments and reviews, and even curate your own personalized reading lists.

With features like wishlisting, real-time updates, and seamless synchronization across devices, StoryForge puts the power of storytelling at your fingertips. Whether you're curled up on the couch with a cup of tea or on the go with your mobile device, you can immerse yourself in the world of StoryForge anytime, anywhere.

But what truly sets StoryForge apart is our commitment to empowering creators. With our innovative author tools, writers can easily update and iterate on their stories, respond to reader feedback, and track their audience engagement in real time. Whether you're a seasoned author or just starting your writing journey, StoryForge provides the platform and support you need to bring your stories to life and connect with readers around the world.

Join us on StoryForge and embark on a journey of imagination, inspiration, and discovery. Whether you're here to read, write, or simply explore, we invite you to become part of our vibrant community and forge your own path through the boundless realms of storytelling. Welcome to StoryForge, where every story has the power to ignite the imagination and change the world.










## Table of Contents
- [Live Link](https://trackease-3e304.web.app)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)



## Features
- **User Authentication**: Utilizes Firebase authentication for secure user login, logout, sign up, and sign out functionalities.
- **Sign in Method** : User can Log in this web app by using their google / facebook / github.
- **HR Role** : Any company can purchase a plan and make an Hr . Hr can manage all the asset and employee
- **HR Route** : Hr account has some extra private route such as all asset list, add an asset list, requested asset, employee list, and add employee
- **Employee** : anyone of this website user with an account are called employee employees caan affiliate with their companies by hr and make asset request to the hr
- **Employee Route** : Employee has also some route such as asset request , pending request 
- **WishList** : Any logged in user can see wishlist button on the blog card , if they click on the button this blog will be wishlisted , and i wil be show on the wishlist section for the specific user
- **Payment system** : Joining as an HR have to pay by their choosen plan, the payment system integreated with stripe

## Technologies Used

- **Frontend:**
  - React: A JavaScript library for building user interfaces.
  - HTML5: The standard markup language for creating web pages and applications.
  - CSS3: The style sheet language used for describing the presentation of a document written in HTML.
  - JavaScript (ES6+): The programming language that enables dynamic interactivity on web pages.
  - React Router: A routing library for React applications.
  - Firebase: An authenticating kit, for manage user accessibility .
  - Framer Motion: its an animation library, i use it for make the blog cards draggable!
  - Lottie React :  An Animation library for animating front end.
  - Tanstack query: Tanstack query is used for fetching data
  - Axios = axios using for get, post, delete patch and put request
  - Deisy Ui : Css component library for making ui component
  - Stripe : A worldwide payment gateway.

- **Backend:**
  - Node js : An environments runtime for creating server side by js.
  - Express js : 
  - Mongodb : Mongodb atlas for save data in the database .

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine using the following command:

   ```bash
   git clonehttps://github.com/programming-hero-web-course1/b9a12-client-side-Dinobondhu-shill

2. Open your browser and navigate to http://localhost:5173 to view the application.

3. Clone this repository to your local machine using for server side the following command:

   ```bash
   git clone https://github.com/programming-hero-web-course1/b9a12-server-side-Dinobondhu-shill




5. Open your browser and navigate to https://trackease-3e304.web.app to view the application.


## Usage
- **HR Account:**
- Email : dinu.webdev@gmail.com
- Password : 112233

### User Authentication

1. Navigate to the login page by clicking on the "Login" button in the navigation bar.
2. Enter your email and password to log in, or click on the "Sign Up" link to create a new account.
3. After logging in, you will be redirected to the dashboard where you can explore property listings and manage your profile.
4. Join as employee is the creating account as an employee, employees can connect with their hr and manage and request their asset
5. Join as Hr is creating account as an hr , whenever anyone try to create an account of hr he/she should pay as the packages rate.


### All Asset :
1. This is the hr route, is this route hr can see all the asset create by their company , in this route asset can be edit and delete.

### Add Asset
1. Add Asset is a HR route, only Hr can add an asset for their company, and this asset will be visible in the all assets route 

### Requested Asset
1.  Every employee of this company can requested for any asset ,in this route hr can see all the request and hr can delete or approve their asset 


### My Employee

1.In this route all the users or worker will visible , hr can remove member from here

### Add Employee

1.this is also hr routes, in this route any empolyees who aren't affiliate with any  company are visible . also there will visible the current packages of the hr and total member count. there is an payment system hr can choose an plan and after paying the limit will be increase


### My Asset

1.My asset is the Employee Route , in this route employee can see their requested asset in this section.
by the hr the asset status can be approved , rejected or pending.
if hr approve the asset their will be shown a print button . employee can print a pdf of the details.





## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.


## Contact

If you have any questions or suggestions, feel free to contact the project maintainer:

- Dinobondhu Shill
- Email: choncolbiswas9@gmail.com
- GitHub: https://github.com/Dinobondhu-shill

This README provides detailed information about the project, including features, technologies used, folder structure, and instructions for getting started and contributing. Feel free to customize it further to match the specifics of your project!
