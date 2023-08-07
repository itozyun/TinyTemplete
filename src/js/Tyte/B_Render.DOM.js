//=============================================================================
//
//  Render DOM
//
//=============================================================================

/** @type {!DocumentFragment|!Element|null|undefined} */
var RenderDOM_rootNode;
/** @type {!DocumentFragment|!Element|null|undefined} */
var RenderDOM_parentNode;

if( DEFINE_TYTE__USE_RENDER_DOM ){
    /**
     * @return {!Text|undefined}
     */
    TyteTextNode.prototype.renderDOM = function(){
        var textNode = document.createTextNode( this.text );

        if( !RenderDOM_parentNode ){
            return textNode;
        } else {
            RenderDOM_parentNode.appendChild( textNode );
        };
    };

    /**
     * @return {!DocumentFragment|undefined}
     */
    TyteDocumentFragment.prototype.renderDOM = function(){
        var frg = document.createDocumentFragment();
        var childNodes = this._childNodes,
            i = 0, l;

        RenderDOM_rootNode = frg;
        // childNodes
        if( childNodes ){
            for( l = childNodes.length; i < l; ++i ){
                RenderDOM_parentNode = frg;
                childNodes[ i ].renderDOM();
            };
        };
        RenderDOM_rootNode = RenderDOM_parentNode = null;

        return frg;
    };

    /**
     * @return {!Element|undefined}
     */
    TyteElementBase.prototype.renderDOM = function(){
        var elm = document.createElement( this._tagName ), // TODO SVG
            attrs = this._attrs, property,
            childNodes = this._childNodes,
            i = 0, l;

        // attrs
        for( property in attrs ){
            if( property === 'style' ){
                elm.style.cssText = this.getCSSText();
            } else {
                elm.setAttribute( m_RENAME_ATTRIBUTES[ property ] || property, attrs[ property ] );
            };
        };

        if( !RenderDOM_rootNode ){
            RenderDOM_rootNode = elm;
        };
        
        // childNodes
        if( childNodes ){
            for( l = childNodes.length; i < l; ++i ){
                RenderDOM_parentNode = elm;
                childNodes[ i ].renderDOM();
            };
            RenderDOM_parentNode = null;
        };

        if( RenderDOM_rootNode === elm ){
            RenderDOM_rootNode = null;
            return elm;
        };
    };
};