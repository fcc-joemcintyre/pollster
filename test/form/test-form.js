const expect = require ('chai').expect;
const { createField, inString, outString, inInteger, outInteger } = require ('../../src/client/lib/formkit/formHelpers');

describe ('form createField', function () {
  describe ('string', function () {
    it ('valid string initialValue and value', function () {
      const result = createField ('name', 'test string', false, [], '', inString, outString);
      expect (result).to.be.an ('Object');
      expect (result.initialValue).to.be.a ('string');
      expect (result.value).to.be.a ('string');
      expect (result.initialValue).to.equal ('test string');
      expect (result.value).to.equal ('test string');
    });
  });
  describe ('integer', function () {
    it ('valid string initialValue and value', function () {
      const result = createField ('name', 1234, false, [], '', inInteger, outInteger);
      expect (result).to.be.an ('Object');
      expect (result.initialValue).to.be.a ('string');
      expect (result.value).to.be.a ('string');
      expect (result.initialValue).to.equal ('1234');
      expect (result.value).to.equal ('1234');
    });
  });
});

describe ('form formatIn/formatOut functions', function () {
  describe ('inString', function () {
    it ('no excess spacing, should be same', function () {
      const result = inString ('test string');
      expect (result).to.be.a ('string');
      expect (result).to.equal ('test string');
    });

    it ('lead spacing, should be trimmed', function () {
      const result = inString ('  test string');
      expect (result).to.be.a ('string');
      expect (result).to.equal ('test string');
    });

    it ('trailing spacing, should be removed', function () {
      const result = inString ('test string  ');
      expect (result).to.be.a ('string');
      expect (result).to.equal ('test string');
    });

    it ('excess spacing, should be removed', function () {
      const result = inString ('  test string  ');
      expect (result).to.be.a ('string');
      expect (result).to.equal ('test string');
    });
  });

  describe ('outString', function () {
    it ('no excess spacing, should be same', function () {
      const result = outString ('test string');
      expect (result).to.be.a ('string');
      expect (result).to.equal ('test string');
    });

    it ('lead spacing, should be trimmed', function () {
      const result = outString ('  test string');
      expect (result).to.be.a ('string');
      expect (result).to.equal ('test string');
    });

    it ('trailing spacing, should be removed', function () {
      const result = outString ('test string  ');
      expect (result).to.be.a ('string');
      expect (result).to.equal ('test string');
    });

    it ('excess spacing, should be removed', function () {
      const result = outString ('  test string  ');
      expect (result).to.be.a ('string');
      expect (result).to.equal ('test string');
    });
  });

  describe ('inInteger', function () {
    it ('undefined, should be zero', function () {
      const result = inInteger ();
      expect (result).to.be.a ('string');
      expect (result).to.equal ('0');
    });

    it ('null, should be zero', function () {
      const result = inInteger (null);
      expect (result).to.be.a ('string');
      expect (result).to.equal ('0');
    });

    it ('empty string, should be zero', function () {
      const result = inInteger ('');
      expect (result).to.be.a ('string');
      expect (result).to.equal ('0');
    });

    it ('floating number, should be integer', function () {
      const result = inInteger (12.34);
      expect (result).to.be.a ('string');
      expect (result).to.equal ('12');
    });
  });

  describe ('outInteger', function () {
    it ('undefined, should be zero', function () {
      const result = outInteger ();
      expect (result).to.be.a ('number');
      expect (result).to.equal (0);
    });

    it ('null, should be zero', function () {
      const result = outInteger (null);
      expect (result).to.be.a ('number');
      expect (result).to.equal (0);
    });

    it ('empty string, should be zero', function () {
      const result = outInteger ('');
      expect (result).to.be.a ('number');
      expect (result).to.equal (0);
    });

    it ('floating number, should be integer', function () {
      const result = outInteger (12.34);
      expect (result).to.be.a ('number');
      expect (result).to.equal (12);
    });
  });
});
