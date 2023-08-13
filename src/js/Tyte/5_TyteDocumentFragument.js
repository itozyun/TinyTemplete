//=============================================================================
//
//  TyteDocumentFragment Class
//
//=============================================================================

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
TyteDocumentFragment.prototype.getElementByID = function( id ){
    var targetElement = null;

    m_walkElements(
        /** @type {!Tyte.CanHasChildren} */ (this),
        function( tyteElement ){
            if( tyteElement.getAttr( 'id' ) === id ){
                targetElement = tyteElement;
                return true;
            };
        }
    );

    return targetElement;
};

/**
 * @this {!Tyte.CanHasChildren}
 * @param {string} tagName
 * @return {!Array.<!TyteElementBase>}
 */
TyteDocumentFragment.prototype.getElementListByTag = function( tagName ){
    var elementList = [], i = -1;

    m_walkElements(
        this,
        function( tyteElement ){
            if( tyteElement._tagName === tagName ){
                elementList[ ++i ] = tyteElement;
            };
        }
    );

    return elementList;
};

/**
 * @this {!Tyte.CanHasChildren}
 * @param {string} className
 * @return {!Array.<!TyteElementBase>}
 */
TyteDocumentFragment.prototype.getElementListByClass = function( className ){
    var elementList = [], i = -1;

    m_walkElements(
        this,
        function( tyteElement ){
            if( tyteElement.hasClass( className ) ){
                elementList[ ++i ] = tyteElement;
            };
        }
    );
    return elementList;
};

/**
 * @this {!Tyte.CanHasChildren}
 * @param {string} name
 * @return {!Array.<!TyteElementBase>}
 */
TyteDocumentFragment.prototype.getElementListByName = function( name ){
    var elementList = [], i = -1;

    m_walkElements(
        this,
        function( tyteElement ){
            if( tyteElement.getAttr( 'name' ) === name ){
                elementList[ ++i ] = tyteElement;
            };
        }
    );
    return elementList;
};

/**
 * @this {!Tyte.CanHasChildren}
 * @return {!Tyte.CanHasParent|null}
 */
TyteDocumentFragment.prototype.getFirstChild = function(){
    var childNodes = this._childNodes;

    return childNodes && childNodes[ 0 ] || null;
};

/**
 * @this {!Tyte.CanHasChildren}
 * @return {!Tyte.CanHasParent|null}
 */
TyteDocumentFragment.prototype.getLastChild = function(){
    var childNodes = this._childNodes;

    return childNodes && childNodes[ childNodes.length - 1 ] || null;
};

/**
 * @this {!Tyte.CanHasChildren}
 * @return {!Array.<!Tyte.CanHasParent>|null}
 */
TyteDocumentFragment.prototype.getChildNodes = function(){
    return this._childNodes;
};

//_____________________________________________________________________________
//
//  TyteElementBase Manipulation
//_____________________________________________________________________________
//

/**
 * @this {!Tyte.CanHasChildren}
 * @param {...(!Tyte.AllNode|string)} ___tyteNodes
 * @return {!Tyte.CanHasChildren}
 */
TyteDocumentFragment.prototype.appendNode = function( ___tyteNodes ){
    var childNodes = this._childNodes = this._childNodes || [],
        args = m_preprocessInsertNode( m_argumentsToArray( arguments ), this );

    childNodes.push.apply( childNodes, args );
    return this;
};

/**
 * @this {!Tyte.CanHasChildren}
 * @param {...(!Tyte.AllNode|string)} ___tyteNodes
 * @return {!Tyte.CanHasChildren}
 */
TyteDocumentFragment.prototype.prependNode = function( ___tyteNodes ){
    var childNodes = this._childNodes = this._childNodes || [],
        args = m_preprocessInsertNode( m_argumentsToArray( arguments ), this );

    args = /** @type {!Array} */ (args);
    args.unshift( 0, 0 );
    childNodes.splice.apply( childNodes, args );
    return this;
};

/**
 * @this {!Tyte.CanHasChildren}
 * @return {!Tyte.CanHasChildren}
 */
TyteDocumentFragment.prototype.empty = function(){
    var childNodes = this._childNodes,
        i = 0, l, childNode;

    if( childNodes ){
        for( l = childNodes.length; i < l; ++i ){
            childNode = childNodes[ i ];
            childNode.parent = null;
        };
        childNodes.length = 0;
    };
    return this;
};

//_____________________________________________________________________________
//
//  TyteDocumentFragment TextContent
//_____________________________________________________________________________
//

/**
 * @this {!Tyte.CanHasChildren}
 * @return {string}
 */
TyteDocumentFragment.prototype.getTextContent = function(){
    var textContent = '';

    m_walkTextNodes( this,
        function( tyteNode ){
            textContent += tyteNode.text;
        }
    );
    return textContent;
};

/**
 * @this {!Tyte.CanHasChildren}
 * @param {string} textContent
 * @return {!Tyte.CanHasChildren}
 */
TyteDocumentFragment.prototype.setTextContent = function( textContent ){
    var childNodes = this._childNodes;

    if( childNodes && childNodes.length === 1 && childNodes[ 0 ].nodeType === TYTE_NODE_TYPE.TEXT_NODE ){
        childNodes[ 0 ].text = textContent;
    } else {
        if( childNodes ){
            this.empty();
        };
        this.appendNode( textContent );
    };
    return this;
};

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