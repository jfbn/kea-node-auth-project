const { Model } = require('objection');
const Elective = require('./Elective');

class User extends Model {
    static tableName = 'users';

    static relationMappings = {
        electives: {
            relation: Model.HasManyRelation,
            modelClass: Elective,
            join: {
                from: 'users.id',
                to: 'users_electives.user_id'
            }
        }
    }
}

module.exports = User;
