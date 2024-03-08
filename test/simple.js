const test = require('ava');
const $ = require('../dist/index.js');
const ul = $('ul')
const li = $('li')
const i = $('i')

const t_list = ul();

const t_listItem =
    li(
        { className : 'my-list-item' },
        i(
            { className : 'ico-twitter' }
        ),
        'Twitter'
    );

const hasAttr = ul().setAttr( 'title', 'list' ).setClass( 'gaa' );

test('simple', (t) => {
    t.deepEqual( t_list.renderSSR(), '<ul></ul>' );
    t.deepEqual( t_listItem.renderSSR(), '<li class="my-list-item"><i class="ico-twitter"></i>Twitter' );

    t.deepEqual( t_list.renderHTMLJSON(), [ 'ul' ] );
    t.deepEqual( t_listItem.renderHTMLJSON(), [ 'li.my-list-item', [ 'i.ico-twitter' ], 'Twitter' ] );

    t.deepEqual( hasAttr.renderHTMLJSON(), [ 'ul.gaa', { title : 'list' } ] );

    t.deepEqual( $.Text( 'Hello!' ).renderHTMLJSON(), [ 3, 'Hello!' ] );
});

test('appendNode', (t) => {
    t_list.appendNode(t_listItem);
    t.deepEqual( t_list.renderSSR(), '<ul><li class="my-list-item"><i class="ico-twitter"></i>Twitter</ul>' );
    t_list.appendNode(t_listItem);
    t.deepEqual( t_list.renderSSR(), '<ul><li class="my-list-item"><i class="ico-twitter"></i>Twitter</ul>' );
});

test('getLastChild', (t) => {
    t_listItem.getLastChild().text = 'X';
    t.deepEqual( t_list.renderSSR(), '<ul><li class="my-list-item"><i class="ico-twitter"></i>X</ul>' );
});

test('getTextContent', (t) => {
    t.deepEqual( t_list.getTextContent(), 'X' );
    t.deepEqual( t_listItem.getFirstChild().getTextContent(), '' );
});

test('clone', (t) => {
    const t_listItem2 = t_listItem.clone(true);
    t.deepEqual( t_listItem2.renderSSR(), '<li class="my-list-item"><i class="ico-twitter"></i>X' );

    t_listItem2.getFirstChild().setAttr( 'className', 'ico-facebook' );
    t_listItem2.getLastChild().text = 'Facebook';

    t.deepEqual( t_listItem2.renderSSR(), '<li class="my-list-item"><i class="ico-facebook"></i>Facebook' );

    t_list.appendNode(t_listItem2);
    t.deepEqual( t_list.getTextContent(), 'XFacebook' );

    t_list.prependNode(t_listItem2);
    t.deepEqual( t_list.getTextContent(), 'FacebookX' );
});

test('setNext', (t) => {
    t_list.prependNode(t_listItem);
    t_listItem.setNext( li('Google+') );
    t.deepEqual( t_list.getTextContent(), 'XGoogle+Facebook' );
});

test('setPrev', (t) => {
    t_list.getChildNodes()[1].setPrev( li('mixi') );
    t.deepEqual( t_list.getTextContent(), 'XmixiGoogle+Facebook' );
});

