
/*
 * Equality operators for primitive types. Derived types are controlled by various options specified later.
 * Note that eq.key is used to compare object keys, even though this is technically for a derived type.
 */
exports.defaultEQ = {
    number: (x, y) => x === y,
    string: (x,y) => x === y,
    boolean: (x, y) => x === y,
    key: (x, y) => x === y
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

let match = function(eq = exports.defaultEQ, options = exports.defaultOptions){
    return function(object, template, bindings = {}){
        if(template instanceof WildcardPattern){
            return bindings;
        } else if (typeof(object) === typeof(template)) {
            // First, check the primitives
            // Does eq have a method to check the type of `object`?
            if(eq[typeof(object)] !== undefined){
                // If so, check the object against the template
                // Checking primitive against primitive generates no bindings
                return eq[typeof(object)](object, template) ? bindings : false;
            }
            // Next, check for arrays
            // TODO: add support for array options
            if([object, template].every(Array.isArray)){
                // First match each object[i] with template[i]
                let elementwiseMatchAttempts = 
                        object.map(function(element, index){ return (match(eq, options))(element, template[index]); });
                // Next, check that each object successfully matched the corresponding template
                if(elementwiseMatchAttempts.every(t => typeof(t) === 'object')){
                    // If so, the arrays match. Return the bindings array
                    return elementwiseMatchAttempts;
                } else return false;
            }
            return false;
        } else {
            return false;
        }
    };
};

exports.match = match;
