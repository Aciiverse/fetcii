import assert = require("node:assert");
import { describe, it } from "node:test";
import { getcii } from "..";

interface BasicResponse {
    message: string,
    data?: any
}

interface Game {
    id: string;
    title: string;
    description: string;
    release: string;
    developingLanguage: string;
    developer: string;
}

const baseUrl = 'http://localhost:3000/api';

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