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
 * @return {!TyteTextNode|!TyteElementBase|null}
 */
TyteTextNode.prototype.getPrev = function(){
    var parent = this.parent;

    return parent && parent._childNodes[ m_getMyIndex( this ) - 1 ] || null;
};

/**
 * @param {...(!TyteTextNode|!TyteElementBase|!TyteDocumentFragment)} ___tyteNodes
 * @return {!TyteTextNode}
 */
TyteTextNode.prototype.setPrev = function( ___tyteNodes ){
    var parent = this.parent,
        childNodes, args;

    if( parent ){
        args = m_stringToTextNodeAndFlattenDocumentFragment( m_argumentsToArray( arguments ) );
        m_updateParentOfNewChildNodes(
            args,
            /** @type {!TyteElementBase|!TyteDocumentFragment} */ (parent)
        );
        args.unshift( m_getMyIndex( this ), 0 );
        childNodes = parent._childNodes;
        childNodes.splice.apply( childNodes, args );
    };

    return this;
};

/**
 * @return {!TyteTextNode|!TyteElementBase|null}
 */
TyteTextNode.prototype.getNext = function(){
    var parent = this.parent;

    return parent && parent._childNodes[ m_getMyIndex( this ) + 1 ] || null;
};

/**
 * @param {...(!TyteTextNode|!TyteElementBase|!TyteDocumentFragment)} ___tyteNodes
 * @return {!TyteTextNode}
 */
TyteTextNode.prototype.setNext = function( ___tyteNodes ){
    var parent = this.parent,
        childNodes, insertIndex, args;

    if( parent ){
        childNodes = parent._childNodes;
        insertIndex = m_getMyIndex( this ) + 1;
        args = m_stringToTextNodeAndFlattenDocumentFragment( m_argumentsToArray( arguments ) );
        m_updateParentOfNewChildNodes(
            args,
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
 * @param {...(!TyteTextNode|!TyteElementBase)} ___tyteNodes
 * @return {!TyteTextNode}
 */
TyteTextNode.prototype.swap = function( ___tyteNodes ){
    var parent = this.parent,
        childNodes, args;

    if( parent ){
        args = m_stringToTextNodeAndFlattenDocumentFragment( m_argumentsToArray( arguments ) );

        m_updateParentOfNewChildNodes(
            args,
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
 * @return {!TyteTextNode}
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
 * @return {!TyteTextNode|!TyteElementBase|!TyteDocumentFragment} newNode
 */
TyteTextNode.prototype.clone = function( deepCopy ){
    return new TyteTextNode( this.text );;
};