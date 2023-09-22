//=============================================================================
//
//  TyteTextNode Class
//
//=============================================================================

/**
 * @constructor
 * @param {string|number} text
 */
TyteTextNode = function( text ){
    var instance = /** @type {!TyteTextNode} */ (m_getInstance( this, TyteTextNode ));

    instance.text = '' + text;

    return instance;
};

p_Tyte.Text = TyteTextNode;

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
 * @type {!Tyte.CanHasChildren|null}
 */
TyteTextNode.prototype.parent = null;


//_____________________________________________________________________________
//
//  TyteTextNode Walk
//_____________________________________________________________________________
//

/**
 * @this {!Tyte.AllNode}
 * @param {!function(!Tyte.AllNode,!Node=):(boolean|undefined)} func
 * @param {!Node=} opt_node To search Real Node and templete Node simultaneously(only renderDOM)
 * @return {!Tyte.AllNode} this
 */
TyteTextNode.prototype.walkNodes = function( func, opt_node ){
    if( DEFINE_TYTE__USE_RENDER_DOM ){
        m_walkNodes( this, func, opt_node );
    } else {
        m_walkNodes( this, func );
    };
    return this;
};

/**
 * @this {!TyteTextNode|!TyteElementBase|!TyteDocumentFragment}
 * @param {!function(!TyteTextNode,!Text=):(boolean|undefined)} func
 * @param {!Node=} opt_node To search Real Node and templete Node simultaneously(only renderDOM)
 * @return {!Tyte.AllNode} this
 */
TyteTextNode.prototype.walkTextNodes = function( func, opt_node ){
    if( DEFINE_TYTE__USE_RENDER_DOM ){
        m_walkTextNodes( this, func, opt_node );
    } else {
        m_walkTextNodes( this, func );
    };
    return this;
};

//_____________________________________________________________________________
//
//  TyteTextNode Manipulation
//_____________________________________________________________________________
//

/**
 * @this {!Tyte.CanHasParent}
 * @return {!Tyte.CanHasParent|null}
 */
TyteTextNode.prototype.getPrev = function(){
    var parent = this.parent;

    return parent && parent._childNodes[ m_getMyIndex( this ) - 1 ] || null;
};

/**
 * @this {!Tyte.CanHasParent}
 * @param {...!Tyte.AllNode} ___tyteNodes
 * @return {!Tyte.CanHasParent}
 */
TyteTextNode.prototype.setPrev = function( ___tyteNodes ){
    var parent = this.parent,
        childNodes, args;

    if( parent ){
        args = m_preprocessInsertNode( m_argumentsToArray( arguments ), parent );
        args.unshift( m_getMyIndex( this ), 0 );
        childNodes = parent._childNodes;
        childNodes.splice.apply( childNodes, args );
    };

    return this;
};

/**
 * @this {!Tyte.CanHasParent}
 * @return {!Tyte.CanHasParent|null}
 */
TyteTextNode.prototype.getNext = function(){
    var parent = this.parent;

    return parent && parent._childNodes[ m_getMyIndex( this ) + 1 ] || null;
};

/**
 * @this {!Tyte.CanHasParent}
 * @param {...!Tyte.AllNode} ___tyteNodes
 * @return {!Tyte.CanHasParent}
 */
TyteTextNode.prototype.setNext = function( ___tyteNodes ){
    var parent = this.parent,
        childNodes, insertIndex, args;

    if( parent ){
        childNodes = parent._childNodes;
        insertIndex = m_getMyIndex( this ) + 1;
        args = m_preprocessInsertNode( m_argumentsToArray( arguments ), parent );

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
 * @this {!Tyte.CanHasParent}
 * @param {...!Tyte.AllNode} ___tyteNodes
 * @return {!Tyte.CanHasParent}
 */
TyteTextNode.prototype.swap = function( ___tyteNodes ){
    var parent = this.parent,
        childNodes, args;

    if( parent ){
        args = m_preprocessInsertNode( m_argumentsToArray( arguments ), parent );

        args.unshift( m_getMyIndex( this ), 1 );
        childNodes = parent._childNodes;
        childNodes.splice.apply( childNodes, args );
        this.parent = null;
    };

    return this;
};

/**
 * @this {!Tyte.CanHasParent}
 * @return {!Tyte.CanHasParent}
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
 * @return {!Tyte.AllNode} newNode
 */
TyteTextNode.prototype.clone = function( deepCopy ){
    return new TyteTextNode( this.text );;
};