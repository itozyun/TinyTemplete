//_____________________________________________________________________________
//
//  TyteElementBase Class
//_____________________________________________________________________________
//

/**
 * @param {string} className
 * @return {boolean}
 */
TyteElementBase.prototype.hasClass = function( className ){
    return ( ' ' + this.getClass() + ' ' ).indexOf( ' ' + className + ' ' ) !== -1;
};

/**
 * @return {string}
 */
TyteElementBase.prototype.getClass = function(){
    return /** @type {string} */ (this.getAttr( 'className' )) || '';
};

/**
 * @param {string} className
 * @return {!TyteElementBase}
 */
TyteElementBase.prototype.setClass = function( className ){
    return this.setAttr( 'className', className );
};

/**
 * @param {string} className
 * @return {!TyteElementBase}
 */
TyteElementBase.prototype.addClass = function( className ){
    if( className && !this.hasClass( className ) ){
        var _class = this.getClass();
        
        this.setClass( _class ? _class + ' ' + className : className );
    };
    return this;
};

/**
 * @param {string} className
 * @return {!TyteElementBase}
 */
TyteElementBase.prototype.removeClass = function( className ){
    if( className && this.hasClass( className ) ){
        var _class = this.getClass().split( ' ' );
        
        _class.splice( _class.indexOf( className ), 1 );
        this.setClass( _class.join( ' ' ) );
    };
    return this;
};

/**
 * @param {string} className
 * @param {boolean=} opt_toggle
 * @return {!TyteElementBase}
 */
TyteElementBase.prototype.toggleClass = function( className, opt_toggle ){
    var toggle = opt_toggle === true ? true : opt_toggle === false ? false : !this.hasClass( className );

    return toggle ? this.addClass( className ) : this.removeClass( className );
};