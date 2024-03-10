
/**
 * @this {!Tyte.CanHasChildren}
 * @param {!function(!TyteElementBase,!Element=):(boolean|undefined)} func
 * @param {!Node=} opt_node To search Real Node and templete Node simultaneously(only renderDOM)
 * @return {!Tyte.AllNode} this
 */
function m_CanHasChildren_walkElements( func, opt_node ){
    if( DEFINE_TYTE__USE_RENDER_DOM ){
        m_walkElements( this, func, opt_node );
    } else {
        m_walkElements( this, func );
    };
    return this;
};

/**
 * @this {!Tyte.CanHasChildren}
 * @param {string} id
 * @return {!TyteElementBase|null}
 */
function m_CanHasChildren_getElementByID( id ){
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
function m_CanHasChildren_getElementListByTag( tagName ){
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
function m_CanHasChildren_getElementListByClass( className ){
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
function m_CanHasChildren_getElementListByName( name ){
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
function m_CanHasChildren_getFirstChild(){
    var childNodes = this._childNodes;

    return childNodes && childNodes[ 0 ] || null;
};

/**
 * @this {!Tyte.CanHasChildren}
 * @return {!Tyte.CanHasParent|null}
 */
function m_CanHasChildren_getLastChild(){
    var childNodes = this._childNodes;

    return childNodes && childNodes[ childNodes.length - 1 ] || null;
};

/**
 * @this {!Tyte.CanHasChildren}
 * @return {!Array.<!Tyte.CanHasParent>|null}
 */
function m_CanHasChildren_getChildNodes(){
    return this._childNodes;
};

/**
 * @this {!Tyte.CanHasChildren}
 * @return {!Array.<!TyteElementBase>}
 */
function m_CanHasChildren_getChildElements(){
    var ret = [],
        childNodes = this._childNodes,
        i = 0, l = childNodes.length, childNode;

    for( ; i < l; ++i ){
        childNode = childNodes[ i ];
        if( childNode.nodeType === TYTE_NODE_TYPE.ELEMENT_NODE ){
            ret.push( childNode );
        };
    };

    return ret;
};

//_____________________________________________________________________________
//
//  CanHasChildren Manipulation
//_____________________________________________________________________________
//

/**
 * @this {!Tyte.CanHasChildren}
 * @param {...(!Tyte.AllNode|string|number)} ___tyteNodes
 * @return {!Tyte.CanHasChildren}
 */
function m_CanHasChildren_appendNode( ___tyteNodes ){
    var childNodes = this._childNodes = this._childNodes || [],
        args = m_preprocessInsertNode( m_argumentsToArray( arguments ), this );

    childNodes.push.apply( childNodes, args );
    return this;
};

/**
 * @this {!Tyte.CanHasChildren}
 * @param {...(!Tyte.AllNode|string|number)} ___tyteNodes
 * @return {!Tyte.CanHasChildren}
 */
function m_CanHasChildren_prependNode( ___tyteNodes ){
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
function m_CanHasChildren_empty(){
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
//  CanHasChildren TextContent
//_____________________________________________________________________________
//

/**
 * @this {!Tyte.CanHasChildren}
 * @return {string}
 */
function m_CanHasChildren_getTextContent(){
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
function m_CanHasChildren_setTextContent( textContent ){
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
