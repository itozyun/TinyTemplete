const test = require('ava');
const _ = require('../dist/index.js')('div,span,ul,li,img,i,b');

const t_list = _.ul().ready();

const t_listItem =
    _.li(
        { className : 'my-list-item' },
        _.i(
            { className : 'ico-twitter' }
        ),
        'Twitter'
    ).ready();

test('simple', (t) => {
    t.deepEqual( t_list.renderSSR(), '<ul></ul>' );
    t.deepEqual( t_listItem.renderSSR(), '<li class="my-list-item"><i class="ico-twitter"></i>Twitter' );
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
    t_listItem.setNext( _.li('Google+') );
    t.deepEqual( t_list.getTextContent(), 'XGoogle+Facebook' );
});

test('setPrev', (t) => {
    t_list.getChildNodes()[1].setPrev( _.li('mixi') );
    t.deepEqual( t_list.getTextContent(), 'XmixiGoogle+Facebook' );
});

