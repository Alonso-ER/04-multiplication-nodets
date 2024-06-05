import fs from 'fs';
import { SaveFile } from './save-file.use-case';


describe('SaveFileUseCase', () => {

    const customOptions = {
        fileContent: 'custon content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name'
    }

    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

    // beforeEach(() => {
    //     jest.clearAllMocks();
    // })


    //? clean up
    afterEach(() => {
        const outputFolderExists = fs.existsSync('outputs');
        if( outputFolderExists ) fs.rmSync('outputs', {recursive: true});
        
        const customOutputFolderExists = fs.existsSync(customOptions.fileDestination);
        if( customOutputFolderExists ) fs.rmSync(customOptions.fileDestination, {recursive: true});
    });

    test('Should Save File with default values', () => {

        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'test content',
        }

        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
        
        expect(result).toBe(true);
        expect ( fileExists ).toBe(true);
        expect( fileContent ).toBe(options.fileContent);

    });
    test('should save file with custom values', () => {

        const saveFile = new SaveFile();
       
        const result = saveFile.execute(customOptions);
        const fileExists = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, {encoding: 'utf-8'});


        expect( result ).toBe(true);
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(customOptions.fileContent);

    });

    test(`should return false if directory couldn't be created`, () => {

        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('error from testing saveFileUseCase'); }
        );

        const result = saveFile.execute(customOptions);

        expect(result).toBe(false);

        mkdirSpy.mockRestore();


    });

    test(`should return false if file couldn't be created`, () => {

        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('writing error message from testing saveFileUseCase'); }
        );

        const result = saveFile.execute({ fileContent: 'Hola' });

        expect(result).toBe(false);

        writeFileSpy.mockRestore();
    });
});



