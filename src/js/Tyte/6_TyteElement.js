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
 * @return {Class}
 */
p_createTyteNodeClass = function( tagName ){
    return TyteElementBase_CLASSES[ tagName ] = TyteElementBase_CLASSES[ tagName ] || TyteElementBase_createClass( tagName );
};

//_____________________________________________________________________________
//
//  private
//_____________________________________________________________________________
//

/**
 * @const {!Object.<string, Class>}
 */
var TyteElementBase_CLASSES = {};

/**
 * 
 * @param {string} tagName 
 * @return {Class}
 */
function TyteElementBase_createClass( tagName ){
    /**
     * @constructor
     * @extends TyteElementBase
     * @param {!TyteAttrs=} opt_attrs
     * @param {...(!TyteTextNode|!TyteElementBase|string)} ___tyteNodes
     */
    function TyteClass( opt_attrs, ___tyteNodes ){
        return TyteElementBase_init( this, TyteClass, arguments );
    };

    TyteClass.prototype = new TyteElementBase;
    TyteClass.prototype._tagName = tagName;
    TyteClass.prototype.constructor = TyteClass;
    return TyteClass;
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
        instance._childNodes = m_stringToTextNodeAndFlattenDocumentFragment( args );
    };
    return instance;
};

/**
 * @private
 * @type {!TyteAttrs|null}
 */
TyteElementBase.prototype._attrs = null;

/**
 * @private
 * @type {!Array.<!TyteTextNode|!TyteElementBase>|null}
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
 * @type {!TyteElementBase|null}
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

TyteElementBase.prototype.ready = TyteTextNode.prototype.ready;

TyteElementBase.prototype.clone = TyteTextNode.prototype.clone;
