
/*
 * Equality operators for primitive types. Derived types are controlled by various options specified later.
 */
exports.defaultEQ = {
    number: (x, y) => x === y,
    string: (x,y) => x === y,
    boolean: (x, y) => x === y
};

exports.defaultOptions = {
    distinctNullUndefined: false, // Should null and undefined be treated as the same
    looseMatch: false, // Should an object match a template if the object has more keys than the template
    partialMatch: false, // Should an object match a template if it has fewer keys than the template
    array: {
        matchIfSubset: false, // Should an array match a template if it has fewer elements than the template
        ignoreOrder: false  // Should each element be matched only with the template in the same position
    }
};

let WildcardPattern = function(){ return this; };

exports._ = new WildcardPattern();

exports.match = function(eq = defaultEQ, options = defaultOptions){
    return function(object, template, bindings = {}){
        if(template instanceof WildcardPattern){
            return bindings;
        } else if (typeof(object) === typeof(template)) {
            // TODO: Use eq and recursively check object with the template
            return false;
        } else {
            return false;
        }
    };
};
