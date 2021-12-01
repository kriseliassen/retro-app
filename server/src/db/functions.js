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
    getUserById: async id => {
        const { rows } = await db.query(db.GET_USER_BY_ID, [id]);
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
    assignTeamToUser: async (userId, teamName) => {
        await db.query(db.ASSIGN_TEAM_TO_USER, [teamName, userId]);
        return;
    },
    getTeamById: async id => {
        const { rows } = await db.query(db.GET_TEAM_BY_ID, [id]);
        return rows[0];
    },
    getTemplateIdByTeamId: async team_id => {
        const { rows } = await db.query(db.GET_TEMPLATEID_BY_TEAMID, [team_id]);
        return rows;
    },
    getTemplateNameByTemplateId: async template_id => {
        const { rows } = await db.query(db.GET_TEMPLATENAME_BY_TEMPLATEID, [template_id]);
        return rows[0].name;
    },
}