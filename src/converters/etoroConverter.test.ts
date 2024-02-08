import { EtoroConverter } from "./etoroConverter";

describe("etoroConverter", () => {

    it("should construct", () => {

      // Act
      const sut = new EtoroConverter();

      // Asssert
      expect(sut).toBeTruthy();
    });

    it("should process sample CSV file", (done) => {

    // Act
    const sut = new EtoroConverter();
    const inputFile = "sample-etoro-export.csv";

    // Act      
    sut.readAndProcessFile(inputFile, (actualExport: GhostfolioExport) =>  {

      // Assert
      expect(actualExport).toBeTruthy();
      
      // Finish the test
      done();
    }, () => { fail("Should not have an error!"); });      
  });

  describe("should throw an error if", () => {
    it("the input file does not exist", (done) => {

      // Act
      const sut = new EtoroConverter();

      let tempFileName = "tmp/testinput/etoro-filedoesnotexist.csv";
      
      // Act
      sut.readAndProcessFile(tempFileName, () =>  { fail("Should not succeed!"); }, (err: Error) => {

        // Assert
        expect(err).toBeTruthy();
        done();
      });      
    });

    it("the input file is empty", (done) => {

      // Act
      const sut = new EtoroConverter();

      // Create temp file.
      let tempFileContent = "";
      tempFileContent += "Date,Type,Details,Amount,Units,Realized Equity Change,Realized Equity,Balance,Position ID,Asset type,NWA\n";      
      
      // Act
      sut.processFileContents(tempFileContent, () =>  { fail("Should not succeed!"); }, (err: Error) => {

        // Assert
        expect(err).toBeTruthy();
        expect(err.message).toContain("An error ocurred while parsing")
        done();
      });      
    });
  });
});
