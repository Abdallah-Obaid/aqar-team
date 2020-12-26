'use strict';

require('@code-fellows/supergoose');

const categories = require('../src/auth/models/categories/categories-model');

let testObj = {
  'name': 'abdallah',
  'display_name': '****',
  'description': 'Best one in the neighbourhood',
};

describe('Categories Model', () =>{
  it('can create() a categories', ()=> {
    return categories.create(testObj)
      .then(record => {
        Object.keys(testObj).forEach(key=> {
          expect(record[key]).toEqual(testObj[key]);
        });
      });
  });

  it('can read() categories', ()=> {
    return categories.read()
      .then(results => {
        Object.keys(testObj).forEach(key=> {
          expect(results[0][key]).toEqual(testObj[key]);
        });
      });
  });

  it('can update() categories', ()=> {
    return categories.update()
      .then(results => {
        expect(results).toBeNull();
      });
  });
  
  it('can delete() categories', ()=> {
    return categories.delete()
      .then(results => {
        expect(results).toBeNull();
      });
  });
});

