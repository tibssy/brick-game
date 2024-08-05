# Brick Game

Welcome to the Brick Game project! This isn't just a traditional Tetris game; it's a multifaceted arcade experience that combines several classic games into one. In addition to the traditional Tetris gameplay, this game includes a nostalgic snake game and a variant of Tetris with additional brick types and special features.

The Tetris mode features the classic falling block gameplay where you aim to clear lines by arranging falling bricks. The Snake mode offers a nostalgic experience where you guide a snake to collect items and grow longer while avoiding collisions. The Tetris Extra mode introduces new brick types and special features, adding layers of strategy and challenge.

#### [Visit Brick Game](https://tibssy.github.io/brick-game)

![sample](https://github.com/user-attachments/assets/c20ac6b1-4333-4ea3-8a46-241efddfd6ea)

## Table of Contents

-   [User Experience](#user-experience)
-   [Features](#features)
-   [Installation](#installation)
-   [Design](#design)
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

![theme-selector](https://github.com/user-attachments/assets/9205eb9b-d9bc-4b17-b5b4-53e12262146b)

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

## Design

### Visual Design

The visual design of the game is inspired by a clean, modern aesthetic with a touch of retro charm. The interface is designed to be intuitive, user-friendly, and visually appealing.

## Testing

### Lighthouse Performance Tests

Lighthouse was used to test the performance, accessibility, best practices, and SEO of the Bruck Game webapp on both mobile and desktop platforms.

![lighthouse-test-result](https://github.com/user-attachments/assets/06bd0102-a364-4b59-aa30-f42ac16183e4)
