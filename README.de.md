# fetcii

> Einfaches Fetch-Modul primär für das aciiFX-Backend designed
> [Here](/README.md) is the doc also in english.

## Entwickler*Innen

- [Flowtastisch](https://flowtastisch.com)

## Credits

### fetcii

- [javascript](https://www.javascript.com/)
- [typescript](https://github.com/Microsoft/TypeScript)

### fetcii (dev)

- [concurrently](https://github.com/open-cli-tools/concurrently)
- [express](https://github.com/expressjs/express)

## Features

- einfaches fetch Modul
- inspiriert von odata v2
- eingebautes error handling -> immer eine message
- unterstützt automatisiert filter, top, skip, select query parameter
- designed für aciiFX, aber auch anders nutzbar

## Entwickeln mit fetcii

### Was du brauchst

- NodeJS (>= vXX)
- TypeScript `npm install -g typescript`

### Installation

1. Installiere das fetcii Paket (Bsp.: yarn **oder** npm)

        yarn add @aciiverse/fetcii

        npm i @aciiverse/fetcii

2. Jetzt kannst du die Funktionen einfach importiert werden (entweder automatisch, wenn du die Funktionen wählst oder manuell oben in der Datei mit):

        import { getcii } from @aciiverse/fetcii

### Entwickeln

> Hier sind ein paar Beispiele, wie man die Funktionen benutzen kann:

#### getcii

##### Hole dir alle Games

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

##### Hole dir ein einzelnes Spiel

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

##### Erstelle ein Spiel

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

##### Bearbeite ein Spiel

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

##### Lösche ein Spiel

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
