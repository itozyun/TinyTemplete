
//=============================================================================
//
//  Classes
//
//=============================================================================

/**
 * @constructor
 * @param {string} text
 */
TyteTextNode = function( text ){
    var instance = /** @type {!TyteTextNode} */ (m_getInstance( this, TyteTextNode ));

    instance.text = text;

    return instance;
};

/**
 * @constructor
 * @param {...(!TyteTextNode|!TyteElementBase|string)} ___tyteNodes
 */
TyteDocumentFragment = function( ___tyteNodes ){
    var instance = /** @type {!TyteDocumentFragment} */ (m_getInstance( this, TyteDocumentFragment ));

    return instance.appendNode.apply( instance, m_argumentsToArray( arguments ) );
};

/**
 * @constructor
 * @param {...*} ___something
 */
TyteDynamicNodeBase = function( ___something ){};

/**
 * @param {function(!TyteNode,(!TyteElementBase|!TyteDocumentFragment)=):(boolean|undefined)} func
 * @return {!TyteNode} this
 */
TyteTextNode.prototype.walkNodes = TyteElementBase.prototype.walkNodes = TyteDocumentFragment.prototype.walkNodes = function( func ){
    m_walkNodes( this, func );
    return this;
};

/**
 * @param {function(!TyteTextNode,(!TyteElementBase|!TyteDocumentFragment)=):(boolean|undefined)} func
 * @return {!TyteNode} this
 */
TyteTextNode.prototype.walkTextNodes = TyteElementBase.prototype.walkTextNodes = TyteDocumentFragment.prototype.walkTextNodes = function( func ){
    m_walkTextNodes( this, func );
    return this;
};

/**
 * @param {function(!TyteElementBase,(!TyteElementBase|!TyteDocumentFragment)=):(boolean|undefined)} func
 * @return {!TyteNode} this
 */
TyteElementBase.prototype.walkElements = TyteDocumentFragment.prototype.walkNodes = function( func ){
    m_walkElements( this, func );
    return this;
};

//=============================================================================
//
//  ...
//
//=============================================================================
/** @typedef {!function(RenderingContext):(!TyteTextNode|!TyteElementBase|!TyteDocumentFragment|string)} */
var DynamicNodeFunction;

/** @typedef {!function(RenderingContext,string):(string|number|null|undefined)} */
var DynamicStyleFunction;

/** @typedef {!TyteTextNode|!TyteElementBase|!TyteDocumentFragment|!TyteDynamicNodeBase} */
var TyteNode;

/** @const */
var m_RENAME_ATTRIBUTES = { className : 'class', htmlFor : 'for' };

//=============================================================================
//
//  Utilities
//
//=============================================================================

/**
 * 
 * @param {!Object} style 
 * @return {string} 
 */
function m_objToCSSText( style ){
    var cssText = [], i = -1, property;

    for( property in style ){
        cssText[ ++i ] = property + ':' + style[ property ]; // TODO function & snake case
    };

    return cssText.join( ';' );
};

/**
 * 
 * @param {*} tyteNode 
 * @return {boolean}
 */
function m_isTyteNode( tyteNode ){
    return !!tyteNode && ( tyteNode.walkNodes === TyteTextNode.prototype.walkNodes );
};

/**
 * @param {!TyteNode} tyteNode
 * @param {function(!TyteNode,(!TyteElementBase|!TyteDocumentFragment)=):(boolean|undefined)} func
 */
function m_walkNodes( tyteNode, func ){
    if( func( tyteNode ) === true ){
        return true;
    };

    var childNodes = tyteNode._childNodes,
        i = 0, l;

    if( childNodes ){
        for( l = childNodes.length; i < l; ++i ){
            if( m_walkNodes( childNodes[ i ], func ) ){
                return true;
            };
        };
    };
};

/**
 * @param {!TyteNode} tyteNode
 * @param {function(!TyteTextNode,(!TyteElementBase|!TyteDocumentFragment)=):(boolean|undefined)} func
 */
function m_walkTextNodes( tyteNode, func ){
    if( tyteNode.nodeType === TYTE_NODE_TYPE.TEXT_NODE ){
        if( func( /** @type {!TyteTextNode} */ (tyteNode) ) === true ){
            return true;
        };
    } else {
        var childNodes = tyteNode._childNodes,
            i = 0, l;

        if( childNodes ){
            for( l = childNodes.length; i < l; ++i ){
                if( m_walkTextNodes( childNodes[ i ], func ) ){
                    return true;
                };
            };
        };
    };
};

/**
 * @param {!TyteElementBase|!TyteDocumentFragment} tyteNode
 * @param {function(!TyteElementBase,(!TyteElementBase|!TyteDocumentFragment)=):(boolean|undefined)} func
 */
function m_walkElements( tyteNode, func ){
    if( tyteNode.nodeType === TYTE_NODE_TYPE.ELEMENT_NODE ){
        if( func( /** @type {!TyteElementBase} */ (tyteNode) ) === true ){
            return true;
        };
    };

    var childNodes = tyteNode._childNodes,
        i = 0, l, childNode;

    if( childNodes ){
        for( l = childNodes.length; i < l; ++i ){
            childNode = childNodes[ i ];
            if( childNode.nodeType === TYTE_NODE_TYPE.ELEMENT_NODE ){
                if( m_walkElements( /** @type {!TyteElementBase} */ (childNode), func ) ){
                    return true;
                };
            };
        };
    };
};

/**
 * 
 * @param {!TyteNode|*} instance 
 * @param {!Class} Class
 * @return {!TyteNode}
 */
function m_getInstance( instance, Class ){
    if( !instance || instance.constructor !== Class ){
        instance = new Class();
    };
    return /** @type {!TyteNode} */ (instance);
};

/**
 * @param {!TyteTextNode|!TyteElementBase} currentNode
 * @param {!TyteElementBase|!TyteDocumentFragment|null} parentNode
 */
function m_updateParentNode( currentNode, parentNode ){
    var currentParent = currentNode.parent;

    if( currentParent ){
        currentParent._childNodes.splice( m_getMyIndex( currentNode ), 1 );
    };
    currentNode.parent = parentNode;
};

/**
 * @param {!Array.<!TyteTextNode|!TyteElementBase>} newChildNodes
 * @param {!TyteElementBase|!TyteDocumentFragment} parentNode
 */
function m_updateParentOfNewChildNodes( newChildNodes, parentNode ){
    var i = 0, l = newChildNodes.length, childNode;
    
    for( ; i < l; ++i ){
        childNode = newChildNodes[ i ];
        m_updateParentNode( childNode, parentNode );
    };
};

/**
 * @param {!TyteElementBase|!TyteTextNode} tyteNode
 * @return {number}
 */
function m_getMyIndex( tyteNode ){
    var parent = tyteNode.parent,
        childNodes;

    if( parent ){
        childNodes = parent._childNodes;
        return childNodes.indexOf( tyteNode );
    };
    return -1;
};

/**
 * 1. string を TyteTextNode へ
 * 2. DocumentFragment を解除して childNodes を展開
 * @param {!Array.<!TyteNode|string>} args
 * @return {!Array.<!TyteTextNode|!TyteElementBase>}
 */
function m_stringToTextNodeAndFlattenDocumentFragment( args ){
    for( var i = args.length, arg, childNodes; i; ){
        arg = args[ --i ];
        if( typeof arg === 'string' ){
            args[ i ] = new TyteTextNode( arg );
        } else if( arg.nodeType === TYTE_NODE_TYPE.DOCUMENT_FRAGMENT ){
            childNodes = /** @type {!Array} */ (arg._childNodes);
            if( childNodes && childNodes.length ){
                childNodes.unshift( i, 0 );
                args.splice.apply( args, childNodes );
            };
        };
    };
    return /** @type {!Array.<!TyteTextNode|!TyteElementBase>} */ (args);
};

/**
 * @param {Arguments} args
 * @return {!Array.<!TyteAttrs|!TyteTextNode|!TyteElementBase|string>}
 */
function m_argumentsToArray( args ){
    return /** @type {!Array.<!TyteAttrs|!TyteTextNode|!TyteElementBase|string>} */ (Array.prototype.slice.call( args ));
};

/**
 * 
 * @param {!Object|null} srcObject
 * @return {!Object|null}
 */
function m_deepCopy( srcObject ){
    var newObject = null, key, value;

    if( srcObject ){
        newObject = {};
        for( key in srcObject ){
            value = srcObject[ key ];
            if( value && typeof value === 'object' ){
                newObject[ key ] = m_deepCopy( value );
            } else {
                newObject[ key ] = value;
            };
        };
    };
    return newObject;
};

/**
 * 
 * @param {string} text
 * @return {string}
 */
function m_escapeForHTML( text ){
    return text.split( '<' ).join( '&lt;' ).split( '>' ).join( '&gt;' );
};

/**
 * 
 * @param {string} text
 * @return {string}
 */
function m_escapeForAttribute( text ){
    return m_escapeForHTML( text ).split( '"' ).join( '\\"' );
};