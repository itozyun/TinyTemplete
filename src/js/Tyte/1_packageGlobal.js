/** @typedef {!Function} */
var Class;

/**
 * 
 * @param {string=} tags
 * @return {!Object.<string,Class>}}
 */
function p_Tyte( tags ){
    var Tyte = { Text : TyteTextNode, DocumentFragment : TyteDocumentFragment };

    if( tags ){
        var tagList = tags.split( ',' ),
            i = 0, l = tagList.length, tag;

        for( ; i < l; ++i ){
            tag = tagList[ i ];
            if( tag ){
                Tyte[ tag ] = p_createTyteNodeClass( tag );
            };
        };
    };
    return Tyte;
};

var p_createTyteNodeClass;

/** @class */
var TyteTextNode;
/** @class */
var TyteDocumentFragment;
/** @class */
var TyteDynamicNodeBase;

/** @typedef {*} */
var RenderingContext;

/** @typedef {!function(RenderingContext,string):(!Object|string|number|null|undefined)} */
var DynamicAttributeFunction;

/** @typedef {!Object.<string,(string|number|!DynamicAttributeFunction|boolean)>} */
var TyteAttrs;

/**s
 * @constructor
 * @param {!TyteAttrs=} opt_attrs
 * @param {...(!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase|string)} ___tyteNodes
 */
function TyteElementBase( opt_attrs, ___tyteNodes ){};

if( DEFINE_TYTE__EXPORT ){
    module.exports = p_Tyte;
};