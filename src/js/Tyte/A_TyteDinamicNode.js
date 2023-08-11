//=============================================================================
//
//  TyteDynamicNodeBase Class
//
//=============================================================================

//_____________________________________________________________________________
//
//  Export to package global
//_____________________________________________________________________________
//

/**
 * 
 * @param {!DynamicNodeFunction} func 
 * @return {Class}
 */
/* p_createTyteNodeClass = function( func ){
    return TyteDynamicNodeBase_createClass( func );
}; */

//_____________________________________________________________________________
//
//  private
//_____________________________________________________________________________
//

/**
 * @const {!Object.<string, Class>}
 */
var TyteDynamicNodeBase_CLASSES = {};

/**
 * 
 * @param {!DynamicNodeFunction} func 
 * @return {Class}
 */
function TyteDynamicNodeBase_createClass( func ){
    /**
     * @constructor
     * @extends TyteDynamicNodeBase
     */
    function TyteDynamicNode(){
        return TyteDynamicNodeBase_init( this, TyteDynamicNode, arguments );
    };

    var traits = new TyteDynamicNodeBase;
    traits._func    = func;
    traits.constructor = TyteDynamicNode;

    TyteDynamicNode.prototype = traits;
    return TyteDynamicNode;
};

/**
 * 
 * @param {!TyteDynamicNodeBase|*} _instance 
 * @param {!Function} Class 
 * @param {!Arguments} _args 
 * @return {!TyteDynamicNodeBase}
 */
function TyteDynamicNodeBase_init( _instance, Class, _args ){
    var instance = /** @type {!TyteDynamicNodeBase} */ (m_getInstance( _instance, Class ));

    instance.args = /** @type {!Array} */ (m_argumentsToArray( _args ));
    return instance;
};

//_____________________________________________________________________________
//
//  TyteDynamicNodeBase private
//_____________________________________________________________________________
//

/**
 * @type {!DynamicNodeFunction|null}
 */
TyteDynamicNodeBase.prototype._func = null;

/**
 * @type {Array}
 */
TyteDynamicNodeBase.prototype.args = null;

//_____________________________________________________________________________
//
//  TyteDynamicNodeBase public
//_____________________________________________________________________________
//

/**
 * @type {number}
 */
TyteDynamicNodeBase.prototype.nodeType = TYTE_NODE_TYPE.DYNAMIC_NODE;

/**
 * @type {!TyteElementBase|TyteDocumentFragment|null}
 */
TyteDynamicNodeBase.prototype.parent = null;

//_____________________________________________________________________________
//
//  TyteDynamicNodeBase Manipulation
//_____________________________________________________________________________
//

TyteDynamicNodeBase.prototype.getPrev = TyteTextNode.prototype.getPrev;

TyteDynamicNodeBase.prototype.setPrev = TyteTextNode.prototype.setPrev;

TyteDynamicNodeBase.prototype.getNext = TyteTextNode.prototype.getNext;

TyteDynamicNodeBase.prototype.setNext = TyteTextNode.prototype.setNext;

TyteDynamicNodeBase.prototype.swap    = TyteTextNode.prototype.swap;

TyteDynamicNodeBase.prototype.remove  = TyteTextNode.prototype.remove;

//_____________________________________________________________________________
//
//  TyteDynamicNodeBase Other
//_____________________________________________________________________________
//

/**
 * @param {boolean=} deepCopy
 * @return {!TyteNode} newNode
 */
TyteDynamicNodeBase.prototype.clone = function( deepCopy ){
    var Class = this.constructor,
        clonedNode = new Class();

    clonedNode.args = this.args;
    return clonedNode;
};


/**
 * @param {RenderingContext} renderingContext
 * @return {!TyteNode|string|number} newNode
 */
TyteDynamicNodeBase.prototype._compute = function( renderingContext ){
    return this._func( renderingContext );
};
