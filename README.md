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

-   [ ] Display your playlist
-   [ ] Display all the top 50 playlist given in file `src/static/data.json` by year as displayed on figma
-   [ ] Click on a playlist will redirect to the playlist page

### Playlist page

-   [ ] Header
    -   [ ] Color background based on playlist's cover color
    -   [ ] Playlist cover
    -   [ ] Playlist name
-   [ ] Body
    -   [ ] Text input to filter on any data in the current playlist (case insensitive)
    -   [ ] Select input with sorting on
        -   [ ] Title
        -   [ ] Year
        -   [ ] Genre
        -   [ ] Popularity
        -   [ ] Duration
    -   [ ] Display all songs of the current playlist
    -   [ ] Display a green heart if the song as been liked
    -   [ ] Clicking on heart will add / remove from liked playlist
    -   [ ] Contextual menu will display list of playlist, click on one will add song to it

## Left drawer

-   [ ] Display spotify icon on top
-   [ ] Menu must contain
    -   [ ] Link to home page
    -   [ ] Button to create a playlist
        -   [ ] Click on it will open a modal with a text input and add button
        -   [ ] When creating a playlist you need to generate a linear gradient background color. These color must be random
    -   [ ] Link to liked songs
    -   [ ] List and link to all playlist

## Footer

-   [ ] On the left display playlist cover with name of music currently selected
-   [ ] Display a fake player in the center
-   [ ] Display fake control button on the right

## General informations

### Router

You'll need to use react router to navigate trought playlist. You'll need to use url parameters, please see
https://v5.reactrouter.com/web/example/url-params

### Design

You'll need to reproduce the following design

https://www.figma.com/file/WeUPIKSrcXxslteFyzKEgR/Spotify-Web-university?node-id=0%3A1&t=y7veOtwkQA163kyj-1
