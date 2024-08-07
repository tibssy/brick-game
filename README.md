# Brick Game

Welcome to the Brick Game project! This isn't just a traditional Tetris game, it's a multifaceted arcade experience that combines several classic games into one. In addition to the traditional Tetris gameplay, this game includes a nostalgic snake game and a variant of Tetris with additional brick types and special features.

The Tetris mode features the classic falling block gameplay where you aim to clear lines by arranging falling bricks. The Snake mode offers a nostalgic experience where you guide a snake to collect items and grow longer while avoiding collisions. The Tetris Extra mode introduces new brick types and special features, adding layers of strategy and challenge.

#### [Visit Brick Game](https://tibssy.github.io/brick-game)

![sample](https://github.com/user-attachments/assets/c20ac6b1-4333-4ea3-8a46-241efddfd6ea)

## Table of Contents

-   [User Experience](#user-experience)
-   [Features](#features)
-   [Design](#design)
-   [Installation](#installation)
-   [Testing](#testing)
-   [Bugs](#bugs)
-   [Deployment](#deployment)
-   [Credits](#credits)
-   [Conclusion](#conclusion)

## User Experience

### Ideal User Demographic

**Brick Game is perfect for:**

-   **New Users:**

    -   People who enjoy classic arcade games.
    -   TCasual gamers looking for quick and engaging gameplay.
    -   Families wanting a nostalgic gaming experience.
    -   Retro gaming enthusiasts.

-   **Current Users:**
    -   Returning players who enjoyed the Brick Game and want to explore new features.
    -   Users looking for updates on game modes and customization options.

### Goals for First-Time Visitors

As a first-time visitor to Brick Game, I want to:

-   Easily understand what the game is about.
-   Navigate the site easily using familiar menus and icons.
-   Explore the different game modes.
-   Access contact information for any questions or support.

### Goals for Returning Visitors

As a returning visitor to Brick Game, I want to:

-   Check for new game modes or updates to existing ones.
-   Quickly start a new game session.
-   Access my previous scores and achievements.
-   Customize my gaming experience with different themes and settings.

## Features

### Game Selector

-   Multiple Game Modes:

    -   Users can select from three different games: Tetris, Snake, and Tetris Extra with additional bricks.
    -   The game selector is designed as a carousel, allowing users to easily navigate and choose their desired gameplay.

![game-selector](https://github.com/user-attachments/assets/de64e89b-5c0e-4088-aed3-429d84f12b6e)

### Color Themes and Dark Mode

-   Customization:

    -   Users can select from different color themes to personalize their gaming experience.
    -   A dark mode switch is available for a more comfortable viewing experience in low light.

![dark-light](https://github.com/user-attachments/assets/b40a69fb-95d5-47ff-b366-aae62bfab6ec)

### Game Grid Size

-   Flexible Grid Options:

    -   Users can select between different grid sizes to play.
    -   The original grid size is 10x20 blocks, but in this Brick Game, users can also choose from 6x12, 7x14, 8x16, 9x18, 11x22, and 12x24.

![size-selector](https://github.com/user-attachments/assets/fda1b280-5f3f-4966-b452-aee331b0b278)

### Game Speed

-   Adjustable Speed:

    -   Users can select the initial brick falling speed.
    -   The speed range is from 0 to 10, where 0 is 1 step per second, and 10 is 10 steps per second.
    -   The speed increases by 1 for every 10 cleared lines in Tetris or every 5 collected snake food, adding a progressive challenge.

### Tetris Brick Rotation

-   Flexible Rotation:

    -   Users can switch the rotation of the Tetris brick both clockwise and counterclockwise for better control and strategy.

### Movement Animation

-   Toggle Animation:

    -   Users can toggle the brick/snake movement animation on or off to suit their visual preferences and gameplay style.

### Left-Handed Mode

-   Left-Handed Accessibility:

    -   Users can switch to left-handed mode where the controls move to the left of the game on mobile landscape mode or on desktop mode, providing better accessibility and convenience for left-handed players.

![right-handed](https://github.com/user-attachments/assets/d6c8ff91-b530-4ebc-b35c-e6f7cd526752)

![left-handed](https://github.com/user-attachments/assets/1d8e332b-f8f6-4847-9457-52fb653bff8d)

### Gameplay Controls

-   User Controls:

    -   Users can control the game using the onscreen buttons or the keyboard arrow keys.
    -   Users can pause the game using the ESC key on the keyboard or by touching the game area on mobile devices.
    -   Users can restart the game without going back to the main window or exit the game to switch game modes.
    -   Upon exiting the game or on game over, if the user has a score, the game transitions to the score window.

### Score System

-   Score Tracking:

    -   Upon game exit or game over, users are taken to the score window if they have achieved a score.
    -   Users can enter their name to save their score.
    -   The score window displays a high score list, showing player names, scores, game mode, and date of the score.
    -   Users can reorder the score list by any column in ascending order.

-   Score Calculation:

    -   Tetris:

        -   1 cleared line: 40 \* (speed + 1)
        -   2 cleared lines: 100 \* (speed + 1)
        -   3 cleared lines: 300 \* (speed + 1)
        -   4 cleared lines: 1200 \* (speed + 1)

    -   Snake:
        -   1 food: 40 \* (speed + 1)

![scores](https://github.com/user-attachments/assets/166cbd50-028f-4a63-905c-0f34d241d0da)

### Progressive Web App (PWA)

-   Easy Installation:
    -   The game is designed as a Progressive Web App (PWA), allowing users to install it directly from their browser to their desktop or mobile device.
    -   Once installed, the game supports offline mode, enabling users to play without an internet connection.

## Design

### Imagery

The design of the Tetris, Snake and Tetris Extra game is focused on a clean and modern aesthetic. The abstract background image is utilized specifically in the game selector carousel, enhancing the visual appeal of the selection process without distracting from the game itself.

### Color Scheme

The color scheme is both versatile and user-friendly, featuring seven predefined color themes along with a dark mode option. This allows users to personalize their gaming experience to suit their preferences. The colors are carefully chosen to ensure clarity and readability, which is crucial for an immersive gaming experience.

### Color Palette

-   Light Mode:

    -   Primary Background: Saturation: 100%, Lightness: 94%
    -   Secondary Background: Saturation: 75%, Lightness: 85%
    -   Primary Accent: Saturation: 100%, Lightness: 60%
    -   Secondary Accent: Saturation: 100%, Lightness: 35%
    -   Font Color: Saturation: 15%, Lightness: 15%

-   Dark Mode:
    -   Primary Background: Saturation: 16%, Lightness: 16%
    -   Secondary Background: Saturation: 15%, Lightness: 25%
    -   Primary Accent: Saturation: 100%, Lightness: 60%
    -   Secondary Accent: Saturation: 100%, Lightness: 80%
    -   Font Color: Saturation: 95%, Lightness: 95%

The predefined color themes are based on different hues including orange, yellow, green, blue, purple, pink, and red. Each theme adjusts according to the selected light or dark mode, providing a cohesive and pleasant visual experience.

## Installation

-   Installation on Mobile Devices:

    1. Open the Browser:
        - Open Google Chrome on your Android device.
    2. Navigate to the Game:
        - [Visit Brick Game](https://tibssy.github.io/brick-game)
    3. Install the App:
        - Once the page is loaded, you should see a prompt at the bottom of the screen that says "Add Brick Game to Home screen.
        - If you don't see the prompt, tap the three-dot menu in the top right corner of the browser.
        - Select "Add to Home screen" from the menu.
    4. Confirm Installation:
        - A dialog box will appear with an option to name the app. By default, it will be named after your website.
        - Tap "Add/Install"
    5. Launch the App:
        - The app icon will appear on your home screen or you can find it on the app drawer.
        - Tap the icon to launch your PWA in a standalone window.

    <br/>

https://github.com/user-attachments/assets/cf9ca24d-be56-46db-bb49-7b8cfa639797

-   Installation on Desktop:

    1. Open the Browser:
        - Open Google Chrome on your desktop pc or on your laptop.
    2. Navigate to the Game:
        - [Visit Brick Game](https://tibssy.github.io/brick-game)
    3. Install the App:
        - Once the page is loaded, you should see an install icon (a computer with a download arrow) on the right side of the address bar.
        - Click the install icon.
    4. Confirm Installation:
        - A dialog box will appear asking you to confirm the installation.
        - Click "Install."
    5. Launch the App:
        - The app will open in a standalone window.
        - An icon for the app will also be added to your desktop or start menu, depending on your operating system.

    <br/>

https://github.com/user-attachments/assets/5b977ba3-c530-47a7-a029-1bb37a4b18bd

## Testing

### Lighthouse Performance Tests

Lighthouse was used to test the performance, accessibility, best practices, and SEO of the Bruck Game webapp on both mobile and desktop platforms.

![lighthouse-test-result](https://github.com/user-attachments/assets/06bd0102-a364-4b59-aa30-f42ac16183e4)

### HTML Validation

The HTML code was validated using the W3C Markup Validation Service to ensure it is error-free and follows best practices.

-   **HTML Validation Result:**

![html-validator](https://github.com/user-attachments/assets/e544f50d-1de3-47d5-994f-2a6b7de2c938)

### CSS Validation

The CSS code was validated using the W3C CSS Validation Service to ensure there are no errors and it adheres to best practices.

-   **CSS Validation Results:**

![css-validator](https://github.com/user-attachments/assets/b8fa2f7a-1d90-49c1-aa35-fe129c89031d)

### JavaScript Validation

All JavaScript codes was validated using JSHint to ensure it follows best practices and is free of errors. While no errors were found, there were some warnings regarding the use of ES6 features. This indicates that the code is modern and utilizes the latest JavaScript standards.

### Functionality Test

| **ID** | **Test Area** | **Test Action**                                                                                  | **Expected Outcome**                                                                                                  | **Test Outcome** |
| ------ | ------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ---------------- |
| 01     | Settings Area | User clicks the carousel right ( > ) button on Game Selector                                     | Game selector carousel slides to the right to the image of the next game while the game name changes                  | PASS             |
| 02     | Settings Area | User clicks the carousel left ( < ) button on Game Selector                                      | Game selector carousel slides to the left to the image of the previous game while the game name changes               | PASS             |
| 03     | Settings Area | User clicks one of the 7 colors on Color Selector                                                | Game color theme changes to the selected color                                                                        | PASS             |
| 04     | Settings Area | User clicks the Dark Mode toggle switch                                                          | Game theme alternates between dark and light mode                                                                     | PASS             |
| 05     | Settings Area | User clicks the Game Grid Size minus ( - ) button                                                | Game decreases the grid size. Default value: 10x20; Minimum value: 6x12                                               | PASS             |
| 06     | Settings Area | User clicks the Game Grid Size plus ( + ) button                                                 | Game increases the grid size. Default value: 10x20; Maximum value: 12x24                                              | PASS             |
| 07     | Settings Area | User clicks the Game Level plus ( + ) button                                                     | Game level increases. Default value: 0; Maximum value: 10                                                             | PASS             |
| 08     | Settings Area | User clicks the Game Level minus ( - ) button                                                    | Game level decreases. Default value: 0; Minimum value: 0                                                              | PASS             |
| 09     | Settings Area | User clicks the Tetris Brick Rotation button                                                     | Game rotates the brick between clockwise and counterclockwise, and the icon changes accordingly                       | PASS             |
| 10     | Settings Area | User clicks the Left-Handed Mode toggle switch                                                   | Game moves the controls between the left and right sides of the game area in landscape mode                           | PASS             |
| 11     | Settings Area | User clicks the Animation toggle switch                                                          | Game toggles animation on or off for brick and snake movement                                                         | PASS             |
| 12     | Settings Area | User clicks the instruction ( ? ) button                                                         | Game switches to the Instructions Area                                                                                | PASS             |
| 13     | Settings Area | User clicks the Start Game button                                                                | Game switches to the Game Area and starts the selected game                                                           | PASS             |
| 13     | Game Area     | User clicks the close ( x ) button                                                               | Game switches to the Settings Area if the score is 0; otherwise, it switches to the Score Area                        | PASS             |
| 14     | Game Area     | User clicks the reset button                                                                     | Game restarts the same game by resetting the scores and level                                                         | PASS             |
| 15     | Game Area     | User clicks the pause button                                                                     | Game pauses until the user clicks it again                                                                            | PASS             |
| 16     | Game Area     | User touches the game grid on a touchscreen device                                               | Game pauses until the next touch                                                                                      | PASS             |
| 17     | Game Area     | User clicks or touches the arrow buttons                                                         | Game moves the brick or snake in the desired direction                                                                | PASS             |
| 18     | Game Area     | User touches or presses the arrow buttons (or keyboard) and holds                                | Game moves the brick in the desired direction at a higher speed                                                       | PASS             |
| 19     | Game Area     | User clicks the rotate button or presses the keyboard up arrow key                               | Game rotates the brick in the previously set direction                                                                | PASS             |
| 20     | Game Area     | Game grid fills up in Tetris or a collision occurs with the wall or snake body in the Snake game | Game redirects the user to the Score Area if the score is higher than 0; otherwise, it redirects to the Settings Area | PASS             |
| 21     | Score Area    | User clicks the close ( x ) button                                                               | Game switches to the Settings Area                                                                                    | PASS             |
| 22     | Score Area    | User types the player name into the input field and clicks the plus ( + ) button                 | Game adds the high score to the leaderboard                                                                           | PASS             |
| 23     | Score Area    | User clicks any of the leaderboard header elements                                               | Game reorders the leaderboard based on the selected column in ascending order                                         | PASS             |
| 24     | Score Area    | User clicks the GitHub icon                                                                      | Game opens my GitHub profile in a new tab                                                                             | PASS             |
| 25     | Score Area    | User clicks the LinkedIn icon                                                                    | Game opens my LinkedIn profile in a new tab                                                                           | PASS             |

## Bugs

### High Speed Performance in Chrome-Based Browsers

-   **Issue:**
    At higher game levels, where the speed of the game increases significantly, a performance issue was observed in Chrome-based browsers. This issue arises because the game’s update rate exceeds what the browser’s engine can handle smoothly, leading to inconsistent or laggy gameplay.

-   **Solution:**
    To address this issue, the game now utilizes the requestAnimationFrame built-in function provided by the browser. This method synchronizes the game updates with the browser’s repaint cycles, ensuring smoother performance even at higher speeds.

## Deployment

This section describes the process of deploying the Brick Game project to a hosting platform, specifically GitHub Pages.

**The site was deployed to GitHub Pages. The steps to deploy are as follows:**

1. **Navigate to the Settings Tab:**

    - In your GitHub repository, go to the "Settings" tab.

2. **Select the Source Branch:**

    - Scroll down to the "Pages" section on the left-hand sidebar.
    - From the source section drop-down menu, select the branch you want to deploy (e.g., `main` or `master`).

3. **Save and Deploy:**
    - Click "Save" after selecting the branch.
    - Once the branch has been selected and saved, the page will automatically refresh with a detailed display to indicate the successful deployment.

**The live link can be found here:**

[Brick Game Live Site](https://tibssy.github.io/brick-game/)

## Credits

-   **Image Generation**
    -   [Playground AI](https://playground.com) Used for image-to-image generation from game screenshots.
-   **Image Upscaling**
    -   [Upscayl Desktop](https://www.upscayl.org/) Utilized for upscaling images to higher resolutions.
-   **Image Editing and Conversion**
    -   [GIMP - GNU Image Manipulation Program](https://www.gimp.org/) Open-source tool for editing images and converting them to WebP and many other formats.
-   **Version Control**
    -   [GitHub](https://github.com) Used for version control and repository management.
-   **Integrated Development Environment (IDE)**
    -   Visual Studio Code on Gitpod: [Visual Studio Code](https://code.visualstudio.com/), [GitPod](https://www.gitpod.io/) Online IDE used for coding and development.
-   **Icons**
    -   [fontawesome](https://fontawesome.com) Used for Social Media Icons and menu toggle button.
-   **Fonts**
    -   [Google Font](https://fonts.google.com) Used Roboto and Freeman font family for this project.
-   **PWA**
    -   [WorkBox](https://github.com/GoogleChrome/workbox) Used for simplifying service workers, caching, and offline support in PWAs.
-   **StackOverflow**
    -   [StackOverflow](https://stackoverflow.com) Used to find solutions for specific coding issues, like rotating a 2D array in JavaScript.
-   **W3Schools**
    -   [W3Schools](https://www.w3schools.com/css/) Used to find some design solutions, like a toggle switch.
