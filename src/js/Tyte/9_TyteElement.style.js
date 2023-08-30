//_____________________________________________________________________________
//
//  TyteElementBase Style
//_____________________________________________________________________________
//

if( !DEFINE_TYTE__DROP_INLINE_STYLE ){
    /**
     * @param {string} styleName
     * @return {string|number}
     */
    TyteElementBase.prototype.getStyle = function( styleName ){
        var style = this._attrs && this._attrs.style,
            value = style ? style[ styleName ] : '';

        return value == null ? '' : value;
    };

    /**
     * @param {string} styleName
     * @param {string|number} value
     * @return {!TyteElementBase}
     */
    TyteElementBase.prototype.setStyle = function( styleName, value ){
        var attrs = this._attrs,
            style = attrs && attrs.style;

        if( !style ){
            style = {};
            attrs = this._attrs = attrs || {};
            attrs.style = style;
        };
        style[ styleName ] = value;

        return this;
    };

    /**
     * @param {string} styleName
     * @return {!TyteElementBase}
     */
    TyteElementBase.prototype.removeStyle = function( styleName ){
        var style = this._attrs && this._attrs.style;

        if( style ){
            delete style[ styleName ];
        };

        return this;
    };

    /**
     * @param {string} cssText
     * @return {!TyteElementBase}
     */
    TyteElementBase.prototype.setCSSText = function( cssText ){
        if( cssText ){
            var styles = cssText.split( ';' ),
                i = 0, l, propertyAndValue, property;

            for( l = styles.length; i < l; ++i ){
                propertyAndValue = styles[ i ];
                property = propertyAndValue.split( ':' )[ 0 ].split( ' ' ).join( '' );
                this.setStyle( property, propertyAndValue.substr( propertyAndValue.indexOf( ':' ) + 1 ) );
            };
        };
        return this;
    };
};
