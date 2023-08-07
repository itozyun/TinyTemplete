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
 * @type {!TyteDocumentFragment|null}
 */
TyteDocumentFragment.prototype._root = null;

/**
 * @private
 * @type {!Array.<!TyteTextNode|!TyteElementBase>|null}
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
 * @param {string} id
 * @return {!TyteElementBase|null}
 */
TyteDocumentFragment.prototype.getElementByID = function( id ){
    var targetElement = null;

    m_walkElements(
        /** @type {!TyteElementBase|!TyteDocumentFragment} */ (this),
        function( tyteElement ){
            if( tyteElement.getAttribute( 'id' ) === id ){
                targetElement = tyteElement;
                return true;
            };
        }
    );

    return targetElement;
};

/**
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
 * @param {string} name
 * @return {!Array.<!TyteElementBase>}
 */
TyteDocumentFragment.prototype.getElementListByName = function( name ){
    var elementList = [], i = -1;

    m_walkElements(
        this,
        function( tyteElement ){
            if( tyteElement.getAttribute( 'name' ) === name ){
                elementList[ ++i ] = tyteElement;
            };
        }
    );
    return elementList;
};

/**
 * @return {!TyteTextNode|!TyteElementBase|null}
 */
TyteDocumentFragment.prototype.getFirstChild = function(){
    var childNodes = this._childNodes;

    return childNodes && childNodes[ 0 ] || null;
};

/**
 * @return {!TyteTextNode|!TyteElementBase|null}
 */
TyteDocumentFragment.prototype.getLastChild = function(){
    var childNodes = this._childNodes;

    return childNodes && childNodes[ childNodes.length - 1 ] || null;
};

/**
 * @return {!Array.<!TyteTextNode|!TyteElementBase>|null}
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
 * @param {...(!TyteTextNode|!TyteElementBase|!TyteDocumentFragment|string)} ___tyteNodes
 * @return {!TyteElementBase|!TyteDocumentFragment}
 */
TyteDocumentFragment.prototype.appendNode = function( ___tyteNodes ){
    var childNodes = this._childNodes = this._childNodes || [],
        args = m_stringToTextNodeAndFlattenDocumentFragment( m_argumentsToArray( arguments ) );

    m_updateRootAndParentNodeOfNewChildNodes(
        args,
        /** @type {!TyteTextNode|!TyteElementBase|!TyteDocumentFragment} */ (this._root),
        /** @type {!TyteElementBase|!TyteDocumentFragment} */ (this)
    );
    childNodes.push.apply( childNodes, args );
    return this;
};

/**
 * @param {...(!TyteTextNode|!TyteElementBase|!TyteDocumentFragment|string)} ___tyteNodes
 * @return {!TyteElementBase|!TyteDocumentFragment}
 */
TyteDocumentFragment.prototype.prependNode = function( ___tyteNodes ){
    var childNodes = this._childNodes = this._childNodes || [],
        args = m_stringToTextNodeAndFlattenDocumentFragment( m_argumentsToArray( arguments ) );

    m_updateRootAndParentNodeOfNewChildNodes(
        args,
        /** @type {!TyteTextNode|!TyteElementBase|!TyteDocumentFragment} */ (this._root),
        /** @type {!TyteElementBase|!TyteDocumentFragment} */ (this)
    );
    args = /** @type {!Array} */ (args);
    args.unshift( 0, 0 );
    childNodes.splice.apply( childNodes, args );
    return this;
};

/**
 * @return {!TyteElementBase|!TyteDocumentFragment}
 */
TyteDocumentFragment.prototype.empty = function(){
    var childNodes = this._childNodes,
        i = 0, l, childNode;

    if( childNodes ){
        for( l = childNodes.length; i < l; ++i ){
            childNode = childNodes[ i ];
            m_updateRootAndParentNode( childNode, childNode, null );
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
 * @param {string} textContent
 * @return {!TyteElementBase|!TyteDocumentFragment}
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

TyteDocumentFragment.prototype.ready = TyteTextNode.prototype.ready;

TyteDocumentFragment.prototype.clone = TyteTextNode.prototype.clone;