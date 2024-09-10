const server = require('./server.mjs');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('Image endpoints', () => {
    it('GET /images/icons/1 should show the one image', async () => {
        const res = await requestWithSupertest.get('/images/icons/1');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('image'));
    });

    it('GET /images/icons/x should show the default image', async () => {
        const res = await requestWithSupertest.get('/images/icons/x');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('image'));
    });

    it('GET /images/icons/ should show return an error ', async () => {
        const res = await requestWithSupertest.get('/images/icons/');
        expect(res.status).toEqual(404);
    });

    afterAll(() => {
        server.close();
    });
});

describe('Status endpoints', () => {
    it('should return Status as the system is online ', async () => {
        const res = await requestWithSupertest.get('/status');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('application/json'));
    });

    afterAll(() => {
        server.close();
    });
});

describe('Data endpoints', () => {
    it('should return the csv', async () => {
        const res = await requestWithSupertest.get('/data');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('application/json'));
    });

    afterAll(() => {
        server.close();
    });
});

describe('Dropdown endpoints for shapes', () => {
    let shapeOptions = ['globose','ovoid', 'ellipsoidal', 'fusiform', 'capitate', 'conical', 'clavate', 'lenticular', 'terete/cylindrical', 'semiterete', 'compressed', 'trigonous', 'wibbed', 'winged', 'cymbiform', 'flabellate'];

    test.each(shapeOptions)('dropdown for shape %s should be ok', async (input) => {
        let res = await requestWithSupertest.get('/images/dropdown/' + input);
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('image'));
    });
     afterAll(() => {
        server.close();
    });
});


describe('Dropdown endpoints for textures', () => {
    let textureOptions = ['scabrous', 'muricate', 'papillose', 'pustulate', 'mealy', 'lepidote', 'punctate', 'rugose'];
    
    test.each(textureOptions)('dropdown for texture %s should be ok', async (input) => {
        let res = await requestWithSupertest.get('/images/dropdown/' + input);
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('image'));
    });

    afterAll(() => {
        server.close();
    });
});

