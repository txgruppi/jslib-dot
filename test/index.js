var path = require('path');
var expect = require('chai').expect;
var dot = require('..');

describe('dot', function(){
  context('methods', function(){
    it('should respond to get', function(){
      expect(dot).to.respondTo('get');
    });

    it('should respond to set', function(){
      expect(dot).to.respondTo('set');
    });

    it('#get should take two arguments', function(){
      expect(dot.get.length).to.be.equal(2);
    });

    it('#set should take three arguments', function(){
      expect(dot.set.length).to.be.equal(3);
    });
  });

  context('getter', function(){
    before(function(){
      this.data = require(path.join(__dirname, '..', 'package.json'));
      this.data.array = [
        'zero',
        'one',
        'two',
      ];
      this.data.arrayOfObjects = [
        {
          value: 0,
          arr: [
            {deep: 'a'},
            {deep: 'b'},
            {deep: 'c'},
          ]
        },
        {
          value: 1,
          arr: [
            {deep: 'd'},
            {deep: 'e'},
            {deep: 'f'},
          ]
        },
        {
          value: 2,
          arr: [
            {deep: 'g'},
            {deep: 'h'},
            {deep: 'i'},
          ]
        },
      ];
    });

    it('should get a property at first level', function(){
      expect(dot.get(this.data, 'name')).to.be.equal('jslib-dot');
    });

    it('should get a property from any level', function(){
      expect(dot.get(this.data, 'scripts.test')).to.be.equal("mocha --ui bdd");
    });

    it('should get a propert with a numeric index', function(){
      expect(dot.get(this.data, 'array.1')).to.be.equal('one');
    });

    it('should return `undefined` invalid keys', function(){
      expect(dot.get(this.data, 'any.invalid.key')).to.be.undefined;
    });

    it('should build an array for $ selector', function(){
      expect(dot.get(this.data, 'arrayOfObjects.$.value')).to.be.deep.equal([0, 1, 2]);
    });

    it('should build an array for each $ selector', function(){
      expect(dot.get(this.data, 'arrayOfObjects.$.arr.$.deep')).to.be.deep.equal([['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']]);
    });
  });

  context('setter', function(){
    beforeEach(function(){
      this.data = {};
    });

    it('should set a first level property', function(){
      dot.set(this.data, 'first', 'key');
      expect(this.data.first).to.be.equal('key');
    });

    it('should set a property at any level', function(){
      dot.set(this.data, 'a.deeper.level', 'value');
      expect(this.data.a.deeper.level).to.be.equal('value');
    });

    it('should create an array for numeric indexes', function(){
      dot.set(this.data, 'array.1', 'one');
      expect(this.data.array[1]).to.be.equal('one');
      expect(this.data.array).to.be.an.instanceof(Array);
    });

    it('should create an array of objects', function(){
      dot.set(this.data, 'languages.0.name', 'JavaScript');
      dot.set(this.data, 'languages.1.name', 'Go');
      expect(JSON.stringify(this.data)).to.be.equal('{"languages":[{"name":"JavaScript"},{"name":"Go"}]}');
    });

    it('should set to undefined if no value is given', function(){
      dot.set(this.data, 'a.path.for.nothing');
      expect(this.data.a.path.for.nothing).to.be.undefined;
    });
  });
});
