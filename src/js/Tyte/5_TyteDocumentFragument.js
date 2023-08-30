//=============================================================================
//
//  TyteDocumentFragment Class
//
//=============================================================================

if( !DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT ){
/**
 * @constructor
 * @param {...(!Tyte.CanHasParent|string|number)} ___tyteNodes
 */
TyteDocumentFragment = function( ___tyteNodes ){
    var instance = /** @type {!TyteDocumentFragment} */ (m_getInstance( this, TyteDocumentFragment ));

    return instance.appendNode.apply( instance, m_argumentsToArray( arguments ) );
};

p_Tyte.DocumentFragment = TyteDocumentFragment;

//_____________________________________________________________________________
//
//  TyteDocumentFragment private
//_____________________________________________________________________________
//

/**
 * @private
 * @type {!Array.<!Tyte.CanHasParent>|null}
 */
TyteDocumentFragment.prototype._childNodes = null;

//_____________________________________________________________________________
//
//  TyteDocumentFragment public
//_____________________________________________________________________________
//

/**
 * @type {number}
 */
TyteDocumentFragment.prototype.nodeType = TYTE_NODE_TYPE.DOCUMENT_FRAGMENT_NODE;

/**
 * @type {null}
 */
TyteDocumentFragment.prototype.parent = null;


TyteDocumentFragment.prototype.walkNodes     = TyteTextNode.prototype.walkNodes;
TyteDocumentFragment.prototype.walkTextNodes = TyteTextNode.prototype.walkTextNodes;
TyteDocumentFragment.prototype.walkNodes     = m_CanHasChildren_walkElements;

//_____________________________________________________________________________
//
//  TyteDocumentFragment Selector
//_____________________________________________________________________________
//

/**
 * @this {!Tyte.CanHasChildren}
 * @param {string} id
 * @return {!TyteElementBase|null}
 */
TyteDocumentFragment.prototype.getElementByID = m_CanHasChildren_getElementByID;

/**
 * @this {!Tyte.CanHasChildren}
 * @param {string} tagName
 * @return {!Array.<!TyteElementBase>}
 */
TyteDocumentFragment.prototype.getElementListByTag = m_CanHasChildren_getElementListByTag;

/**
 * @this {!Tyte.CanHasChildren}
 * @param {string} className
 * @return {!Array.<!TyteElementBase>}
 */
TyteDocumentFragment.prototype.getElementListByClass = m_CanHasChildren_getElementListByClass;

/**
 * @this {!Tyte.CanHasChildren}
 * @param {string} name
 * @return {!Array.<!TyteElementBase>}
 */
TyteDocumentFragment.prototype.getElementListByName = m_CanHasChildren_getElementListByName;

/**
 * @this {!Tyte.CanHasChildren}
 * @return {!Tyte.CanHasParent|null}
 */
TyteDocumentFragment.prototype.getFirstChild = m_CanHasChildren_getFirstChild;

/**
 * @this {!Tyte.CanHasChildren}
 * @return {!Tyte.CanHasParent|null}
 */
TyteDocumentFragment.prototype.getLastChild = m_CanHasChildren_getLastChild;

/**
 * @this {!Tyte.CanHasChildren}
 * @return {!Array.<!Tyte.CanHasParent>|null}
 */
TyteDocumentFragment.prototype.getChildNodes = m_CanHasChildren_getChildNodes;

//_____________________________________________________________________________
//
//  TyteDocumentFragment Manipulation
//_____________________________________________________________________________
//

/**
 * @this {!Tyte.CanHasChildren}
 * @param {...(!Tyte.AllNode|string|number)} ___tyteNodes
 * @return {!Tyte.CanHasChildren}
 */
TyteDocumentFragment.prototype.appendNode = m_CanHasChildren_appendNode;

/**
 * @this {!Tyte.CanHasChildren}
 * @param {...(!Tyte.AllNode|string|number)} ___tyteNodes
 * @return {!Tyte.CanHasChildren}
 */
TyteDocumentFragment.prototype.prependNode = m_CanHasChildren_prependNode;

/**
 * @this {!Tyte.CanHasChildren}
 * @return {!Tyte.CanHasChildren}
 */
TyteDocumentFragment.prototype.empty = m_CanHasChildren_empty;

//_____________________________________________________________________________
//
//  TyteDocumentFragment TextContent
//_____________________________________________________________________________
//

/**
 * @this {!Tyte.CanHasChildren}
 * @return {string}
 */
TyteDocumentFragment.prototype.getTextContent = m_CanHasChildren_getTextContent;

/**
 * @this {!Tyte.CanHasChildren}
 * @param {string} textContent
 * @return {!Tyte.CanHasChildren}
 */
TyteDocumentFragment.prototype.setTextContent = m_CanHasChildren_setTextContent;

//_____________________________________________________________________________
//
//  TyteDocumentFragment Other
//_____________________________________________________________________________
//

/**
 * @param {boolean=} deepCopy
 * @return {!Tyte.AllNode} newNode
 */
TyteDocumentFragment.prototype.clone = function( deepCopy ){
    var clonedNode = new TyteDocumentFragment();

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

};