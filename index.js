const CONVERT_ATTR_NAMES = { 'class' : 'className', 'for' : 'htmlFor' };

const ATTRS_NO_VALUE = {checked:!0,compact:!0,declare:!0,defer:!0,disabled:!0,ismap:!0,multiple:!0,nohref:!0,noresize:!0,noshade:!0,nowrap:!0,readonly:!0,selected:!0};

const JSDOM = require( 'jsdom' ).JSDOM;

module.exports = function( htmlString, opt_selector ){
    const codes    = [],
          jsdom    = new JSDOM( htmlString, { includeNodeLocations : true } ),
          document = jsdom.window.document;

    walkNode( opt_selector && document.querySelector( opt_selector ) || document.documentElement, 0, true );

    return codes.join( '\n' ) + ';';

    function walkNode( currentNode, depth, isLastChild ){
        function tab(){
            return ' '.repeat( depth * 4 );
        };
        function comma( _comma ){
            return _comma ? ',' : '';
        };
        function closingParenthesis( close, _comma ){
            return close ? ')' + comma( _comma ) : '';
        };

        const textContent      = currentNode.data,
              generatedByJsdom = !jsdom.nodeLocation( currentNode );

        switch( currentNode.nodeType ){
            case 1 :
                const attributes      = {},
                      tagName         = currentNode.tagName.toLowerCase(),
                      jsdomChildNodes = currentNode.childNodes,
                      jsdomAttrs      = currentNode.attributes,
                      numAttrs        = jsdomAttrs.length;

                if( !generatedByJsdom ){                    
                    if( numAttrs ){
                        for( let i = 0, l = numAttrs; i < l ; ++i ){
                            const attribute = jsdomAttrs.item( i ),
                                  attrName  = attribute.name;
                            let attrValue = ATTRS_NO_VALUE[ attrName ] ? 1 : attribute.value;
    
                            if( attrValue === '' + parseInt( attrValue, 10 ) ){
                                attrValue = parseInt( attrValue, 10 );
                            };
                            attributes[ CONVERT_ATTR_NAMES[ attrName ] || attrName ] = attrValue;
                        };
                        codes.push( tab() + tagName + '(' + JSON.stringify( attributes ) + comma( jsdomChildNodes.length ) + closingParenthesis( !jsdomChildNodes.length, !isLastChild ) );
                    } else {
                        codes.push( tab() + tagName + '(' + closingParenthesis( !jsdomChildNodes.length, !isLastChild ) );
                    };
                    if( !jsdomChildNodes.length ){
                        return;
                    };
                } else {
                    --depth;
                };
                for( let i = 0, l = jsdomChildNodes.length; i < l; ++i ){
                    walkNode( jsdomChildNodes[ i ], 1 + depth, i + 1 === l );
                };
                if( !generatedByJsdom ){
                    codes.push( tab() + ')' + comma( !isLastChild ) );
                };
                break;
            case 3 :
                codes.push( tab() + "'" + textContent.split( "'" ).join( "\\'" ).split( '\n' ).join( '\\n' ) + "'" + comma( !isLastChild ) );
                break;
            default :
                codes.push( tab() + '""' + comma( !isLastChild ) );
                break;
        };
    };
};