const userSeeder = require('./seed-users');
const postSeeder = require('./seed-posts');
const commentSeeder = require('./seed-comments');
const sequelize = require('../../config/connection');

(async () => {
    await sequelize.sync({ force: true });
    await userSeeder();
    await postSeeder();
    await commentSeeder();
})();

