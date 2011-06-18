var should = require('should'), 
    assert = require('assert'), 
    TimeTraveller = require('../lib/timetraveller'),
    vows = require('vows');

vows.describe('Operate with dates')

.addBatch({
    'Given I have a time traveller object': {
        topic: function () {
            return new TimeTraveller();
        }, 
        'Getting I have a new date object': {
            topic: function (timeTraveller) {
                return timeTraveller.now();
            },

            'Should return an enhanced date': function (date) {
                date.should.respondTo('addDays');
                date.should.be.an.instanceof(Date);
            },

            'but should not modify the native date object': function(date){
                var d = new Date();
                d.should.not.respondTo('addDays');
            },
        }   
    }
})

.addBatch({
    'Given I have a time traveller object': {
        topic: function () {
            return new TimeTraveller();
        }, 
        'When calling addDays with a positive value': {
            topic: function (timeTraveller) {
                var d = timeTraveller.now();
                return d.addDays(5);
            },
            'should return a date in the future': function (date) {
                (date > new Date()).should.be.ok;
            }
        },

        'When calling addDays with a negative value': {
            topic: function (timeTraveller) {
                var d = timeTraveller.now();
                return d.addDays(-5);
            },
            'should return a date in the past': function (date) {
                (date < new Date()).should.be.ok;
            }
        }
    }
})

.addBatch({
    'Given a timeTraveller object':{
        topic: function () {
            return new TimeTraveller();
        },
        'When calling addMonths with a positive value':{
            topic: function (timeTraveller) {
                return timeTraveller.now().addMonths(12);
            },
            'should return a date as many months in the future' : function (date) {
                var actual = new Date().getYear();
                var modified = date.getYear();
                (modified - actual).should.equal(1);
            }
        },
        'When calling addMonths with a negative value':{
            topic: function (timeTraveller) {
                return timeTraveller.now().addMonths(-12);
            },
            'should return a date as many months in the pass' : function (date) {
                var actual = new Date().getYear();
                var modified = date.getYear();
                (actual- modified).should.equal(1);
            }
        }
    }
})

.export(module);