//=============================================================================
//
//  Render HTMLJSON
//
//  @see https://github.com/itozyun/html.json
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
            property, value, clonedAttrs = {};

        // attrs
        if( attrs ){
            for( property in attrs ){
                value = attrs[ property ];
                if( typeof value === 'function' ){
                    value = /** @type {!Tyte.AttributeRenderer} */ (value).call( this, renderingParam, property );
                };
                if( value != null ){
                    if( property === 'id' ){
                        htmlJson[ 0 ] = htmlJson[ 0 ] + '#' + value;
                        continue;
                    } else if( property === 'className' ){
                        htmlJson[ 0 ] = htmlJson[ 0 ] + '.' + value;
                        continue;
                    } else {
                        // object より cssText 形式にした方がファイルサイズが小さい html.json はファイルサイズの小ささを重視
                        if( !DEFINE_TYTE__DROP_INLINE_STYLE && property === 'style' && typeof value === 'object' ){
                            value = m_objToCSSText( value, this, renderingParam );
                        };
                        clonedAttrs[ property ] = value;
                        htmlJson[ 1 ] = clonedAttrs;
                    };
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
