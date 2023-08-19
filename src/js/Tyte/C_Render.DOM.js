//=============================================================================
//
//  Render DOM
//
//=============================================================================

if( DEFINE_TYTE__USE_RENDER_DOM ){
    /**
     * @param {Tyte.RenderingParam=} renderingParam
     * @return {!Text}
     */
    TyteTextNode.prototype.renderDOM = function( renderingParam ){
        return document.createTextNode( this.text );
    };

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

    /**
     * @param {Tyte.RenderingParam=} renderingParam
     * @return {!Element}
     */
    TyteElementBase.prototype.renderDOM = function( renderingParam ){
        var elm = document.createElement( this._tagName ), // TODO SVG
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
                if( property === 'style' ){
                    elm.style.cssText = typeof value === 'object' ? m_objToCSSText( value, this, renderingParam ) : /** @type {string} */ (value);
                } else {
                    elm.setAttribute( m_RENAME_ATTRIBUTES[ property ] || property, '' + value );
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