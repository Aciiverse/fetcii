# fetcii

> Simple Fetch module primarily designed for the aciiFX backend

> [Hier](/README.de.md) ist die Doku ebenfalls in deutsch.

## Developer

-   [Flowtastisch](https://flowtastisch.com)

## Credits

### fetcii

-   [javascript](https://www.javascript.com/)
-   [typescript](https://github.com/Microsoft/TypeScript)

### fetcii (dev)

-   [concurrently](https://github.com/open-cli-tools/concurrently)
-   [express](https://github.com/expressjs/express)

## Features

-   simple fetch module 🎲
-   inspired by odata v2 👀
-   support of the four main CRUD methodes 📓
-   integrated error handling -> always a message 💬
-   supports automated filter, top, skip, select query parameter ✨
-   designed for aciiFX, but also usable differently 🥑

## Develop with fetcii

### What you need

-   NodeJS
-   TypeScript `npm install -g typescript`

### Installation

1.  Install the fetcii package (e.g. yarn **or** npm)

        yarn add @aciiverse/fetcii

        npm i @aciiverse/fetcii

2.  Now you can simply import the functions (either automatically if you choose the functions or manually in the file with):

        import { getcii } from @aciiverse/fetcii

## Develop

> Here are a few examples of how to use the functions:

### getcii

#### Get all games

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

> if only game 6-20 is to be output, you can use `top` & `skip`:

        const result = await getcii(url, {
            top:    15, // get 15 games max
            skip:   5   // skip the first 5 games
        });

-   the query parameters come as `$top` and `$skip`

> if all games should be sorted (descending) `release`:

        const orderBy: OrderByType = {
            property: 'release',
            ascending: false
        };

        const result = await getcii(url, {
            orderBy: orderBy
        });

-   the query parameter comes as `$orderBy`

> if all games should be sorted (ascending) `title` -> (ascending) `id`:

        const orderBy: OrderByType = [
            { property: 'title', ascending: true },
            { property: 'id', ascending: true }
        ];

        const result = await getcii(url, {
            orderBy: orderBy
        });

-   the query parameter comes as `$orderBy`

> if only the `title` and the `id` should be selected, you can use `select` :

        const result = await getcii(url, {
            select: ['title', 'id'] // select only the 'title' and 'id'
        });

-   the query parameter comes as `$select`

> if you want to filter, the new filter type can be used with the property `filter`:

-   all games with the id 1:

          const filter: FilterType = {
              operator: CompareOperator.Equal,
              property: 'id',
              value: 1
          };

-   all games called 'Minecraft' **or** 'Portal 2':

          const filter: FilterType = {
              filters: [
                  {
                      operator: CompareOperator.Equal,
                      property: 'title',
                      value: 'Minecraft'
                  },
                  {
                      operator: CompareOperator.Equal,
                      property: 'title',
                      value: 'Portal 2'
                  }
              ],
              and: false
          };

-   all games called 'Minecraft' **or** released between 2020 **and** 2028

          const filter: FilterType = {
              filters: [
                  {
                      filters: [
                          {
                              operator: CompareOperator.GreaterEqual,
                              property: 'release',
                              value: 2020
                          },
                          {
                              operator: CompareOperator.LessEqual,
                              property: 'release',
                              value: 2028
                          }
                      ],
                      and: true
                  },
                  {
                      operator: CompareOperator.Equal,
                      property: 'title',
                      value: 'Minecraft'
                  }
              ],
              and: false
          };

-   assign filters:

          const result = await getcii(url, {
              filter: filters // set filter
          });

-   the query parameter comes as `$filters`

#### Get a single game

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

### createcii

#### Create a game

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

### updatecii

#### Edit a game

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

### deletecii

#### Delete a game

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
