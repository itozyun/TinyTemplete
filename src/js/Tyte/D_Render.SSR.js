//=============================================================================
//
//  Render SSR
//
//=============================================================================

var RenderSSR_skipHTMLEscape;
var RenderSSR_requireClosingTag;
var RenderSSR_isXML;

/**
 * @this {!Tyte.CanHasChildren}
 * @param {Tyte.RenderingParam=} renderingParam
 * @return {string}
 */
function CanHasChildren_renderSSR( renderingParam ){
    var htmlString = [],
        childNodes = this._childNodes,
        i = 0, l;

    if( childNodes ){
        for( l = childNodes.length; i < l; ++i ){
            htmlString[ i ] = childNodes[ i ].renderSSR( renderingParam );
        };
    };

    return htmlString.join( '' );
};

if( DEFINE_TYTE__USE_RENDER_SSR ){
    /**
     * @param {Tyte.RenderingParam=} renderingParam
     * @return {string}
     */
    TyteTextNode.prototype.renderSSR = function( renderingParam ){
        return RenderSSR_skipHTMLEscape ? this.text : m_escapeForHTML( this.text );
    };

    if( !DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT ){
        TyteDocumentFragment.prototype.renderSSR = CanHasChildren_renderSSR;
    };

    /**
     * @param {Tyte.RenderingParam=} renderingParam
     * @return {string}
     */
    TyteElementBase.prototype.renderSSR = function( renderingParam ){
        var tagName = this._tagName,
            htmlString = [ '<', tagName ], i = 1,
            attrs = this._attrs, property, value,
            startToSkipHTMLEscape, startToRequireClosingTag, isXMLRoot, childNodesString;

        // attrs
        if( attrs ){
            for( property in attrs ){
                value = attrs[ property ];
                if( m_isFunction( value ) ){
                    value = /** @type {!Tyte.AttributeRenderer} */ (value).call( this, renderingParam, property );
                };
                if( value != null ){
                    property = m_RENAME_ATTRIBUTES[ property ] || property;
                    if( ATTRIBUTES_NO_VALUE[ property ] ){
                        if( value !== false ){
                            htmlString[ ++i ] = ' ' + property;
                        };
                    } else {
                        if( !DEFINE_TYTE__DROP_INLINE_STYLE && property === 'style' && m_isAttrsOrNull( value ) ){
                            value = m_objToCSSText( /** @type {!Object} */ (value), this, renderingParam );
                        };
                        value = m_escapeForHTML( '' + value );
                        if( 0 <= value.indexOf( '"' ) ){
                            if( 0 <= value.indexOf( "'" ) ){
                                value = '="' + value.split( '"' ).join( '&quot;' ) + '"';
                            } else {
                                value = "='" + value + "'";
                            };
                        } else {
                            value = '="' + value + '"';
                        };
                        htmlString[ ++i ] = ' ' + property + value;
                    };
                };
            };
        };

        if( !RenderSSR_skipHTMLEscape ){
            RenderSSR_skipHTMLEscape = startToSkipHTMLEscape = !!SKIP_HTML_ESCAPE[ tagName ];
        };
        if( !RenderSSR_requireClosingTag ){
            RenderSSR_requireClosingTag = startToRequireClosingTag = !!REQUIRE_CLOSING_TAG[ tagName ];
        };
        if( !RenderSSR_isXML ){
            RenderSSR_isXML = isXMLRoot = !!TAGNAME_TO_NAMESPACE[ tagName ] || m_isNamespacedTag( tagName );
        };

        if( this._childNodes ){
            childNodesString = CanHasChildren_renderSSR.call( this, renderingParam );
        };

        if( childNodesString ){
            htmlString[ ++i ] = '>' + childNodesString;
        } else {
            htmlString[ ++i ] = RenderSSR_isXML ? '/>' : '>';
        };

        if( startToSkipHTMLEscape ){
            RenderSSR_skipHTMLEscape = false;
        };
        if( startToRequireClosingTag ){
            RenderSSR_requireClosingTag = false;
        };
        if( isXMLRoot ){
            RenderSSR_isXML = false;
        };

        if( !NO_CLOSE_TAG_REQUIRED[ tagName ] || RenderSSR_requireClosingTag ){
            if( childNodesString || !EMPTY_ELEMENTS[ tagName ] ){ // || 閉じタグが必要
                htmlString[ ++i ] = '</' + tagName + '>';
            };
        };

        return htmlString.join( '' );
    };

    /**
     * @param {Tyte.RenderingParam=} renderingParam
     * @return {string}
     */
    TyteDynamicNodeBase.prototype.renderSSR = function( renderingParam ){
        var staticTyteNode = this._renderer( renderingParam );

        if( m_isString( staticTyteNode ) ){
            return RenderSSR_skipHTMLEscape ? staticTyteNode : m_escapeForHTML( staticTyteNode );
        } else if( m_isNumber( staticTyteNode ) ){
            return '' + staticTyteNode;
        } else if( staticTyteNode != null ){
            return staticTyteNode.renderSSR( renderingParam );
        };
        return '';
    };
};
