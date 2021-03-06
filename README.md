# Tabza

An open-source Google Chrome Extension for personal use which provides a customized page when opening a new tab.
It overrides the default page, while keeping the omnibar feature.

Available at the [chrome web store](https://chrome.google.com/webstore/detail/hiecjakbnemnfkbpmalepdoacakcobpe)

### To-do

- [ ] Aliases that replace relative paths (open issue with Vite)
- [ ] Spotify integration

## Open for modification

This project can be downloaded and modified by anyone interested.
You can install it as an local chrome extension, without having to deploy it to the web store.

### Requirements

- Download and install [Node.js](https://nodejs.org/). Node 14.16 LTS or higher recommended
- Install Vue CLI globally `npm install -g @vue/cli`. (built with Vue 3)

### Setup

- Clone this repo, go to its root directory and run `npm install` to install its dependencies.

* Create an `.env` file in the project's root directory. An example can be found in `.env.example`.
  - API key for Astronomy Picture of the Day by NASA can be generated here https://api.nasa.gov/

### Development

Run `npm run dev` for a dev server. Navigate to `http://localhost:3000/`.

### Build

Run `npm run build` for a full build of the project which is used by the chrome extension

### Install the final build as a chrome extension

- Navigate to `chrome://extensions`
- Expand the Developer dropdown menu and click “Load Unpacked Extension”
- Navigate to the project's root folder and click Ok
- Assuming there are no errors, the extension should load into your browser
