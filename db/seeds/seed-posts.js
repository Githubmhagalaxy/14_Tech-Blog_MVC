const {Posts} = require('../index');

const postsData = [
    {
        title: 'post1 title',
        content: 'post1 content',
        user_id: 1
    },
    {
        title: 'post2 title',
        content: 'post2 content',
        user_id: 1
    },
    {
        title: 'post3 title',
        content: 'post3 content',
        user_id: 1
    }
];

module.exports = () => Posts.bulkCreate(postsData);