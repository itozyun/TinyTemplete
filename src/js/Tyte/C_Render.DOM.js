//=============================================================================
//
//  Render DOM
//
//=============================================================================

if( DEFINE_TYTE__USE_RENDER_DOM ){
    /**
     * @param {RenderingContext=} renderingContext
     * @return {!Text}
     */
    TyteTextNode.prototype.renderDOM = function( renderingContext ){
        return document.createTextNode( this.text );
    };

    /**
     * @param {RenderingContext=} renderingContext
     * @return {!DocumentFragment}
     */
    TyteDocumentFragment.prototype.renderDOM = function( renderingContext ){
        var frg = document.createDocumentFragment();
        var childNodes = this._childNodes,
            i = 0, l, node;

        // childNodes
        if( childNodes ){
            for( l = childNodes.length; i < l; ++i ){
                node = childNodes[ i ].renderDOM( renderingContext );
                if( node ){
                    frg.append( node );
                };
            };
        };
        return frg;
    };

    /**
     * @param {RenderingContext=} renderingContext
     * @return {!Element}
     */
    TyteElementBase.prototype.renderDOM = function( renderingContext ){
        var elm = document.createElement( this._tagName ), // TODO SVG
            attrs = this._attrs, property, value,
            childNodes = this._childNodes,
            i = 0, l, node;

        // attrs
        for( property in attrs ){
            value = attrs[ property ];
            if( typeof value === 'function' ){
                value = /** @type {!DynamicAttributeFunction} */ (value).call( this, renderingContext, property );
            };
            if( value != null ){
                if( property === 'style' ){
                    elm.style.cssText = typeof value === 'object' ? m_objToCSSText( value, this, renderingContext ) : /** @type {string} */ (value);
                } else {
                    elm.setAttribute( m_RENAME_ATTRIBUTES[ property ] || property, '' + value );
                };
            };
        };
        
        // childNodes
        if( childNodes ){
            for( l = childNodes.length; i < l; ++i ){
                node = childNodes[ i ].renderDOM( renderingContext );
                if( node ){
                    elm.appendChild( node );
                };
            };
        };
        return elm;
    };

    /**
     * @param {RenderingContext=} renderingContext
     * @return {!DocumentFragment|!Element|!Text|undefined}
     */
    TyteDynamicNodeBase.prototype.renderDOM = function( renderingContext ){
        var staticTyteNode = this._compute( renderingContext );

        if( typeof staticTyteNode === 'string' || typeof staticTyteNode === 'number'  ){
            return document.createTextNode( '' + staticTyteNode );
        } else if( staticTyteNode != null ){
            return staticTyteNode.renderDOM( renderingContext );
        };
    };
};