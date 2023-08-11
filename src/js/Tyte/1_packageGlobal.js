/** @typedef {!Function} */
var Class;

/**
 * 
 * @param {string|!DynamicNodeFunction} tagOrFunction
 * @return {!Class|undefined}
 */
function p_Tyte( tagOrFunction ){
    if( typeof tagOrFunction === 'function' ){
        return p_createDynamicNodeClass( /** @type {!DynamicNodeFunction} */ (tagOrFunction) );
    } else if( typeof tagOrFunction === 'string' ){
        return p_createTyteElementClass( /** @type {string} */ (tagOrFunction) );
    };
};

var p_createTyteElementClass;

var p_createDynamicNodeClass;

/** @class */
var TyteTextNode;
/** @class */
var TyteDocumentFragment;

/**s
 * @constructor
 * @param {!TyteAttrs=} opt_attrs
 * @param {...(!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase|string)} ___tyteNodes
 */
function TyteElementBase( opt_attrs, ___tyteNodes ){};

/** @class */
var TyteDynamicNodeBase;

/** @typedef {*} */
var RenderingContext;

/** @typedef {!function(this:TyteElementBase,RenderingContext,string):(!Object|string|number|null|undefined)} */
var DynamicAttributeFunction;

/** @typedef {!Object.<string,(string|number|!DynamicAttributeFunction|boolean)>} */
var TyteAttrs;

/** @typedef {!function(this:TyteDynamicNodeBase,RenderingContext):(!TyteTextNode|!TyteElementBase|!TyteDocumentFragment|string)} */
var DynamicNodeFunction;

/** @typedef {!TyteTextNode|!TyteElementBase|!TyteDocumentFragment|!TyteDynamicNodeBase} */
var TyteNode;

if( DEFINE_TYTE__EXPORT ){
    module.exports = p_Tyte;
};