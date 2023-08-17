//=============================================================================
//
//  Export to packageGlobal
//
//=============================================================================

/**
 * 
 * @param {string|!Tyte.DynamicNodeRenderer} tagOrFunction
 * @return {!Tyte.Class|undefined}
 */
p_Tyte = function( tagOrFunction ){
    if( typeof tagOrFunction === 'function' ){
        return m_createDynamicNodeClass( /** @type {!Tyte.DynamicNodeRenderer} */ (tagOrFunction) );
    } else if( typeof tagOrFunction === 'string' ){
        return m_createTyteElementClass( /** @type {string} */ (tagOrFunction) );
    };
};

if( DEFINE_TYTE__EXPORT ){
    module.exports = p_Tyte;
};


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
 * @param {...(!Tyte.CanHasParent|string)} ___tyteNodes
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
 * @param {!function(!Tyte.AllNode):(boolean|undefined)} func
 * @return {!Tyte.AllNode} this
 */
TyteTextNode.prototype.walkNodes = TyteElementBase.prototype.walkNodes = TyteDocumentFragment.prototype.walkNodes = function( func ){
    m_walkNodes( this, func );
    return this;
};

/**
 * @param {!function(!TyteTextNode):(boolean|undefined)} func
 * @return {!Tyte.AllNode} this
 */
TyteTextNode.prototype.walkTextNodes = TyteElementBase.prototype.walkTextNodes = TyteDocumentFragment.prototype.walkTextNodes = function( func ){
    m_walkTextNodes( this, func );
    return this;
};

/**
 * @param {!function(!TyteElementBase):(boolean|undefined)} func
 * @return {!Tyte.AllNode} this
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
var m_createTyteElementClass;

var m_createDynamicNodeClass;

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
 * @param {Tyte.RenderingParam=} renderingParam
 * @return {string} 
 */
function m_objToCSSText( style, tyteNode, renderingParam ){
    var cssText = [], i = -1, property, value;

    for( property in style ){
        value = style[ property ];
        if( typeof value === 'function' ){
            value = /** @type {!Tyte.StyleRenderer} */ (value).call( tyteNode, renderingParam, property );
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
    return !!tyteNode && (
            tyteNode.walkNodes === TyteTextNode.prototype.walkNodes || // Text | Element | DocumentFragment
            tyteNode.getPrev === TyteTextNode.prototype.getPrev // DynamicNode
        );
};

/**
 * @param {!Tyte.AllNode} tyteNode
 * @param {!function(!Tyte.AllNode):(boolean|undefined)} func
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
 * @param {!Tyte.AllNode} tyteNode
 * @param {!function(!TyteTextNode):(boolean|undefined)} func
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
 * @param {!Tyte.CanHasChildren} tyteNode
 * @param {!function(!TyteElementBase):(boolean|undefined)} func
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
 * @param {!Tyte.AllNode|*} instance 
 * @param {!Tyte.Class} Class
 * @return {!Tyte.AllNode}
 */
function m_getInstance( instance, Class ){
    if( !instance || instance.constructor !== Class ){
        instance = new Class();
    };
    return /** @type {!Tyte.AllNode} */ (instance);
};

/**
 * @param {!Tyte.CanHasParent} tyteNode
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
 * @param {!Array.<!Tyte.AllNode|string>} args
 * @param {!Tyte.CanHasChildren} parentNode
 * @return {!Array.<!Tyte.CanHasParent>}
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
        childNode = /** @type {!Tyte.CanHasParent} */ (args[ --i ]);

        currentParent = childNode.parent;

        if( currentParent ){
            currentParent._childNodes.splice( m_getMyIndex( childNode ), 1 );
        };
        childNode.parent = parentNode;
    };
    return /** @type {!Array.<!Tyte.CanHasParent>} */ (args);
};

/**
 * @param {Arguments} args
 * @return {!Array.<!Tyte.Attrs|!Tyte.CanHasParent|string>}
 */
function m_argumentsToArray( args ){
    return /** @type {!Array.<!Tyte.Attrs|!Tyte.CanHasParent|string>} */ (Array.prototype.slice.call( args ));
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