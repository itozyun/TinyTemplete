//=============================================================================
//
//  Render SSR
//
//=============================================================================
/** @const */
var ATTRIBUTES_NO_VALUE = {checked:!0,compact:!0,declare:!0,defer:!0,disabled:!0,ismap:!0,multiple:!0,nohref:!0,noresize:!0,noshade:!0,nowrap:!0,readonly:!0,selected:!0};

var EMPTY_ELEMENTS   = {link:!0,meta:!0,br:!0,hr:!0,img:!0,input:!0,area:!0,base:!0,col:!0,embed:!0,keygen:!0,param:!0,source:!0},
    OMIT_CLOSE_TAG   = {p:!0,dt:!0,dd:!0,li:!0,option:!0,thead:!0,tfoot:!0,th:!0,tr:!0,td:!0,rt:!0,rp:!0,optgroup:!0,caption:!0,colgroup:!0,col:!0},
    NO_OMIT_CLOSE    = {a:!0,audio:!0,del:!0,ins:!0,map:!0,noscript:!0,video:!0},
    IS_XML_ELEMENT   = {polyline:!0,rect:!0,line:!0,'v:polyline':!0,'v:rect':!0,'v:line':!0},
    SKIP_HTML_ESCAPE = {script:!0,style:!0,plaintext:!0,xmp:!0,noscript:!0};

var RenderSSR_skipHTMLEscape;
var RenderSSR_noOmitCloseTag;

/**
 * @this {!TyteElementBase|!TyteDocumentFragment}
 * @param {Tyte.RenderingParam=} renderingParam
 * @return {string}
 */
function TyteDocumentFragment_renderSSR( renderingParam ){
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

    TyteDocumentFragment.prototype.renderSSR = TyteDocumentFragment_renderSSR;

    /**
     * @param {Tyte.RenderingParam=} renderingParam
     * @return {string}
     */
    TyteElementBase.prototype.renderSSR = function TyteDocumentFragment_renderSSR( renderingParam ){
        var tagName = this._tagName,
            htmlString = [ '<', tagName ], i = 1,
            attrs = this._attrs, property, value,
            skipHTMLEscape, noOmitCloseTag, childNodesString;

        // attrs
        if( attrs ){
            for( property in attrs ){
                value = attrs[ property ];
                if( typeof value === 'function' ){
                    value = /** @type {!Tyte.AttributeRenderer} */ (value).call( this, renderingParam, property );
                };
                if( value != null ){
                    property = m_RENAME_ATTRIBUTES[ property ] || property;
                    if( ATTRIBUTES_NO_VALUE[ property ] ){
                        if( value !== false ){
                            htmlString[ ++i ] = ' ' + property;
                        };
                    } else {
                        if( property === 'style' && typeof value === 'object' ){
                            value = m_objToCSSText( value, this, renderingParam );
                        };
                        htmlString[ ++i ] = ' ' + property + '="' + m_escapeForAttribute( '' + value ) + '"';
                    };
                };
            };
        };

        if( !RenderSSR_skipHTMLEscape ){
            RenderSSR_skipHTMLEscape = skipHTMLEscape = !!SKIP_HTML_ESCAPE[ tagName ];
        };
        if( !RenderSSR_noOmitCloseTag ){
            RenderSSR_noOmitCloseTag = noOmitCloseTag = !!NO_OMIT_CLOSE[ tagName ];
        };

        if( this._childNodes ){
            htmlString[ ++i ] = '>';
            htmlString[ ++i ] = childNodesString = TyteDocumentFragment.prototype.renderSSR.call( this, renderingParam ); // TyteDocumentFragment_renderSSR にすると ERROR, 多分
        } else {
            htmlString[ ++i ] = IS_XML_ELEMENT[ tagName ] ? '/>' : '>';
        };

        if( skipHTMLEscape ){
            RenderSSR_skipHTMLEscape = false;
        };
        if( noOmitCloseTag ){
            RenderSSR_noOmitCloseTag = false;
        };

        if( !OMIT_CLOSE_TAG[ tagName ] || RenderSSR_noOmitCloseTag ){
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

        if( typeof staticTyteNode === 'string' ){
            return RenderSSR_skipHTMLEscape ? staticTyteNode : m_escapeForHTML( staticTyteNode );
        } else if( typeof staticTyteNode === 'number' ){
            return '' + staticTyteNode;
        } else if( staticTyteNode != null ){
            return staticTyteNode.renderSSR( renderingParam );
        };
        return '';
    };
};
