const { Model } = require('objection');
const User = require('./User');

class Elective extends Model {
    static tableName = 'users_electives';

    static relationMappings = {
        users: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'user_electives.user_id',
                to: 'users.id'
            }
        }
    }
}

module.exports = Elective;
