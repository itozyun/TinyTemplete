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
 * @param {!Tyte.DynamicNodeRenderer} func 
 * @return {!Tyte.Class}
 */
m_createDynamicNodeClass = function( func ){
    return TyteDynamicNodeBase_createClass( func );
};

//_____________________________________________________________________________
//
//  private
//_____________________________________________________________________________
//

/**
 * 
 * @param {!Tyte.DynamicNodeRenderer} func 
 * @return {!Tyte.Class}
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
    traits._renderer   = func;
    traits.constructor = TyteDynamicNode;

    TyteDynamicNode.prototype = traits;
    return TyteDynamicNode;
};

/**
 * 
 * @param {!TyteDynamicNodeBase|*} _instance 
 * @param {!Tyte.Class} Class 
 * @param {!Arguments} _initialParams 
 * @return {!TyteDynamicNodeBase}
 */
function TyteDynamicNodeBase_init( _instance, Class, _initialParams ){
    var instance = /** @type {!TyteDynamicNodeBase} */ (m_getInstance( _instance, Class ));

    instance.initialParams = /** @type {!Array} */ (m_argumentsToArray( _initialParams ));
    return instance;
};

//_____________________________________________________________________________
//
//  TyteDynamicNodeBase private
//_____________________________________________________________________________
//

/**
 * @type {!Tyte.DynamicNodeRenderer|null}
 */
TyteDynamicNodeBase.prototype._renderer = null;

//_____________________________________________________________________________
//
//  TyteDynamicNodeBase public
//_____________________________________________________________________________
//

/**
 * @type {Array}
 */
TyteDynamicNodeBase.prototype.initialParams = null;

/**
 * @type {number}
 */
TyteDynamicNodeBase.prototype.nodeType = TYTE_NODE_TYPE.DYNAMIC_NODE;

/**
 * @type {!Tyte.CanHasChildren|null}
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
 * @return {!Tyte.AllNode} newNode
 */
TyteDynamicNodeBase.prototype.clone = function( deepCopy ){
    var Class = this.constructor,
        clonedNode = new Class();

    clonedNode.initialParams = this.initialParams;
    return clonedNode;
};
