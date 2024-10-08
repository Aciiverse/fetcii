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

2.  Now you can simply import fetcii:

        import { fetcii } from "@aciiverse/fetcii";

## Develop

> Here are a few examples of how to use the functions:

### getcii

#### Get all games

        import { fetcii } from "@aciiverse/fetcii";

        const url = 'http://localhost:3000/api/games'; // api url

        const result = await fetcii.getcii(url); // fetching (async await)

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

        const result = await fetcii.getcii(url, {
            top:    15, // get 15 games max
            skip:   5   // skip the first 5 games
        });

-   the query parameters come as `$top` and `$skip`

> if all games should be sorted (descending) `release`:

        const orderBy: OrderByType = {
            property: 'release',
            ascending: false
        };

        const result = await fetcii.getcii(url, {
            orderBy: orderBy
        });

-   the query parameter comes as `$orderBy`

> if all games should be sorted (ascending) `title` -> (ascending) `id`:

        const orderBy: OrderByType = [
            { property: 'title', ascending: true },
            { property: 'id', ascending: true }
        ];

        const result = await fetcii.getcii(url, {
            orderBy: orderBy
        });

-   the query parameter comes as `$orderBy`

> if only the `title` and the `id` should be selected, you can use `select` :

        const result = await fetcii.getcii(url, {
            select: ['title', 'id'] // select only the 'title' and 'id'
        });

-   the query parameter comes as `$select`

> if you want to filter, the new filter type can be used with the property `filter`:

-   all games with the id 1:

          const filter: FilterType = {
              operator: fetcii.CompareOperator.Equal,
              property: 'id',
              value: 1
          };

-   all games called 'Minecraft' **or** 'Portal 2':

          const filter: FilterType = {
              filters: [
                  {
                      operator: fetcii.CompareOperator.Equal,
                      property: 'title',
                      value: 'Minecraft'
                  },
                  {
                      operator: fetcii.CompareOperator.Equal,
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
                              operator: fetcii.CompareOperator.GreaterEqual,
                              property: 'release',
                              value: 2020
                          },
                          {
                              operator: fetcii.CompareOperator.LessEqual,
                              property: 'release',
                              value: 2028
                          }
                      ],
                      and: true
                  },
                  {
                      operator: fetcii.CompareOperator.Equal,
                      property: 'title',
                      value: 'Minecraft'
                  }
              ],
              and: false
          };

-   assign filters:

          const result = await fetcii.getcii(url, {
              filter: filters // set filter
          });

-   the query parameter comes as `$filters`

#### Get a single game

        import { fetcii } from "@aciiverse/fetcii";

        const url = 'http://localhost:3000/api/games/:id'; // api url

        const result = await fetcii.getcii(url); // fetching (async await)

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

        import { fetcii } from "@aciiverse/fetcii";

        const   url = 'http://localhost:3000/api/games', // api url
                data: Omit<Game, 'id'> = { // 'Omit' bewirkt, dass der type 'Game' ohne das property 'id' benutzt wird (typescript)
                    title: 'Minecraft',
                    language: 'Java',
                    release: 2011
                };

        const result = await fetcii.createcii(url, data); // fetching (async await)

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

        import { fetcii } from "@aciiverse/fetcii";

        const   url = 'http://localhost:3000/api/games/:id', // api url
                data: Game = {
                    title: 'Portal 2',
                    language: 'C++',
                    release: 2011
                };

        const result = await fetcii.updatecii(url, data); // fetching (async await)

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

        import { fetcii } from "@aciiverse/fetcii";

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

### User module (best use with aciiFX) (user)

#### users.saveData()

-   After a login you can save the token, token drop date and the user data:

        const url = 'http://localhost:3000/api/users/login';

        const result = await fetcii.createcii(url, {
            username: 'ezio',
            password: 'mySecretPassword'
        });

        // validation
        if (result.err) {
            // -> error occured
            console.error(result.err?.message); // log error
            return;
        }
        const data = result.data;

        // save data
        fetcii.users.saveData({
            accessToken: data.token,
            userData: data.user,
            tokenExp: data.tokenExp
        });

#### users.getData()

-   Receive user data

        export interface UserData {
            uuid: string;
            username: string;
            email: string;
            registered: Date;
            lastLogin?: Date;
            verified: boolean;
            isAdmin: boolean;
        }

        const data: UserData = fetcii.users.getData();

        if (!data) return; // no data found

#### users.getToken()

-   Receive the Access Token

        const token = fetcii.users.getToken();

        if (!token) return; // no token found

-   With the token you can execute getcii(), createcii(), updatecii() or deletecii():
-   `aciiFX` has built-in middlewares that automatically consume the token

        const token = fetcii.users.getToken();

        if (!token) return; // no token found

        const url = 'http://localhost:3000/api/games',
            result = await fetcii.getcii(url, {}, token); // fetching (async await);

#### users.deleteData()

-   Delete the data you have saved

        fetcii.users.deleteData();

-   When you start the app, you want to use whether the token has expired, you can use the following
-   It comes back whether the token has expired
-   If you don't define any parameter, it automatically deletes the data

        fetcii.users.checkTokenExpired();

    or

        const expired = fetcii.users.checkTokenExpired();

    or

        const expired = fetcii.users.checkTokenExpired(true);

    or

        fetcii.users.checkTokenExpired(true);

-   If the data should not be deleted:

        const expired = fetcii.users.checkTokenExpired(false);
