//=============================================================================
//
//  Render DOM
//
//=============================================================================

if( DEFINE_TYTE__USE_RENDER_DOM ){
    var RenderDOM_xmlns;

    /**
     * @param {Tyte.RenderingParam=} renderingParam
     * @return {!Text}
     */
    TyteTextNode.prototype.renderDOM = function( renderingParam ){
        return document.createTextNode( this.text );
    };

    if( !DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT ){
        /**
         * @param {Tyte.RenderingParam=} renderingParam
         * @return {!DocumentFragment}
         */
        TyteDocumentFragment.prototype.renderDOM = function( renderingParam ){
            var frg = document.createDocumentFragment();
            var childNodes = this._childNodes,
                i = 0, l, node;

            // childNodes
            if( childNodes ){
                for( l = childNodes.length; i < l; ++i ){
                    node = childNodes[ i ].renderDOM( renderingParam );
                    if( node ){
                        frg.append( node );
                    };
                };
            };
            return frg;
        };
    };

    /**
     * @param {Tyte.RenderingParam=} renderingParam
     * @return {!Element}
     */
    TyteElementBase.prototype.renderDOM = function( renderingParam ){
        var tagName = this._tagName;
        var isXMLRoot;

        if( !RenderDOM_xmlns && !!IS_XML_ELEMENT[ tagName ] ){
            RenderDOM_xmlns = isXMLRoot = tagName === 'svg' ? 'http://www.w3.org/2000/svg' : 'http://www.w3.org/1998/Math/MathML';
        };

        var elm = RenderDOM_xmlns ? document.createElementNS( RenderDOM_xmlns, tagName ) : document.createElement( tagName ),
            attrs = this._attrs, property, value,
            childNodes = this._childNodes,
            i = 0, l, node;

        // attrs
        for( property in attrs ){
            value = attrs[ property ];
            if( typeof value === 'function' ){
                value = /** @type {!Tyte.AttributeRenderer} */ (value).call( this, renderingParam, property );
            };
            if( value != null ){
                if( !DEFINE_TYTE__DROP_INLINE_STYLE && property === 'style' ){
                    elm.style.cssText = typeof value === 'object' ? m_objToCSSText( value, this, renderingParam ) : /** @type {string} */ (value);
                } else {
                    property = m_RENAME_ATTRIBUTES[ property ] || property;
                    if( RenderDOM_xmlns ){
                        elm.setAttributeNS( null, property, '' + value );
                    } else {
                        elm.setAttribute( property, '' + value );
                    };
                };
            };
        };
        
        // childNodes
        if( childNodes ){
            for( l = childNodes.length; i < l; ++i ){
                node = childNodes[ i ].renderDOM( renderingParam );
                if( node ){
                    elm.appendChild( node );
                };
            };
        };

        if( isXMLRoot ){
            RenderDOM_xmlns = false;
        };
        return elm;
    };

    /**
     * @param {Tyte.RenderingParam=} renderingParam
     * @return {!DocumentFragment|!Element|!Text|undefined}
     */
    TyteDynamicNodeBase.prototype.renderDOM = function( renderingParam ){
        var staticTyteNode = this._renderer( renderingParam );

        if( typeof staticTyteNode === 'string' || typeof staticTyteNode === 'number'  ){
            return document.createTextNode( '' + staticTyteNode );
        } else if( staticTyteNode != null ){
            return staticTyteNode.renderDOM( renderingParam );
        };
    };
};