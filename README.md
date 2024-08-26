# fetcii

> Simple Fetch module primarily designed for the aciiFX backend
> [Hier](/README.de.md) ist die Doku ebenfalls in deutsch.

## Developer

- [Flowtastisch](https://flowtastisch.com)

## Credits

### fetcii

- [javascript](https://www.javascript.com/)
- [typescript](https://github.com/Microsoft/TypeScript)

### fetcii (dev)

- [concurrently](https://github.com/open-cli-tools/concurrently)
- [express](https://github.com/expressjs/express)

## Features

- simple fetch module 🎲
- inspired by odata v2 👀
- support of the four main CRUD methodes 📓
- integrated error handling -> always a message 💬
- supports automated filter, top, skip, select query parameter ✨
- designed for aciiFX, but also usable differently 🥑

## Develop with fetcii

### What you need

- NodeJS
- TypeScript `npm install -g typescript`

### Installation

1. Install the fetcii package (e.g. yarn **or** npm)

        yarn add @aciiverse/fetcii

        npm i @aciiverse/fetcii

2. Now you can simply import the functions (either automatically if you choose the functions or manually in the file with):

        import { getcii } from @aciiverse/fetcii

### Develop

> Here are a few examples of how to use the functions:

#### getcii

##### Get all games

        import { getcii } from '@aciiverse/fetcii';

        const url = 'http://localhost:3000/api/games'; // api url

        const result = await getcii(url); // fetching (async await)

        if (result.err) {
            // -> error occured while fetching (frontend or backend)
            console.error(result.err?.message); // log error
        } else {
            // -> Success
            const games: Game[] = result.data?.data; // set data & assign own type (for typescript)

            // do what ever you want...

            console.log(result.data?.message); // log success message
        }

##### Get a single game

        import { getcii } from '@aciiverse/fetcii';

        const url = 'http://localhost:3000/api/games/:id'; // api url

        const result = await getcii(url); // fetching (async await)

        if (result.err) {
            // -> error occured while fetching (frontend or backend)
            console.error(result.err?.message); // log error
        } else {
            // -> success
            const game: Game = result.data?.data; // set data & assign own type (for typescript)

            // do what ever you want...

            console.log(result.data?.message); // log success message
        }

#### createcii

##### Create a game

        import { createcii } from '@aciiverse/fetcii';

        const   url = 'http://localhost:3000/api/games', // api url
                data: Omit<Game, 'id'> = { // 'Omit' bewirkt, dass der type 'Game' ohne das property 'id' benutzt wird (typescript)
                    title: 'Minecraft',
                    language: 'Java',
                    release: 2011
                };

        const result = await createcii(url, data); // fetching (async await)

        if (result.err) {
            // -> error occured while fetching (frontend or backend)
            console.error(result.err?.message); // log error
        } else {
            // -> success
            const game: Game = result.data?.data; // set data & assign own type (for typescript)

            // do what ever you want...

            console.log(result.data?.message); // log success message
        }

#### updatecii

##### Edit a game

        import { updatecii } from '@aciiverse/fetcii';

        const   url = 'http://localhost:3000/api/games/:id', // api url
                data: Game = {
                    title: 'Portal 2',
                    language: 'C++',
                    release: 2011
                };

        const result = await updatecii(url, data); // fetching (async await)

        if (result.err) {
            // -> error occured while fetching (frontend or backend)
            console.error(result.err?.message); // log error
        } else {
            // -> success
            const game: Game = result.data?.data; // set data & assign own type (for typescript)

            // do what ever you want...

            console.log(result.data?.message); // log success message
        }

#### deletecii

##### Delete a game

        import { removecii } from '@aciiverse/fetcii';
    
        const   url = 'http://localhost:3000/api/games/:id'; // api url

        const result = await removecii(url); // fetching (async await)

        if (result.err) {
            // -> error occured while fetching (frontend or backend)
            console.error(result.err?.message); // log error
        } else {
            // -> success

            // do what ever you want...

            console.log(result.data?.message); // log success message
        }
