//=============================================================================
//
//  TyteElementBase Class
//
//=============================================================================

/**
 * @constructor
 * @param {...*} ___something
 */
TyteDynamicNodeBase = function( ___something ){};

//_____________________________________________________________________________
//
//  Export to package global
//_____________________________________________________________________________
//

/**
 * 
 * @param {string} tagName 
 * @return {!Tyte.Class}
 */
m_createTyteElementClass = function( tagName ){
    return TyteElementBase_CLASSES[ tagName ] = TyteElementBase_CLASSES[ tagName ] || TyteElementBase_createClass( tagName );
};

//_____________________________________________________________________________
//
//  private
//_____________________________________________________________________________
//

/**
 * @const {!Object.<string, !Tyte.Class>}
 */
var TyteElementBase_CLASSES = {};

/**
 * 
 * @param {string} tagName 
 * @return {!Tyte.Class}
 */
function TyteElementBase_createClass( tagName ){
    /**
     * @constructor
     * @extends TyteElementBase
     * @param {!Tyte.Attrs=} opt_attrs
     * @param {...(!Tyte.CanHasParent|string|number)} ___tyteNodes
     */
    function TyteElement( opt_attrs, ___tyteNodes ){
        return TyteElementBase_init( this, TyteElement, arguments );
    };

    var traits = new TyteElementBase;
    traits._tagName    = tagName;
    traits.constructor = TyteElement;

    TyteElement.prototype = traits;
    return TyteElement;
};

/**
 * 
 * @param {!TyteElementBase|*} _instance 
 * @param {!Tyte.Class} Class 
 * @param {!Arguments} _args 
 * @return {!TyteElementBase}
 */
function TyteElementBase_init( _instance, Class, _args ){
    var instance = /** @type {!TyteElementBase} */ (m_getInstance( _instance, Class )),
        args = m_argumentsToArray( _args ),
        attrs = args[ 0 ], property;

    if( attrs && typeof attrs === 'object' && !m_isTyteNode( attrs ) ){
        for( property in attrs ){
            instance.setAttr( property, attrs[ property ] );
        };
        args.shift();
    };

    if( args.length ){
        instance.appendNode.apply( instance, args );
    };
    return instance;
};

/**
 * @private
 * @type {!Tyte.Attrs|null}
 */
TyteElementBase.prototype._attrs = null;

/**
 * @private
 * @type {!Array.<!Tyte.CanHasParent>|null}
 */
TyteElementBase.prototype._childNodes = null;

//_____________________________________________________________________________
//
//  TyteElementBase public
//_____________________________________________________________________________
//

/**
 * @type {number}
 */
TyteElementBase.prototype.nodeType = TYTE_NODE_TYPE.ELEMENT_NODE;

/**
 * @type {!Tyte.CanHasChildren|null}
 */
TyteElementBase.prototype.parent = null;

//_____________________________________________________________________________
//
//  TyteElementBase Walk
//_____________________________________________________________________________
//

TyteElementBase.prototype.walkNodes = TyteTextNode.prototype.walkNodes;

TyteElementBase.prototype.walkTextNodes = TyteTextNode.prototype.walkTextNodes;

TyteElementBase.prototype.walkElements = m_CanHasChildren_walkElements;

//_____________________________________________________________________________
//
//  TyteElementBase Selector
//_____________________________________________________________________________
//

TyteElementBase.prototype.getElementByID        = m_CanHasChildren_getElementByID;

TyteElementBase.prototype.getElementListByTag   = m_CanHasChildren_getElementListByTag;

TyteElementBase.prototype.getElementListByClass = m_CanHasChildren_getElementListByClass;

TyteElementBase.prototype.getElementListByName  = m_CanHasChildren_getElementListByName;

TyteElementBase.prototype.getFirstChild         = m_CanHasChildren_getFirstChild;

TyteElementBase.prototype.getLastChild          = m_CanHasChildren_getLastChild;

TyteElementBase.prototype.getChildNodes         = m_CanHasChildren_getChildNodes;

TyteElementBase.prototype.getChildElements      = m_CanHasChildren_getChildElements;

//_____________________________________________________________________________
//
//  TyteElementBase Manipulation
//_____________________________________________________________________________
//

TyteElementBase.prototype.appendNode  = m_CanHasChildren_appendNode;

TyteElementBase.prototype.prependNode = m_CanHasChildren_prependNode;

TyteElementBase.prototype.empty       = m_CanHasChildren_empty;

TyteElementBase.prototype.getPrev     = TyteTextNode.prototype.getPrev;

TyteElementBase.prototype.setPrev     = TyteTextNode.prototype.setPrev;

TyteElementBase.prototype.getNext     = TyteTextNode.prototype.getNext;

TyteElementBase.prototype.setNext     = TyteTextNode.prototype.setNext;

TyteElementBase.prototype.swap        = TyteTextNode.prototype.swap;

TyteElementBase.prototype.remove      = TyteTextNode.prototype.remove;

//_____________________________________________________________________________
//
//  TyteElementBase TextContent
//_____________________________________________________________________________
//

TyteElementBase.prototype.getTextContent = m_CanHasChildren_getTextContent;

TyteElementBase.prototype.setTextContent = m_CanHasChildren_setTextContent;

//_____________________________________________________________________________
//
//  TyteElementBase Other
//_____________________________________________________________________________
//

/**
 * @param {boolean=} deepCopy
 * @return {!Tyte.AllNode} newNode
 */
TyteElementBase.prototype.clone = function( deepCopy ){
    var Class = this.constructor,
        clonedNode;

    if( this._attrs ){
        clonedNode = new Class( m_deepCopy( this._attrs ) );
    } else {
        clonedNode = new Class();
    };

    if( deepCopy ){
        var childNodes = this._childNodes,
            i = 0, l;

        if( childNodes ){
            for( l = childNodes.length; i < l; ++i ){
                clonedNode.appendNode( childNodes[ i ].clone( true ) );
            };
        };
    };
    return clonedNode;
};
