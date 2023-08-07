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

var TyteTextNode, TyteDocumentFragment;

if( DEFINE_TYTE__EXPORT ){
    module.exports = p_Tyte;
};