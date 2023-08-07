//_____________________________________________________________________________
//
//  TyteElementBase Style
//_____________________________________________________________________________
//

/**
 * @param {string} styleName
 * @return {string|number}
 */
TyteElementBase.prototype.getStyle = function( styleName ){
    var style = this.getAttribute( 'style' ),
        value = style ? style[ styleName ] : '';

    return value == null ? '' : value;
};

/**
 * @param {string} styleName
 * @param {string|number} value
 * @return {!TyteElementBase}
 */
TyteElementBase.prototype.setStyle = function( styleName, value ){
    var style = this.getAttribute( 'style' );

    if( !style ){
        this.setAttribute( 'style', style = {} );
    };
    style[ styleName ] = value;

    return this;
};

/**
 * @param {string} styleName
 * @return {!TyteElementBase}
 */
TyteElementBase.prototype.removeStyle = function( styleName ){
    var style = this.getAttribute( 'style' );

    if( style ){
        delete style[ styleName ];
    };

    return this;
};

/**
 * @return {string}
 */
TyteElementBase.prototype.getCSSText = function(){
    var cssText = [], i = -1,
        style = this.getAttribute( 'style' ), property;

    for( property in style ){
        cssText[ ++i ] = property + ':' + style[ property ];
    };

    return cssText.join( ';' );
};

/**
 * @param {string} cssText
 * @return {!TyteElementBase}
 */
TyteElementBase.prototype.setCSSText = function( cssText ){
    var styles = cssText.split( ';' ),
        i = 0, l, propertyAndValue, property;

    for( l = styles.length; i < l; ++i ){
        propertyAndValue = styles[ i ];
        property = propertyAndValue.split( ':' )[ 0 ].split( ' ' ).join( '' );
        this.setStyle( property, propertyAndValue.substr( propertyAndValue.indexOf( ':' ) + 1 ) );
    };
    return this;
};

