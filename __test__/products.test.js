'use strict';
require('@code-fellows/supergoose');

const products = require('../src/auth/models/products/products-model');
let testObj = {
  'category': 'done',
  'name': 'abdallah',
  'display_name': '****',
  'description': 'Best one in the neighbourhood',
};

describe('products Model', () =>{
  it('can create() a products', ()=> {
    return products.create(testObj)
      .then(record => {
        console.log(record);
        Object.keys(testObj).forEach(key=> {
          expect(record[key]).toEqual(testObj[key]);
        });
      });
  });

  it('can read() products', ()=> {
    return products.read()
      .then(results => {
        Object.keys(testObj).forEach(key=> {
          expect(results[0][key]).toEqual(testObj[key]);
        });
      });
  });

  it('can update() products', ()=> {
    return products.update()
      .then(results => {
        expect(results).toBeNull();
      });
  });
  
  it('can delete() products', ()=> {
    return products.delete()
      .then(results => {
        expect(results).toBeNull();

      });
  });
});

