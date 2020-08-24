const {Users} = require('../index');

const usersData = [
    {username: 'test1', password: '$2b$10$NrauXIqY/7TueYTJ5VBQsuIaFYB6sbpiuU.0PgLYQUu9Pjy58x9Eu'}
]

module.exports = () => Users.bulkCreate(usersData)