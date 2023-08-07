//_____________________________________________________________________________
//
//  TyteElementBase Attributes
//_____________________________________________________________________________
//

/**
 * @param {string} attrName
 * @return {string|number|boolean|null}
 */
TyteElementBase.prototype.getAttribute = function( attrName ){
    var attrs = this._attrs,
        value = attrs ? attrs[ attrName ] : null;

    return value != null ? value : null;
};

/**
 * @param {string} attrName
 * @param {string|number|boolean} value
 * @return {!TyteElementBase}
 */
TyteElementBase.prototype.setAttribute = function( attrName, value ){
    if( attrName === 'style' && typeof value === 'string' ){
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
TyteElementBase.prototype.hasAttribute = function( attrName ){
    var attrs = this._attrs;

    return attrs && attrs[ attrName ] != null;
};

/**
 * @param {string} attrName
 * @return {!TyteElementBase}
 */
TyteElementBase.prototype.removeAttribute = function( attrName ){
    var attrs = this._attrs;

    attrs && delete attrs[ attrName ];
    return this;
};