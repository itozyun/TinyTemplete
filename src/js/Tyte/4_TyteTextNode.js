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

        m_updateParentNode( this, null );
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
        m_updateParentNode( this, null );
    };

    return this;
};

//_____________________________________________________________________________
//
//  TyteTextNode Other
//_____________________________________________________________________________
//

/**
 * @return {!TyteElementBase|!TyteTextNode}
 */
TyteTextNode.prototype.ready = function(){
    m_updateParentNode( this, null );

    return this;
};

/**
 * @param {boolean=} deepCopy
 * @return {!TyteTextNode|!TyteElementBase|!TyteDocumentFragment} newNode
 */
TyteTextNode.prototype.clone = function( deepCopy ){
    var srcNodes = [], newNodes = [], newRootNpde;

    m_walkNodes( this,
        function( tyteNode ){
            var newTyteNpde,
                Class = tyteNode.constructor, index;

            if( tyteNode.nodeType === TYTE_NODE_TYPE.TEXT_NODE ){
                newTyteNpde = new Class( tyteNode.text );
            } else if( tyteNode.nodeType === TYTE_NODE_TYPE.ELEMENT_NODE ){
                newTyteNpde = new Class( m_deepCopy( tyteNode._attrs ) );
            } else {
                newTyteNpde = new Class(); // TYTE_NODE_TYPE.DOCUMENT_FRAGMENT_NODE
            };

            if( !newRootNpde ){
                newRootNpde = newTyteNpde;
            };
            if( !deepCopy ){
                return true;
            };

            srcNodes.push( tyteNode );
            newNodes.push( newTyteNpde );

            if( tyteNode._childNodes && tyteNode._childNodes.length ){
                newTyteNpde._childNodes = [];
            };

            if( tyteNode.parent ){
                index = srcNodes.indexOf( tyteNode.parent );
                if( 0 <= index ){
                    newNodes[ index ]._childNodes.push( newTyteNpde );
                };
            };
        }
    );
    return newRootNpde.ready();
};