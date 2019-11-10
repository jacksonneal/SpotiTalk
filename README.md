# SpotiTalk

SpotiTalk is a community to talk about your favorite songs, artists, and albums, all while being able to easily listen to the music being discussed. Before this, there was no forum that effectively covered all musical niches, and there were several steps involved from talking about the music and actually enjoying it.

Users can look up a specific song, artist, or album, and view a full forum about it. For songs, they'll be able to listen to the song from their browser. If they're signed in, they'll be able to post and create topics. Users generate the content and the community for SpotiTalk

Moderators are users with additional administrative power within some topics. They can ban users and delete posts within their domain. Moderators help keep SpotiTalk civil and on-topic.

We intend to solve this by making heavy use of the Spotify API. Spotify provides data for all its songs, artists, and albums, and provides HTML widgets to embed these within a site. In addition, we will set up data structures that allow all these Spotify entities to have an entire forum post structure related to them.

## Installation / Dev Setup (server)

Ensure you are using the following versions for node and npm:
Node: `10.16.3`
npm: `6.9.0`

Installing packages
```bash
npm install
```

Running node server. The server will serve API calls, as well as built files in client/build
```bash
npm start
```

## Installation / Dev Setup (client)

See client/README.md

When developing the client, make sure the Express server is running if you plan to make API calls.

