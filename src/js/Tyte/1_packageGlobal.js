//=============================================================================
//
//  p_Tyte
//
//=============================================================================

/**
 * @type {!function((string|!Tyte.DynamicNodeRenderer)):(!Tyte.Class|undefined)|undefined}
 */
var p_Tyte;

//_____________________________________________________________________________
//
//  Type Definitions
//_____________________________________________________________________________
//

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
 * @param {...(!Tyte.CanHasParent|string|number)} ___tyteNodes
 */
function TyteElementBase( opt_attrs, ___tyteNodes ){};

/**
 * @class
 * `var CustomElement = p_Tyte(dynamicNodeRendererFunction);` を使うこと!
 */
var TyteDynamicNodeBase;

/** @namespace */
var Tyte = {};

/** @typedef {!function(this:(Tyte.AllNode|?), ...?)} */
Tyte.Class;

/** @typedef {!Object.<string,(string|number|!Tyte.AttributeRenderer|boolean)>} */
Tyte.Attrs;

/** @typedef {*} */
Tyte.RenderingParam;

/** @typedef {!function(this:TyteElementBase,Tyte.RenderingParam,string):(!Object|string|number|null|undefined)} */
Tyte.AttributeRenderer;

/** @typedef {!function(this:TyteElementBase,Tyte.RenderingParam,string):(string|number|null|undefined)} */
Tyte.StyleRenderer;

/** @typedef {!function(this:TyteDynamicNodeBase,Tyte.RenderingParam):(!TyteTextNode|!TyteElementBase|!TyteDocumentFragment|string|number)} */
Tyte.DynamicNodeRenderer;

/** @typedef {!TyteTextNode|!TyteElementBase|!TyteDynamicNodeBase} */
Tyte.CanHasParent;

/** @typedef {!TyteElementBase|!TyteDocumentFragment} */
Tyte.CanHasChildren;

/** @typedef {!Tyte.CanHasParent|!TyteDocumentFragment} */
Tyte.AllNode;
