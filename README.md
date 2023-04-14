# Spotify

## Student name

> Yann Hippert

## Get started

-   Clone your repo
-   > $ cd your-folder-name
-   For yarn users
    -   > $ yarn install
    -   > $ yarn start
-   For npm users
    -   > $ npm install
    -   > $ npm start

## Instructions

-   Fork this repo on your own github.
-   Add you name and surname as mentioned ahead
-   This project must be done for 15 April, don't forget to commit and push either it will be a 0.
-   I need to be able to build your code for production
-   TabNine, Github copilot and ChatGpt aren't allowed, if I detect this usage it will be a 0.

## Features

### Home page

-   [x] Display your playlist
-   [x] Display all the top 50 playlist given in file `src/static/data.json` by year as displayed on figma
-   [x] Click on a playlist will redirect to the playlist page

### Playlist page

-   [x] Header
    -   [x] Color background based on playlist's cover color
    -   [x] Playlist cover
    -   [x] Playlist name
-   [x] Body
    -   [x] Text input to filter on any data in the current playlist (case insensitive)
    -   [x] Select input with sorting on
        -   [x] Title
        -   [x] Year
        -   [x] Genre
        -   [x] Popularity
        -   [x] Duration
    -   [x] Display all songs of the current playlist
    -   [x] Display a green heart if the song has been liked
    -   [x] Clicking on heart will add / remove from liked playlist
    -   [x] Contextual menu will display list of playlist, click on one will add song to it (\*)

\*: The click on a song in the contexual menu, will toggle the song of that playlist

## Left drawer

-   [x] Display spotify icon on top
-   [x] Menu must contain
    -   [x] Link to home page
    -   [x] Button to create a playlist
        -   [x] Click on it will open a modal with a text input and add button
        -   [x] When creating a playlist you need to generate a linear gradient background color. These color must be random (\*\*)
    -   [x] Link to liked songs
    -   [x] List and link to all playlist

\*\*: The gradient is seeded, based on the playlists name, the random color method is awailable the same file /src/utils/GradientGenerator

## Footer

-   [x] On the left display playlist cover with name of music currently selected
-   [x] Display a fake player in the center
-   [x] Display fake control button on the right

## General informations

### Router

You'll need to use react router to navigate trought playlist. You'll need to use url parameters, please see https://v5.reactrouter.com/web/example/url-params

### Design

You'll need to reproduce the following design

https://www.figma.com/file/WeUPIKSrcXxslteFyzKEgR/Spotify-Web-university?node-id=0%3A1&t=y7veOtwkQA163kyj-1

### Links

-   https://v5.reactrouter.com/web/example/no-match
-   https://www.figma.com/file/WeUPIKSrcXxslteFyzKEgR/Spotify-Web-university?node-id=1%3A2&t=8XlrLrnx1UjFoL8K-0
-   https://ant.design/components/table#onrow-usage
-   https://ant.design/components/icon
-   https://ant.design/components/grid
-   https://ant.design/components/space
