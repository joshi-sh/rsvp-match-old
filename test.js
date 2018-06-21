import test from 'ava';
import * as match from './match.js';

let defaultMatchFunction = match.match();

[
    {name: 'Any object with wildcard', object: {x: 0, y: 0}, pattern: match._, expected: {}},
    {name: 'Objects with different types', object: 0, pattern: false, expected: false},
    {name: 'Number against same', object: 1, pattern: 1, expected: {}},
    {name: 'Number against different', object: 1, pattern: 2, expected: false},
    {name: 'Boolean against same', object: true, pattern: true, expected: {}},
    {name: 'Boolean against different', object: true, pattern: false, expected: false},
    {name: 'String against same', object: 'foo', pattern: 'foo', expected: {}},
    {name: 'String against different', object: 'foo', pattern: 'bar', expected: false}
].forEach(({name, object, pattern, expected}) => {
    test(name, t => t.deepEqual(defaultMatchFunction(object, pattern), expected));
});
