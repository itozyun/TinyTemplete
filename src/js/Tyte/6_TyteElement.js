//=============================================================================
//
//  TyteElementBase Class
//
//=============================================================================

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
     * @param {...(!Tyte.CanHasParent|string)} ___tyteNodes
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
 * @param {!Function} Class 
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
 * @type {!TyteElementBase|TyteDocumentFragment|null}
 */
TyteElementBase.prototype.parent = null;

//_____________________________________________________________________________
//
//  TyteElementBase Selector
//_____________________________________________________________________________
//

TyteElementBase.prototype.getElementByID        = TyteDocumentFragment.prototype.getElementByID;

TyteElementBase.prototype.getElementListByTag   = TyteDocumentFragment.prototype.getElementListByTag;

TyteElementBase.prototype.getElementListByClass = TyteDocumentFragment.prototype.getElementListByClass;

TyteElementBase.prototype.getElementListByName  = TyteDocumentFragment.prototype.getElementListByName;

TyteElementBase.prototype.getFirstChild         = TyteDocumentFragment.prototype.getFirstChild;

TyteElementBase.prototype.getLastChild          = TyteDocumentFragment.prototype.getLastChild;

TyteElementBase.prototype.getChildNodes         = TyteDocumentFragment.prototype.getChildNodes;

//_____________________________________________________________________________
//
//  TyteElementBase Manipulation
//_____________________________________________________________________________
//

TyteElementBase.prototype.appendNode  = TyteDocumentFragment.prototype.appendNode;

TyteElementBase.prototype.prependNode = TyteDocumentFragment.prototype.prependNode;

TyteElementBase.prototype.empty       = TyteDocumentFragment.prototype.empty;

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

TyteElementBase.prototype.getTextContent = TyteDocumentFragment.prototype.getTextContent;

TyteElementBase.prototype.setTextContent = TyteDocumentFragment.prototype.setTextContent;

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
        clonedNode = new Class(); // TYTE_NODE_TYPE.DOCUMENT_FRAGMENT_NODE
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
