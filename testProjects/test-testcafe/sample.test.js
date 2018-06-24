import { Selector } from 'testcafe';

fixture `Getting Started`
    .page `http://devexpress.github.io/testcafe/example`;

test('Example of success test', async t => {
    await t
        .typeText('#developer-name', 'John Smith')
        .click('#submit-button')

        .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});

test('Example of fail test', async t => {
    await t
        .typeText('#developer-name', 'Billy')
        .click('#submit-button')

        .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});
