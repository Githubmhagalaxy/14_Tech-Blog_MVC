const Users = require('./models/Users');
const Posts = require('./models/Posts');
const Comments = require('./models/Comments');

Posts.belongsTo(Users)

Users.hasMany(Posts);

Posts.hasMany(Comments);

Comments.belongsTo(Posts);

Comments.belongsTo(Users);

Users.hasOne(Comments);



module.exports = {
    Users,
    Posts,
    Comments
}