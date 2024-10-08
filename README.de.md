# fetcii

> Einfaches Fetch-Modul primär für das aciiFX-Backend designed

> [Here](/README.md) is the doc also in english.

## Entwickler\*Innen

-   [Flowtastisch](https://flowtastisch.com)

## Credits

### fetcii

-   [javascript](https://www.javascript.com/)
-   [typescript](https://github.com/Microsoft/TypeScript)

### fetcii (dev)

-   [concurrently](https://github.com/open-cli-tools/concurrently)
-   [express](https://github.com/expressjs/express)

## Features

-   einfaches fetch Modul 🎲
-   inspiriert von odata v2 👀
-   Unterstützung der vier Haupt CRUD Methoden 📓
-   eingebautes error handling -> immer eine message 💬
-   unterstützt automatisiert filter, top, skip, select query parameter ✨
-   designed für aciiFX, aber auch anders nutzbar 🥑

## Entwickeln mit fetcii

### Was du brauchst

-   NodeJS
-   TypeScript `npm install -g typescript`

### Installation

1.  Installiere das fetcii Paket (Bsp.: yarn **oder** npm)

        yarn add @aciiverse/fetcii

        npm i @aciiverse/fetcii

2.  Jetzt kannst du fetcii einfach importieren:

        import { fetcii } from "@aciiverse/fetcii";

## Entwickeln

> Hier sind ein paar Beispiele, wie man die Funktionen benutzen kann:

### getcii

#### Hole dir alle Spiele

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

> Wenn nur Spiel 6 - 20 ausgegeben werden soll, kannst du `top` & `skip` nutzen:

        const result = await fetcii.getcii(url, {
            top:    15, // get 15 games max
            skip:   5   // skip the first 5 games
        });

-   Die Queryparameter kommen als `$top` und `$skip` an

> Wenn alle Spiele absteigend nach dem `release` sortiert werden sollen:

        const orderBy: OrderByType = {
            property: 'release',
            ascending: false
        };

        const result = await fetcii.getcii(url, {
            orderBy: orderBy
        });

-   Der Queryparameter kommt als `$orderBy` an

> Wenn alle Spiele aufsteigend nach dem `title` -> aufsteigend nach der `id` sortiert werden sollen:

        const orderBy: OrderByType = [
            { property: 'title', ascending: true },
            { property: 'id', ascending: true }
        ];

        const result = await fetcii.getcii(url, {
            orderBy: orderBy
        });

-   Der Queryparameter kommt als `$orderBy` an

> Wenn nur der `title` und die `id` selektiert werden soll, kannst du `select` nutzen:

        const result = await fetcii.getcii(url, {
            select: ['title', 'id'] // select only the 'title' and 'id'
        });

-   Der Queryparameter kommt als `$select` an

> Wenn gefiltert werden soll, kann der neue Filtertyp mit dem Property `filter` verwendet werden:

-   Alle Spiele mit der id 1:

          const filter: FilterType = {
              operator: fetcii.CompareOperator.Equal,
              property: 'id',
              value: 1
          };

-   Alle Spiele namens 'Minecraft' **oder** 'Portal 2':

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

-   Alle Spiele namens 'Minecraft' **oder** zwischen 2020 **und** 2028 erschienen

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

-   Filter zuweisen:

          const result = await fetcii.getcii(url, {
              filter: filters // set filter
          });

-   Der Queryparameter kommt als `$filters` an

#### Hole dir ein einzelnes Spiel

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

#### Erstelle ein Spiel

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

#### Bearbeite ein Spiel

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

#### Lösche ein Spiel

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

### Usermodul (best use with aciiFX) (user)

#### users.saveData()

-   Nach einem Login kannst du den Token, Tokenverfallsdatum und die Userdaten speichern:

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

-   Die Userdaten erhalten

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

-   Den Access Token erhalten

        const token = fetcii.users.getToken();

        if (!token) return; // no token found

-   Mit dem Token kannst du getcii(), createcii(), updatecii() oder deletecii() ausführen.
-   `aciiFX` hat eingebaute middlewares, die den Token automatisch konsumieren

        const token = fetcii.users.getToken();

        if (!token) return; // no token found

        const url = 'http://localhost:3000/api/games',
            result = await fetcii.getcii(url, {}, token); // fetching (async await);

#### users.deleteData()

-   Lösche die Daten, die du abgespeichert hast

        fetcii.users.deleteData();

-   Wenn du zB. initial beim Appstart prüfen willst, ob der Token abgelaufen ist, kannst du folgendes nutzen
-   Es kommt zurück, ob der Token abgelaufen ist
-   Wenn du nichts mitgibst, löscht er automatisch die Daten

        fetcii.users.checkTokenExpired();

    oder

        const expired = fetcii.users.checkTokenExpired();

    oder

        const expired = fetcii.users.checkTokenExpired(true);

    oder

        fetcii.users.checkTokenExpired(true);

-   Wenn die Daten nicht gelöscht werden sollen:

        const expired = fetcii.users.checkTokenExpired(false);
