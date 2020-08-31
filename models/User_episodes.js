const db = require('../db/config')

class User_episodes {
    constructor(user_episodes) {
        this.id = user_episodes.id || null;
        this.title = user_episodes.title;
        this.imdb_id = user_episodes.imdb_id;
        this.ratings = user_episodes.ratings;
        this.has_watched = user_episodes.has_watched;
        this.series_id = user_episodes.series_id;
        this.user_id = user_episodes.user_id;
    }

    static getAll() {
        return db
            .manyOrNone('SELECT * FROM user_episodes ORDER BY title ASC')
            .then(episodes => episodes.map(episode => new this(episode)))
            .catch(err => console.log(err))
    }

    static getAllForUser(user_id) {
        return db.manyOrNone(
            `SELECT * FROM users
            JOIN user_episodes ON user_id = user_episodes.user_id
            WHERE users.id = $1
            `, user_id
        )
            .then(episodes => episodes.map(episode => new this(episodes)))
            .catch(err => console.log(err))
    }

    static getById(id) {
        return db
            .oneOrNone('SELECT * FROM user_episodes WHERE id = $1', id)
            .then(episode => new this(episode))
            .catch(err => console.log(err))
    }

    static getOneForUser(user_id, userEpisode_id) {
        return db
            .manyOrNone('SELECT * FROM user_episodes WHERE user_id = $1 AND id=$2', [user_id, userEpisode_id])
            .then(episode => new this(episode[0]))
            .catch(err => console.log(err))
    }
    save() {
        return db
            .one(
                `
            INSERT INTO user_episodes 
            (title, imdb_id, ratings, has_watched, series_id, user_id)
            VALUES
            ($/title/, $/imdb_id/, $/ratings/, $/has_watched/, $/series_id/, $/user_id/)
            RETURNING *
            `,
                this
            )
            .then(savedEpisode => Object.assign(this, savedEpisode))
            .catch(err => console.log(err))
    }

    delete() {
        return db.oneOrNone('DELETE FROM user_episodes WHERE id = $1', this.id)
    }
}

module.exports = User_episodes;