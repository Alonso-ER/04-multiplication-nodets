import { CreateTable } from './create-table.use-case';


describe('create-table.use-case', () => {
    test('Should create tale with default values', () => {
        const createTable = new CreateTable();

        const table = createTable.execute({base: 2});
        const rows = table.split('\n').length;


        expect (createTable).toBeInstanceOf( CreateTable );

        expect (table).toContain('2 x 1 = 2');
        expect(table).toContain('2 x 10 = 20');

        expect ( rows ).toBe(10);
    });

    test('should create table with custom values', () => {
        const options = {
            base: 3,
            limit: 20,
        }

        const createTable = new CreateTable();

        const table = createTable.execute(options);

        const rows = table.split('\n').length;

        const { base, limit } = options;

        expect(table).toContain(`${base} x 1 = ${base}`);
        expect(table).toContain(`${base} x ${limit} = ${base * limit}`)

        expect(rows).toBe(limit);

    })
})