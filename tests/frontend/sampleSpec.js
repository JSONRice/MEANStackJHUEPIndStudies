describe('Example', function() {
    var config = require('../../utils/config')();
    describe('Test', function() {
        it('TestA', function() {
           console.log('sampleSpec TestA');
           expect(config.random).toEqual(undefined);
        });
        it('TestB', function() {
           console.log('sampleSpec TestB');
           expect(config.database == undefined).toBeTruthy(); 
        });
    });
});