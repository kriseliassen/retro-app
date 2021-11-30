const db =  require('./db.js');

module.exports ={
    teams: async () => {
        const { rows } = await db.query(db.GET_ALL_TEAMS);
        return rows;
    },
    users: async () => {
        const { rows } = await db.query(db.GET_ALL_USERS);
        return rows;
    },
    getUserByEmail: async email => {
        const { rows } = await db.query(db.GET_USER_BY_EMAIL, [email]);
        return rows[0];
    },
    addUser: async (user) => {
        await db.query(db.ADD_USER, Object.values(user));
        return;
    },
    deleteUserByEmail: async (email) => {
        await db.query(db.DELETE_USER_BY_EMAIL, [email]);
        return;
    },
    addTeam: async (name) => {
        await db.query(db.ADD_TEAM, [name]);
        return;
    },
    getTeamByName: async name => {
        const { rows } = await db.query(db.GET_TEAM_BY_NAME, [name]);
        return rows[0];
    },
}