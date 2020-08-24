const {Comments} = require('../index');

const commentsData = [
    {
        text: 'this is first comment text',
        user_id: 1,
        post_id: 1
    },
    {
        text: 'this is 2nd comment text',
        user_id: 1,
        post_id: 1
    },
    {
        text: 'this is 3rd comment text',
        user_id: 1,
        post_id: 2
    },
    {
        text: 'this is 4th comment text',
        user_id: 1,
        post_id: 3
    }
];

module.exports = () => Comments.bulkCreate(commentsData);