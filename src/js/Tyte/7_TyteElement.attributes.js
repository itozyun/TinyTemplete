//_____________________________________________________________________________
//
//  TyteElementBase Attributes
//_____________________________________________________________________________
//

/**
 * @param {string} attrName
 * @return {string|number|boolean|!Tyte.AttributeRenderer|null}
 */
TyteElementBase.prototype.getAttr = function( attrName ){
    var attrs = this._attrs,
        value = attrs ? attrs[ attrName ] : null;

    return value != null ? value : null;
};

/**
 * @param {string} attrName
 * @param {string|number|boolean|!Tyte.AttributeRenderer} value
 * @return {!TyteElementBase}
 */
TyteElementBase.prototype.setAttr = function( attrName, value ){
    if( !DEFINE_TYTE__DROP_INLINE_STYLE && attrName === 'style' && typeof value === 'string' ){
        this.setCSSText( value );
    } else {
        var attrs = this._attrs = this._attrs || {};

        if( value != null ){
            attrs[ attrName ] = value;
        } else {
            delete attrs[ attrName ];
        };
    };
    return this;
};

/**
 * @param {string} attrName
 * @return {boolean}
 */
TyteElementBase.prototype.hasAttr = function( attrName ){
    var attrs = this._attrs;

    return attrs ? attrs[ attrName ] != null : false;
};

/**
 * @param {string} attrName
 * @return {!TyteElementBase}
 */
TyteElementBase.prototype.removeAttr = function( attrName ){
    var attrs = this._attrs;

    attrs && delete attrs[ attrName ];
    return this;
};