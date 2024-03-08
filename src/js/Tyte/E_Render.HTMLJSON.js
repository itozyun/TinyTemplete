//=============================================================================
//
//  Render HTMLJSON
//
//=============================================================================

var RenderHTMLJSON_isRoot = true;

/**
 * @this {!Tyte.CanHasChildren}
 * @param {Tyte.RenderingParam=} renderingParam
 * @return {!Array}
 */
function CanHasChildren_renderHTMLJSON( renderingParam ){
    var htmlJson = [],
        childNodes = this._childNodes,
        i = 0, l;

    if( childNodes ){
        for( l = childNodes.length; i < l; ++i ){
            htmlJson[ i ] = childNodes[ i ].renderHTMLJSON( renderingParam );
        };
    };

    return htmlJson;
};

/**
 * @param {boolean} isRoot
 * @param {!Array|string} stringOrArray
 * @return {!Array|string}
 */
function RenderHTMLJSON_toStrictHTMLJSON( isRoot, stringOrArray ){
    var htmlJson = stringOrArray;

    if( isRoot ){
        if( typeof stringOrArray === 'string' ){
            htmlJson = [ 3, stringOrArray ];
        } else {
            htmlJson.unshift( 11 );
        };
        RenderHTMLJSON_isRoot = true;
    };
    return htmlJson;
};

if( DEFINE_TYTE__USE_RENDER_HTMLJSON ){
    /**
     * @param {Tyte.RenderingParam=} renderingParam
     * @return {!Array|string}
     */
    TyteTextNode.prototype.renderHTMLJSON = function( renderingParam ){
        return RenderHTMLJSON_toStrictHTMLJSON( RenderHTMLJSON_isRoot, this.text );
    };

    if( !DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT ){
        /**
         * @param {Tyte.RenderingParam=} renderingParam
         * @return {!Array}
         */
        TyteDocumentFragment.prototype.renderHTMLJSON = function( renderingParam ){
            var isRoot = RenderHTMLJSON_isRoot;

            RenderHTMLJSON_isRoot = false;
            return /** @type {!Array} */ (RenderHTMLJSON_toStrictHTMLJSON( isRoot, CanHasChildren_renderHTMLJSON.call( this, renderingParam ) ));
        };
    };

    /**
     * @param {Tyte.RenderingParam=} renderingParam
     * @return {!Array}
     */
    TyteElementBase.prototype.renderHTMLJSON = function( renderingParam ){
        var htmlJson = [ this._tagName ],
            attrs    = this._attrs,
            isRoot   = RenderHTMLJSON_isRoot,
            attrName, attrValue, attrsCloned = {};

        // attrs
        if( attrs ){
            for( attrName in attrs ){
                attrValue = attrs[ attrName ];
                if( attrName === 'id' ){
                    htmlJson[ 0 ] = htmlJson[ 0 ] + '#' + attrValue;
                    continue;
                } else if( attrName === 'className' ){
                    htmlJson[ 0 ] = htmlJson[ 0 ] + '.' + attrValue;
                    continue;
                } else {
                    attrsCloned[ attrName ] = attrValue;
                    htmlJson[ 1 ] = attrsCloned;
                };
            };
        };
        if( this._childNodes ){
            RenderHTMLJSON_isRoot = false;
            htmlJson.push.apply( htmlJson, CanHasChildren_renderHTMLJSON.call( this, renderingParam ) );
            RenderHTMLJSON_isRoot = isRoot;
        };

        return htmlJson;
    };

    /**
     * @param {Tyte.RenderingParam=} renderingParam
     * @return {!Array|string}
     */
    TyteDynamicNodeBase.prototype.renderHTMLJSON = function( renderingParam ){
        var isRoot = RenderHTMLJSON_isRoot,
            staticTyteNode = this._renderer( renderingParam ),
            htmlJson;

        if( typeof staticTyteNode === 'string' ){
            return RenderHTMLJSON_toStrictHTMLJSON( isRoot, staticTyteNode );
        } else if( typeof staticTyteNode === 'number' ){
            return RenderHTMLJSON_toStrictHTMLJSON( isRoot, '' + staticTyteNode );
        } else if( staticTyteNode != null ){
            RenderHTMLJSON_isRoot = false;
            htmlJson = staticTyteNode.renderHTMLJSON( renderingParam );
            RenderHTMLJSON_isRoot = isRoot;
            return htmlJson;
        };
        return [ 3, '' ];
    };
};
