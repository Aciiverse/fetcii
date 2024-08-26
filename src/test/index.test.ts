import assert = require("node:assert");
import { describe, it } from "node:test";
import { CompareOperator, createcii, getcii, OrderByType, removecii, updatecii } from "..";

interface BasicResponse {
    message: string,
    data?: any
}

interface Game {
    id: number;
    title: string;
    description: string;
    release: string;
    developingLanguage: string;
    developer: string;
}

const baseUrl = 'http://localhost:3000/api';

// getcii BEGIN
describe('getcii dummy api started', () => {
    it('have valid data', async () => {
        const result = await getcii(baseUrl);

        assert(!result.err, 'response is valid (!err)');
        assert(result.response?.ok, 'response is valid (response.ok)');
        
        const data: BasicResponse = result.data;
        assert(data.message, 'message is defined');
        assert(!data.data, 'data is undefined');
    });
});

describe('getcii all games', () => {
    it('founded', async () => {
        const result = await getcii(`${baseUrl}/games`);

        assert(!result.err, 'response is valid (!err)');
        assert(result.response?.ok, 'response is valid (response.ok)');
        
        const data: BasicResponse = result.data;
        assert(data.message, 'message is defined');

        const games: Game[] = data.data;

        assert.equal(games.length, 20, 'all games founded');
    });
});

describe('getcii 15 games', () => {
    it('founded', async () => {
        const result = await getcii(`${baseUrl}/games`, {
            top: 15
        });

        assert(!result.err, 'response is valid (!err)');
        assert(result.response?.ok, 'response is valid (response.ok)');
        
        const data: BasicResponse = result.data;
        assert(data.message, 'message is defined');

        const games: Game[] = data.data;

        assert.equal(games.length, 15, 'all 15 games founded');
    });
});

describe('getcii game 6 - 20', () => {
    it('founded', async () => {
        const result = await getcii(`${baseUrl}/games`, {
            top:    15,
            skip:   5
        });

        assert(!result.err, 'response is valid (!err)');
        assert(result.response?.ok, 'response is valid (response.ok)');
        
        const data: BasicResponse = result.data;
        assert(data.message, 'message is defined');

        const games: Game[] = data.data;

        assert.equal(games.length, 15, 'all 15 games founded');
        assert.equal(games[0].id, 6, 'beginning with game 6');
        assert.equal(games[14].id, 20, 'ending with gamme with game 20');
    });
});

describe('getcii game select only id, title and release', () => {
    it('founded', async () => {
        const result = await getcii(`${baseUrl}/games`, {
            select: ['id', 'title', 'release']
        });

        assert(!result.err, 'response is valid (!err)');
        assert(result.response?.ok, 'response is valid (response.ok)');
        
        const data: BasicResponse = result.data;
        assert(data.message, 'message is defined');

        const games: Game[] = data.data;

        assert.equal(games.length, 20, 'all 20 games founded');
        assert(games[0].id, 'first: id defined');
        assert(games[19].id, 'last: id defined');
        assert(games[0].title, 'first: title defined');
        assert(games[19].title, 'last: title defined');
        assert(games[0].release, 'first: release defined');
        assert(games[19].release, 'last: release defined');
        assert(!games[0].description, 'first: description undefined');
        assert(!games[19].description, 'last: description undefined');
        assert(!games[0].developingLanguage, 'first: developingLanguage undefined');
        assert(!games[19].developingLanguage, 'last: developingLanguage undefined');
        assert(!games[0].developer, 'first: developer undefined');
        assert(!games[19].developer, 'last: developer undefined');
    });
});

describe('getcii game orderBy release desc, developingLanguage asc, title asc', () => {
    it('founded', async () => {
        const   orderBy: OrderByType = [
                    { property: 'release', ascending: false },
                    { property: 'developingLanguage', ascending: true },
                    { property: 'title', ascending: true }
                ],
                result          = await getcii(`${baseUrl}/games`),
                sortedResult    = await getcii(`${baseUrl}/games`, {
                    orderBy: orderBy
                });

        assert(!sortedResult.err, 'response is valid (!err)');
        assert(sortedResult.response?.ok, 'response is valid (response.ok)');
        
        const   data: BasicResponse = result.data,
                sortedData: BasicResponse = sortedResult.data;
        assert(sortedData.message, 'message is defined');

        const   games: Game[] = data.data,
                sortedGames: Game[] = sortedData.data;

        games.sort((a: any, b: any) => {  
            // orderBy.forEach(e => {
            for (let i = 0; i < orderBy.length; i++) {
                const e = orderBy[i];
                const   propA = a[e.property],
                        propB = b[e.property];
                let greater     = 1,
                    lessThan    = -1;
    
                if (!e.ascending) {
                    greater = -1;
                    lessThan = 1;
                }
    
                if (propA > propB) {
                    return greater;
                } else if (propA < propB) {
                    return lessThan;
                }
            };
            return 0;
        });

        assert.equal(sortedGames.length, 20, 'all 20 games founded');
        assert.deepEqual(games, sortedGames, 'all 20 games are equal sorted');
    });
});

describe('getcii game orderBy id desc', () => {
    it('founded', async () => {
        const   result          = await getcii(`${baseUrl}/games`),
                sortedResult    = await getcii(`${baseUrl}/games`, {
                    orderBy: { property: 'id', ascending: false }
                });

        assert(!sortedResult.err, 'response is valid (!err)');
        assert(sortedResult.response?.ok, 'response is valid (response.ok)');
        
        const   data: BasicResponse = result.data,
                sortedData: BasicResponse = sortedResult.data;
        assert(sortedData.message, 'message is defined');

        const   games: Game[] = data.data,
                sortedGames: Game[] = sortedData.data;

        games.sort((a, b) => {
            if (a.id > b.id) {
                return -1;
            } else if (a.id < b.id) {
                return 1;
            }
            return 0;
        });
        assert.equal(sortedGames.length, 20, 'all 20 games founded');
        assert.deepEqual(games, sortedGames, 'all 20 games are equal sorted');
    });
});

describe('getcii game filtered on release in 2020', () => {
    it('founded', async () => {
        const   result          = await getcii(`${baseUrl}/games`),
                filteredResult  = await getcii(`${baseUrl}/games`, {
                    filters: {
                        property: 'release',
                        operator: CompareOperator.Equal,
                        value: '2020'
                    }
                });

        assert(!filteredResult.err, 'response is valid (!err)');
        assert(filteredResult.response?.ok, 'response is valid (response.ok)');
        
        const   data: BasicResponse = result.data,
                filteredData: BasicResponse = filteredResult.data;
        assert(filteredData.message, 'message is defined');

        const   games: Game[] = data.data,
                filteredGames: Game[] = filteredData.data,
                comparedGames = games.filter(e => e.release === "2020");

        assert.equal(filteredGames.length, 7, 'all 7 filtered games founded');
        assert.deepEqual(filteredGames, comparedGames, 'all 7 filtered games are equal');
    });
});

describe('getcii a single game', () => {
    it('founded', async () => {
        const   gameId = 1,
                result = await getcii(`${baseUrl}/games/${gameId}`);

        assert(!result.err, 'response is valid (!err)');
        assert(result.response?.ok, 'response is valid (response.ok)');
        
        const data: BasicResponse = result.data;
        assert(data.message, 'message is defined');

        const game: Game = data.data;

        assert.equal(typeof game, 'object', 'single game founded');
    });
});

describe('getcii NOT a single game', () => {
    it('founded', async () => {
        const   gameId = 22,
                result = await getcii(`${baseUrl}/games/${gameId}`);

        assert(result.err, 'response is valid (!err)');
        assert(!result.response?.ok, 'response is valid (response.ok)');
        assert(result.data, 'data is undefined');
        assert.equal(typeof result.err.message, 'string', 'error message is defined');
    });
});
// getcii END

// createcii BEGIN
describe('createcii a game', () => {
    it('founded', async () => {
        const   newGame: Omit<Game, 'id'> = {
                    title: "Assassin's Creed Shadows",
                    description: "The 14. Assassin's Creed in Japan",
                    developer: 'Ubisoft',
                    developingLanguage: 'AnvilNext 2.0',
                    release: '2024'
                },
                newGameCompared = newGame as Game,
                result  = await createcii(`${baseUrl}/games`, newGame);

        assert(!result.err, 'response is valid (!err)');
        assert(result.response?.ok, 'response is valid (response.ok)');
        assert.equal(result.response?.status, 201, 'status is 201');
        
        const data: BasicResponse = result.data;
        assert(data.message, 'message is defined');
        assert(data.data, 'data is defined');

        newGameCompared.id = 21;
        assert.deepEqual(data.data, newGameCompared, 'new game is equal the new game data');
    });
});

describe('createcii a game without neccessary property (failing attempt)', () => {
    it('founded', async () => {
        const   newGame: Omit<Game, 'id' | 'developer'> = {
                    title: "Assassin's Creed Shadows",
                    description: "The 14. Assassin's Creed in Japan",
                    developingLanguage: 'AnvilNext 2.0',
                    release: '2024'
                },
                result  = await createcii(`${baseUrl}/games`, newGame);

        assert(result.err, 'response is unvalid (err)');
        assert(!result.response?.ok, 'response is unvalid (!response.ok)');
        assert.equal(result.response?.status, 406, 'status is 406');
        
        const data: BasicResponse = result.data;
        assert(data.message, 'message is defined');
        assert(!data.data, 'data is NOT defined');
    });
});
// createcii END

// updatecii BEGIN
describe('updatecii a game', () => {
    it('founded', async () => {
        const   updatedGame: Omit<Game, 'id'> = {
                    title: "Assassin's Creed Shadows",
                    description: "The 14. Assassin's Creed in Japan",
                    developer: 'Ubisoft',
                    developingLanguage: 'AnvilNext 2.0',
                    release: '2024'
                },
                gameId = 1,
                updatedGameCompared = updatedGame as Game,
                result  = await updatecii(`${baseUrl}/games/${gameId}`, updatedGame);

        assert(!result.err, 'response is valid (!err)');
        assert(result.response?.ok, 'response is valid (response.ok)');
        assert.equal(result.response?.status, 202, 'status is 202');
        
        const data: BasicResponse = result.data;
        assert(data.message, 'message is defined');
        assert(data.data, 'data is defined');

        updatedGameCompared.id = gameId;
        assert.deepEqual(data.data, updatedGameCompared, 'new game is equal the new game data');
    });
});

describe('updatecii a game that doesn`t exist (failing attempt)', () => {
    it('founded', async () => {
        const   updatedGame: Omit<Game, 'id'> = {
                    title: "Assassin's Creed Shadows",
                    description: "The 14. Assassin's Creed in Japan",
                    developer: 'Ubisoft',
                    developingLanguage: 'AnvilNext 2.0',
                    release: '2024'
                },
                gameId = 30,
                result  = await updatecii(`${baseUrl}/games/${gameId}`, updatedGame);

        assert(result.err, 'response is unvalid (err)');
        assert(!result.response?.ok, 'response is unvalid (!response.ok)');
        assert.equal(result.response?.status, 404, 'status is 404');
        
        const data: BasicResponse = result.data;
        assert(data.message, 'message is defined');
        assert(!data.data, 'data is NOT defined');
    });
});
// updatecii END

// removecii BEGIN
describe('removecii a game', () => {
    it('founded', async () => {
        const   gameId = 1,
                result = await removecii(`${baseUrl}/games/${gameId}`);

        assert(!result.err, 'response is valid (!err)');
        assert(result.response?.ok, 'response is valid (response.ok)');
        assert.equal(result.response?.status, 202, 'status is 202');
        
        const data: BasicResponse = result.data;
        assert(data.message, 'message is defined');
        assert(!data.data, 'data is undefined');
    });
});

describe('removecii a game (failing attempt)', () => {
    it('founded', async () => {
        const   gameId = 31,
                result = await removecii(`${baseUrl}/games/${gameId}`);

        assert(result.err, 'response is unvalid (err)');
        assert(!result.response?.ok, 'response is unvalid (!response.ok)');
        assert.equal(result.response?.status, 404, 'status is 404 -> game not found');
        
        const data: BasicResponse = result.data;
        assert(data.message, 'message is defined');
        assert(!data.data, 'data is undefined');
    });
});
// removecii END