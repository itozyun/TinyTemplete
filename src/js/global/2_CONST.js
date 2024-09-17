/**
 * @enum {number}
 */
var TYTE_NODE_TYPE = {
    ELEMENT_NODE           : 1,
    DOCUMENT_FRAGMENT_NODE : DEFINE_TYTE__DEBUG ? 11 : 2,
    TEXT_NODE              : 3,
    DYNAMIC_NODE           : 4,
    DOCUMENT_TYPE_NODE     : DEFINE_TYTE__DEBUG ? 10 : 5,
    PROCESSING_INSTRUCTION : 7
};