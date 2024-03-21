# TinyTemplete

Tiny Tempplete Library for SSR and SPA.

JavaScript の関数呼び出しでテンプレート(HTML 部品)を記述する

DOM っぽいけど微妙に異なる名前のメソッドで操作して、レンダーする(微妙に異なるのは Closure Compiler env:browser で名前を短縮する為)

[動的 Node, 動的属性, 動的 style を追加する](https://x.com/itozyun/status/1690001394999148544)

~~~js
const $ = require('tyte');
const li = $('li');
const i = $('i');
const span = $('span');

/**
 * <li class=mylistitem style=color:red>
 *     <i class=ico-twitter>
 *         X
 *     </i>
 *     <span>
 *         ...
 *     </span>
 * </li>
 */
const t_LIST_ITEM =
    li( { className : 'mylistitem', style : 'color:red' },
        i( { className : 'ico-twitter' },
            'X'
        ),
        span(
            '...'
        )
    );

t_LIST_ITEM.getElementListByTag( 'span' )[ 0 ].setTextContent( 'Pineapple' );

if( isNode ){
    t_LIST_ITEM.renderSSR(); // => '<li class="mylistitem"><span>Pineapple</span>'
} else if( isBrowser ){
    t_LIST_ITEM.renderDOM(); // => HTMLLiElement
};
~~~

~~~sh
gulp js
npm run test
~~~
