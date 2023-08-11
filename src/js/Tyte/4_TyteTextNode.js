//=============================================================================
//
//  TyteTextNode Class
//
//=============================================================================

//_____________________________________________________________________________
//
//  TyteTextNode public
//_____________________________________________________________________________
//

/**
 * @type {number}
 */
TyteTextNode.prototype.nodeType = TYTE_NODE_TYPE.TEXT_NODE;

/**
 * @type {string}
 */
TyteTextNode.prototype.text = '';

/**
 * @type {!TyteElementBase|!TyteDocumentFragment|null}
 */
TyteTextNode.prototype.parent = null;

//_____________________________________________________________________________
//
//  TyteTextNode Manipulation
//_____________________________________________________________________________
//

/**
 * @this {!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase}
 * @return {!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase|null}
 */
TyteTextNode.prototype.getPrev = function(){
    var parent = this.parent;

    return parent && parent._childNodes[ m_getMyIndex( this ) - 1 ] || null;
};

/**
 * @this {!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase}
 * @param {...!TyteNode} ___tyteNodes
 * @return {!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase}
 */
TyteTextNode.prototype.setPrev = function( ___tyteNodes ){
    var parent = this.parent,
        childNodes, args;

    if( parent ){
        args = m_preprocessInsertNode(
            m_argumentsToArray( arguments ),
            /** @type {!TyteElementBase|!TyteDocumentFragment} */ (parent)
        );
        args.unshift( m_getMyIndex( this ), 0 );
        childNodes = parent._childNodes;
        childNodes.splice.apply( childNodes, args );
    };

    return this;
};

/**
 * @this {!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase}
 * @return {!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase|null}
 */
TyteTextNode.prototype.getNext = function(){
    var parent = this.parent;

    return parent && parent._childNodes[ m_getMyIndex( this ) + 1 ] || null;
};

/**
 * @this {!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase}
 * @param {...!TyteNode} ___tyteNodes
 * @return {!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase}
 */
TyteTextNode.prototype.setNext = function( ___tyteNodes ){
    var parent = this.parent,
        childNodes, insertIndex, args;

    if( parent ){
        childNodes = parent._childNodes;
        insertIndex = m_getMyIndex( this ) + 1;
        args = m_preprocessInsertNode(
            m_argumentsToArray( arguments ),
            /** @type {!TyteElementBase|!TyteDocumentFragment} */ (parent)
        );

        if( insertIndex < childNodes.length ){
            args.unshift( insertIndex, 0 );
            childNodes.splice.apply( childNodes, args );
        } else {
            childNodes.push.apply( childNodes, args );
        };
    };

    return this;
};

/**
 * @this {!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase}
 * @param {...!TyteNode} ___tyteNodes
 * @return {!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase}
 */
TyteTextNode.prototype.swap = function( ___tyteNodes ){
    var parent = this.parent,
        childNodes, args;

    if( parent ){
        args = m_preprocessInsertNode(
            m_argumentsToArray( arguments ),
            /** @type {!TyteElementBase|!TyteDocumentFragment} */ (parent)
        );

        args.unshift( m_getMyIndex( this ), 1 );
        childNodes = parent._childNodes;
        childNodes.splice.apply( childNodes, args );
        this.parent = null;
    };

    return this;
};

/**
 * @this {!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase}
 * @return {!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase}
 */
TyteTextNode.prototype.remove = function(){
    var parent = this.parent;

    if( parent ){
        parent._childNodes.splice( m_getMyIndex( this ), 1 );
        this.parent = null;
    };

    return this;
};

//_____________________________________________________________________________
//
//  TyteTextNode Other
//_____________________________________________________________________________
//

/**
 * @param {boolean=} deepCopy
 * @return {!TyteNode} newNode
 */
TyteTextNode.prototype.clone = function( deepCopy ){
    return new TyteTextNode( this.text );;
};