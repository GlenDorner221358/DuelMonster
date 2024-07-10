<!-- Repository Information & Links-->
<br />

![GitHub repo size](https://img.shields.io/github/repo-size/GlenDorner221358/DuelMonster)
![GitHub watchers](https://img.shields.io/github/watchers/GlenDorner221358/DuelMonster)
![GitHub language count](https://img.shields.io/github/languages/count/GlenDorner221358/DuelMonster)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/GlenDorner221358/DuelMonster)

<!-- HEADER SECTION -->
<h5 align="center" style="padding:0;margin:0;">Glen Dorner</h5>
<h5 align="center" style="padding:0;margin:0;">221358</h5>
<h6 align="center">DV300 Term 2 2024</h6>
</br>
<p align="center">

  <a href="https://github.com/GlenDorner221358/DuelMonster">
    <img src="assets/icon.png" alt="Logo" width="140" height="140">
  </a>
  
  <h3 align="center">DuelMonster</h3>

  <p align="center">
    Duel your heart out!<br>
      <a href="https://github.com/GlenDorner221358/DuelMonster"><strong>Explore the docs »</strong></a>
   <br />
   <br />
   <a href="https://drive.google.com/file/d/1k2Zo2JPbjB1UmhzJ0QvdfqNBATeV-7nb/view?usp=sharing">View Demo</a>
    ·
    <a href="https://github.com/GlenDorner221358/DuelMonster/issues">Report Bug</a>
    ·
    <a href="https://github.com/GlenDorner221358/DuelMonster/issues">Request Feature</a>
</p>
<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Project Description](#project-description)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [How to install](#how-to-install)
* [Features and Functionality](#features-and-functionality)
* [Concept Process](#concept-process)
   * [Ideation](#ideation)
   * [Wireframes](#wireframes)
   * [User-flow](#user-flow)
* [Development Process](#development-process)
   * [Implementation Process](#implementation-process)
        * [Highlights](#highlights)
        * [Challenges](#challenges)
   * [Reviews and Testing](#peer-reviews)
        * [Feedback from Reviews](#feedback-from-reviews)
        * [Unit Tests](#unit-tests)
   * [Future Implementation](#peer-reviews)
* [Final Outcome](#final-outcome)
    * [Mockups](#mockups)
    * [Video Demonstration](#video-demonstration)
* [Conclusion](#conclusion)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

<!--PROJECT DESCRIPTION-->
## About the Project
<!-- header image of project -->
![image1][image1]

### Project Description

This is DuelMonster, a yugioh companion app. When I play yugioh with my friend we often just forget how much LP either of us have. So I made this super complicated calculator 
so that me and my friends can set and 'forget' while we play. And it even keeps track of past duels!

### Built With

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
* [ChatGPT](https://chatgpt.com/)

<!-- GETTING STARTED -->
## Getting Started

The following instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure that you have the latest version of [react-native](https://reactnative.dev/) installed on your machine as well as [expo](https://expo.dev/). You will also need a 
[firebase](https://firebase.google.com/) project set up with a firestore database and authentication.

The structure for the firestore db is as follows:

2 collections
1. users
2. duels

Users:
name (String)
email (String)
wins (number)

Duels:
Date (Timestamp)
open (Boolean)
password (String)
player1name (String)
player2name (String)
winner (String)

### How to install

### Installation
Here are a couple of ways to clone this repo:

1. Clone Repository </br>
Run the following in the command-line to clone the project:
   ```sh
   git clone https://github.com/GlenDorner221358/DuelMonster.git
   ```
    Open `Software` and select `File | Open...` from the menu. Select cloned directory and press `Open` button

2. Install Dependencies </br>
Run the following in the command-line to install all the required dependencies:
   ```sh
   npm i
   ```

3. Link Your Firebase Project</br>
in the firebase.js file

4. Start the project</br>
Run the following in the command-line to start the project:
   ```sh
   npm start
   ```

<!-- FEATURES AND FUNCTIONALITY-->
## Features and Functionality

![image1][image1]
### Firebase Auth login and register service

Utilizing firebase's authentication services, we can login and register users from a db

![image2][image2]
### Realtime leaderboards and win tracking

The top 3 users based on the amount of wins they have are displayed on the homepage as well as your amount of wins

![image3][image3]
### Search and filter functionality

On the all competitions page you can filter by joinable duels, or search for a specific duel

![image4][image4]
### Duel creation

You can make a new duel with whoever you please

![image5][image5]
### LP calculator

You can calculate LP easily.

<!-- CONCEPT PROCESS -->
<!-- Briefly explain your concept ideation process -->
## Concept Process

I wanted to make a duel app for me and my friends so that when we duel we can easily remember our LP counts.

### Ideation

![image10][image10]

### Wireframes
![image6][image6]
![image7][image7]
![image8][image8]
![image9][image9]


### User-flow

Login -> landing -> comps -> duel

<!-- DEVELOPMENT PROCESS -->
## Development Process

The `Development Process` is the technical implementations and functionality done in the frontend and backend of the application.

### Implementation Process
* I made use of chatgpt to help with syntax and to familiarize myself with conditional statements.
* Firebase obviously helped to implement the login and register pages, as well as firestore helping for just about everything else.
* The Expo mobile app made rapid prototyping super easy.

#### Highlights
* React native is super easy and fun to work with! I especially enjoyed using stylesheets as opposed to a seperate css file.
* Firestore is also super easy to use and the documentation is very extensive!.

#### Challenges
* Designing the structure for the firestore db was a bit of a struggle, I had to do it as I went to ensure I had all the data fields I needed.
* React native's buttons are not customizable, so everytime I needed to make a button I had to make a touchable opacity.

### Future Implementation
* A password system for joining duels.
* A quick path to the calculator screen from the home screen so that you can do a quick warm up duel.

<!-- VIDEO DEMONSTRATION -->
### Video Demonstration

To see a run through of the application, click below:

[View Demonstration](https://drive.google.com/file/d/1k2Zo2JPbjB1UmhzJ0QvdfqNBATeV-7nb/view?usp=sharing)

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/GlenDorner221358/DuelMonster/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what makes the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- AUTHORS -->
## Authors

* **Glen Dorner** - [GlenDorner](https://github.com/GlenDorner221358)

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.\

<!-- LICENSE -->
## Contact

* **Glen Dorner** - [glendorner11@gmail.com](mailto:glendorner11@gmail.com)
* **Project Link** - https://github.com/GlenDorner221358/DuelMonster

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
<!-- all resources that you used and Acknowledgements here -->
* [React-native](https://reactnative.dev/)
* [Firebase](https://firebase.google.com/)
* [Chatgpt](https://chatgpt.com/)
* [Expo](https://expo.dev/)

<!-- MARKDOWN LINKS & IMAGES -->
[image1]: assets/README%20images/login.jpeg
[image2]: assets/README%20images/home.jpeg
[image3]: assets/README%20images/allComps.jpeg
[image4]: assets/README%20images/newDuel.jpeg
[image5]: assets/README%20images/Calculator.jpeg

[image6]: assets/README%20images/loginWireframe.png
[image7]: assets/README%20images/homeWireframe.png
[image8]: assets/README%20images/compsWireframe.png
[image9]: assets/README%20images/unusedProfileWireframe.png
[image10]: assets/README%20images/colors.png
