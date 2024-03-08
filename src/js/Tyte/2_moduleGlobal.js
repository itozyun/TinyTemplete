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

if( DEFINE_TYTE__FROM_VIRTUAL_DOM ){
    /**
     * parse5 の Virtual DOM Object を取り込んで Tyte Style の DOM API で操作できるようにする
     * @param {!Object} vdom
     * @return {!TyteTextNode|!TyteElementBase|!TyteDocumentFragment}
     */
    p_Tyte.fromVDOM = function( vdom ){

    };
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
            cssText[ ++i ] = m_toSnakeCase( property ) + ':' + value;
        };
    };

    return cssText.join( ';' );
};

/**
 * 
 * @param {string} str 
 * @return {string}
 */
function m_toSnakeCase( str ){
    var result = [],
        chars  = str.split( '' ),
        i      = chars.length,
        chr;

    while( i ){
        chr = chars[ --i ];
        if( 'A' <= chr && chr <= 'Z' ){
            chr = '-' + chr.toLowerCase();
        };
        result[ i ] = chr;
    };
    return result.join( '' );
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
 *
 * @param {!Tyte.AllNode} tyteNode
 * @param {!Node} node
 */
function m_maybeRendered( tyteNode, node ){
    if( node.nodeType === 3 && tyteNode.nodeType !== TYTE_NODE_TYPE.TEXT_NODE ){
        throw "nodeType missmatch!";
    } else if( node.nodeType === 1 ){
        if( tyteNode.nodeType !== TYTE_NODE_TYPE.ELEMENT_NODE ){
            throw "nodeType missmatch!";
        } else if( tyteNode._tagName.toUpperCase() !== node.tagName.toUpperCase() ){
            throw "tagName missmatch!";
        } else if( !tyteNode.getChildNodes() ){
            if( node.childNodes.length ){
                if( node.childNodes.length !== 1 || node.childNodes[ 0 ].nodeType !== 3 ){ // 1つのテキストノードは許容
                    throw "childNodes.length missmatch!";
                };
            };
        } else if( tyteNode.getChildNodes().length < node.childNodes.length ){ // TextNode が Real DOM には居ないことを許容する
            throw "childNodes.length missmatch!";
        };
    };
};

/**
 * @param {!function(*,!Function,!Node=):(boolean|undefined)} walkFunction
 * @param {!Tyte.AllNode} tyteNode
 * @param {!function(*,*=):(boolean|undefined)} func
 * @param {!Node|void} opt_node
 * @return {boolean|void}
 */
function m_walkChildren( walkFunction, tyteNode, func, opt_node ){
    var tyteChildNodes = tyteNode._childNodes,
        i = 0, l, realChildNodes, tyteChildNode, realChildNode, textNode;

    if( tyteChildNodes ){
        if( DEFINE_TYTE__USE_RENDER_DOM && opt_node ){
            for( l = tyteChildNodes.length, realChildNodes = opt_node.childNodes; i < l; ++i ){
                tyteChildNode = tyteChildNodes[ i ];
                realChildNode = realChildNodes[ i ];
                if( tyteChildNode.nodeType === TYTE_NODE_TYPE.TEXT_NODE && ( !realChildNode || realChildNode.nodeType !== 3 ) ){ // Text は Real DOM には存在しない場合がある
                    textNode = document.createTextNode( '' );
                    if( realChildNode ){
                        opt_node.insertBefore( textNode, realChildNode );
                        realChildNode = textNode;
                    } else {
                        opt_node.appendChild( textNode );
                        realChildNode = textNode;
                    };
                };
                if( walkFunction( tyteChildNode, func, realChildNode ) ){
                    return true;
                };
            };
        } else {
            for( l = tyteChildNodes.length; i < l; ++i ){
                if( walkFunction( tyteChildNodes[ i ], func ) ){
                    return true;
                };
            };
        };
    };
};

/**
 * @param {!Tyte.AllNode} tyteNode
 * @param {!function(!Tyte.AllNode,!Node=):(boolean|undefined)} func
 * @param {!Node=} opt_node To search Real Node and templete Node simultaneously(only renderDOM)
 * @return {boolean|void}
 */
function m_walkNodes( tyteNode, func, opt_node ){
    if( DEFINE_TYTE__DEBUG && opt_node ){
        m_maybeRendered( tyteNode, opt_node );
    };

    if( ( DEFINE_TYTE__USE_RENDER_DOM ? func( tyteNode, /** @type {!Node|void} */ (opt_node) ) : func( tyteNode ) ) === true ){
        return true;
    };

    return m_walkChildren(
            /** @type {!function(*,!Function,!Node=):(boolean|undefined)} */ (m_walkNodes),
            tyteNode,
            /** @type {!function(*,*=):(boolean|undefined)} */ (func),
            opt_node
        );
};

/**
 * @param {!Tyte.AllNode} tyteNode
 * @param {!function(!TyteTextNode,!Text=):(boolean|undefined)} func
 * @param {!Node=} opt_node To search Real Node and templete Node simultaneously(only renderDOM)
 * @return {boolean|void}
 */
function m_walkTextNodes( tyteNode, func, opt_node ){
    if( DEFINE_TYTE__DEBUG && opt_node ){
        m_maybeRendered( tyteNode, opt_node );
    };

    if( tyteNode.nodeType === TYTE_NODE_TYPE.TEXT_NODE ){
        tyteNode = /** @type {!TyteTextNode} */ (tyteNode);
        if( ( DEFINE_TYTE__USE_RENDER_DOM ? func( tyteNode, /** @type {!Text|void} */ (opt_node) ) : func( tyteNode ) ) === true ){
            return true;
        };
    } else {
        return m_walkChildren(
            /** @type {!function(*,!Function,!Node=):(boolean|undefined)} */ (m_walkTextNodes),
            tyteNode,
            /** @type {!function(*,*=):(boolean|undefined)} */ (func),
            opt_node
        );
    };
};

/**
 * @param {!Tyte.CanHasChildren} tyteNode
 * @param {!function(!TyteElementBase,!Element=):(boolean|undefined)} func
 * @param {!Node=} opt_node To search Real Node and templete Node simultaneously(only renderDOM)
 * @return {boolean|void}
 */
function m_walkElements( tyteNode, func, opt_node ){
    if( DEFINE_TYTE__DEBUG && opt_node ){
        m_maybeRendered( tyteNode, opt_node );
    };

    if( tyteNode.nodeType === TYTE_NODE_TYPE.ELEMENT_NODE ){
        tyteNode = /** @type {!TyteElementBase} */ (tyteNode);
        if( ( DEFINE_TYTE__USE_RENDER_DOM ? func( tyteNode, /** @type {!Element|void} */ (opt_node) ) : func( tyteNode ) ) === true ){
            return true;
        };
    };

    return m_walkChildren(
        /** @type {!function(*,!Function,!Node=):(boolean|undefined)} */ (m_walkElements),
        tyteNode,
        /** @type {!function(*,*=):(boolean|undefined)} */ (func),
        opt_node
    );
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
 * @param {!Array.<!Tyte.AllNode|string|number>} args
 * @param {!Tyte.CanHasChildren} parentNode
 * @return {!Array.<!Tyte.CanHasParent>}
 */
function m_preprocessInsertNode( args, parentNode ){
    var i = args.length, arg, childNodes, childNode, currentParent;

    for( ; i; ){
        arg = args[ --i ];
        if( typeof arg === 'string' || typeof arg === 'number' ){
            args[ i ] = new TyteTextNode( arg );
        } else if( !DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT && arg.nodeType === TYTE_NODE_TYPE.DOCUMENT_FRAGMENT_NODE ){
            childNodes = /** @type {!Array} */ (arg._childNodes);
            if( childNodes && childNodes.length ){
                childNodes.unshift( i, 1 );
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
 * @return {!Array.<!Tyte.Attrs|!Tyte.CanHasParent|string|number>}
 */
function m_argumentsToArray( args ){
    return /** @type {!Array.<!Tyte.Attrs|!Tyte.CanHasParent|string|number>} */ (Array.prototype.slice.call( args ));
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
