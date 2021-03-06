const sut = require('../../engine/sessionLoader'),
    resources = require('../../engine/apiLoader')('../__tests__/engine/data/test.descriptor.json');

describe('Testing session loader', () => {

    test('Should initialize environment', () => {
        let session = sut('../__tests__/engine/data/test.session.json', resources)
        expect(session.settings.environment).toBe('PROD');
    });

    test('Should initialize operations', () => {
        let session = sut('../__tests__/engine/data/test.session.json', resources)
        expect(session.operations.length).toBe(5);
        expect(session.operations[1].name).toBe('WhoAmI_1');
        expect(session.operations[1].operation).toBe('whoAmI');
        expect(session.operations[1].params.query['name']).toBe('{{{keepAlive_1.name}}}');
        expect(session.operations[1].params['query']['surname']).toBe('Melandri');
        expect(session.operations[1].headers['User-Agent']).toBe('{{{settings.userAgent}}}');
        expect(session.operations[1].headers['Accept']).toBe('application/json');
        expect(session.operations[1].assertions[0].field).toBe('{{{WhoAmI_1.message}}}');
        expect(session.operations[1].assertions[0].comparison).toBe('eq');
        expect(session.operations[1].assertions[0].value).toBe('Hello World');
    });

    test('Should not initialize session if wrong api declaration', () => {
        try {
            sut('../__tests__/engine/data/test.sessionWrong.json', resources)
            expect(false).toBe(true);
        } catch (e) {
            expect(e).toBe('No api defined for keepAlive1');
        }
    });

    test('Should not initialize session settings is not defined', () => {
        try {
            sut('../__tests__/engine/data/test.sessionWrong1.json', resources)
            expect(false).toBe(true);
        } catch (e) {
            expect(e).toBe('No settings defined in descriptor file');
        }
    });

    test('Should not initialize if session settings is not defined', () => {
        try {
            sut('../__tests__/engine/data/test.sessionWrong2.json', resources)
            expect(false).toBe(true);
        } catch (e) {
            expect(e).toBe('No urls defined for settings in descriptor file');
        }
    });

    test('Should not initialize if operation has wrong url', () => {
        try {
            sut('../__tests__/engine/data/test.sessionWrong3.json', resources)
            expect(false).toBe(true);
        } catch (e) {
            expect(e).toBe('Wrong url defined for keepAlive');
        }
    });
});
