# TinyTemplete

Tiny Tempplete Library for SSR and SPA.

JavaScript の関数呼び出しでテンプレート(HTML 部品)を記述する
DOM っぽいけど微妙に異なる名前のメソッドで操作して、レンダーする(微妙に異なるのは Closure Compiler env:browser で名前を短縮する為)

~~~js
const _ = require('tyte')('div,span,img,p,li,i');

/**
 * <li
 *     className=mylistitem style=color:red>
 *     <i
 *         className=ico-twitter>
 *         X
 *     </i>
 *     <span>
 *         --ITEM NAME--
 *     </span>
 * </li>
 */
const t_LIST_ITEM =
    _.li(
        { className : 'mylistitem', style : 'color:red' },
        _.i(
            { className : 'ico-twitter' },
            'X'
        ),
        _.span(
            '--ITEM NAME--'
        )
    );

t_LIST_ITEM.getElementListByTag( 'span' )[ 0 ].setTextContent( 'Pineapple' );

if( isNode ){
    t_LIST_ITEM.renderSSR(); // => '<li class="mylistitem"><span>Pine apple</span>'
} else if( isBrowser ){
    t_LIST_ITEM.renderDOM(); // => HTMLListElement
};
~~~

~~~sh
gulp js
npm run test
~~~

dynamic node
dynamic attribute
dynamic style