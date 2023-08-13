//=============================================================================
//
//  p_Tyte
//
//=============================================================================

/**
 * @type {!function((string|!Tyte.DynamicNodeRenderer)):(!Tyte.Class|undefined)|undefined}
 */
var p_Tyte;

/**
 * @class
 * `new p_Tyte.Text( str )` を使うこと!
 */
var TyteTextNode;

/**
 * @class
 * `new p_Tyte.DocumentFragment( ___tyteNode )` を使うこと!
 */
var TyteDocumentFragment;

/**
 * `var div = p_Tyte('div');` を使うこと!
 * @constructor
 * @param {!Tyte.Attrs=} opt_attrs
 * @param {...(!Tyte.CanHasParent|string)} ___tyteNodes
 */
function TyteElementBase( opt_attrs, ___tyteNodes ){};

/** @class */
var TyteDynamicNodeBase;

//_____________________________________________________________________________
//
//  TyteTextNode Other
//_____________________________________________________________________________
//

/** @namespace */
var Tyte = {};

/** @typedef {!Function} */
Tyte.Class;

/** @typedef {!Object.<string,(string|number|!Tyte.AttributeRenderer|boolean)>} */
Tyte.Attrs;

/** @typedef {*} */
Tyte.RenderingParam;

/** @typedef {!function(this:TyteElementBase,Tyte.RenderingParam,string):(!Object|string|number|null|undefined)} */
Tyte.AttributeRenderer;

/** @typedef {!function(this:TyteElementBase,Tyte.RenderingParam,string):(string|number|null|undefined)} */
Tyte.StyleRenderer;

/** @typedef {!function(this:TyteDynamicNodeBase,Tyte.RenderingParam):(!TyteTextNode|!TyteElementBase|!TyteDocumentFragment|string)} */
Tyte.DynamicNodeRenderer;

/** @typedef {!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase} */
Tyte.CanHasParent;

/** @typedef {!TyteElementBase|!TyteDocumentFragment} */
Tyte.CanHasChildren;

/** @typedef {!TyteTextNode|!Tyte.CanHasChildren|!TyteDynamicNodeBase} */
Tyte.AllNode;
