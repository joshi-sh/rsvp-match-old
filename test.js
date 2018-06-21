import test from 'ava';
import * as match from './match.js';

let defaultMatchFunction = match.match;

[
    {name: 'Any object with wildcard', object: {x: 0, y: 0}, pattern: match._, expected: {}},
    {name: 'Objects with different types', object: 0, pattern: false, expected: false},
    {name: 'Number against same', object: 1, pattern: 1, expected: {}},
    {name: 'Number against different', object: 1, pattern: 2, expected: false},
    {name: 'Boolean against same', object: true, pattern: true, expected: {}},
    {name: 'Boolean against different', object: true, pattern: false, expected: false},
    {name: 'String against same', object: 'foo', pattern: 'foo', expected: {}},
    {name: 'String against different', object: 'foo', pattern: 'bar', expected: false},
    {name: 'Array of primitives', object: [0, true, ''], pattern: [0, true, ''], expected: [{}, {}, {}]},
    {name: 'Array of primitives against superset', object: [0, true, ''], pattern: [0, true, '', match._], expected: false},
    {name: 'Array of primitives against different', object: [0, true, ''], pattern: ['foo'], expected: false}
].forEach(({name, object, pattern, expected}) => {
    test(name, t => t.deepEqual(defaultMatchFunction(object, pattern), expected));
});
