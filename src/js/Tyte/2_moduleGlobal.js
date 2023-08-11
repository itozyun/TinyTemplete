
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

p_Tyte.Text = TyteTextNode;

/**
 * @constructor
 * @param {...(!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase|string)} ___tyteNodes
 */
TyteDocumentFragment = function( ___tyteNodes ){
    var instance = /** @type {!TyteDocumentFragment} */ (m_getInstance( this, TyteDocumentFragment ));

    return instance.appendNode.apply( instance, m_argumentsToArray( arguments ) );
};

p_Tyte.DocumentFragment = TyteDocumentFragment;

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

/** @typedef {!function(this:TyteElementBase,RenderingContext,string):(string|number|null|undefined)} */
var DynamicStyleFunction;

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
 * @param {!TyteElementBase} tyteNode
 * @param {RenderingContext=} renderingContext
 * @return {string} 
 */
function m_objToCSSText( style, tyteNode, renderingContext ){
    var cssText = [], i = -1, property, value;

    for( property in style ){
        value = style[ property ];
        if( typeof value === 'function' ){
            value = /** @type {!DynamicStyleFunction} */ (value).call( tyteNode, renderingContext, property );
        };
        if( value != null ){
            cssText[ ++i ] = property + ':' + value; // TODO function & snake case
        };
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
 * @param {!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase} tyteNode
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
 * @param {!TyteElementBase|!TyteDocumentFragment} parentNode
 * @return {!Array.<!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase>}
 */
function m_preprocessInsertNode( args, parentNode ){
    var i = args.length, arg, childNodes, childNode, currentParent;

    for( ; i; ){
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
    for( i = args.length; i ; ){
        childNode = /** @type {!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase} */ (args[ --i ]);

        currentParent = childNode.parent;

        if( currentParent ){
            currentParent._childNodes.splice( m_getMyIndex( childNode ), 1 );
        };
        childNode.parent = parentNode;
    };
    return /** @type {!Array.<!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase>} */ (args);
};

/**
 * @param {Arguments} args
 * @return {!Array.<!TyteAttrs|!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase|string>}
 */
function m_argumentsToArray( args ){
    return /** @type {!Array.<!TyteAttrs|!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase|string>} */ (Array.prototype.slice.call( args ));
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