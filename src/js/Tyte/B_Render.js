/** @const */
var ATTRIBUTES_NO_VALUE = {checked:!0,compact:!0,declare:!0,defer:!0,disabled:!0,ismap:!0,multiple:!0,nohref:!0,noresize:!0,noshade:!0,nowrap:!0,readonly:!0,selected:!0};

var EMPTY_ELEMENTS        = {link:!0,meta:!0,br:!0,hr:!0,img:!0,input:!0,area:!0,base:!0,col:!0,embed:!0,keygen:!0,param:!0,source:!0},
    NO_CLOSE_TAG_REQUIRED = {p:!0,dt:!0,dd:!0,li:!0,option:!0,thead:!0,tfoot:!0,th:!0,tr:!0,td:!0,rt:!0,rp:!0,optgroup:!0,caption:!0,colgroup:!0,col:!0},
    REQUIRE_CLOSING_TAG   = {a:!0,audio:!0,del:!0,ins:!0,map:!0,noscript:!0,video:!0},
    TAGNAME_TO_NAMESPACE  = {
                                xml:  'http://www.w3.org/1999/xhtml',
                                svg:  'http://www.w3.org/2000/svg',
                                math: 'http://www.w3.org/1998/Math/MathML'
                            },
    SKIP_HTML_ESCAPE      = {script:!0,style:!0,plaintext:!0,xmp:!0,noscript:!0};