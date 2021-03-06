const db =  require('./db.js');

module.exports = {
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
    getTemplateNamesByTeamId: async id => {
        const { rows } = await db.query(db.GET_TEMPLATENAMES_BY_TEAMID, [id]);
        return rows;
    },
    getTemplates: async teamId => {
        const id = isNaN(teamId) ? 0 : teamId
        const { rows } = await db.query(db.GET_TEMPLATES, [id]);
        return rows;
    },
    assignTemplateToTeam: async (teamId, templateName) => {
        await db.query(db.ASSIGN_TEMPLATE_TO_TEAM, [teamId, templateName]);
        return;
    },
    getQuestionsByTemplateName: async (templateName) => {
        const templateId = await db.query(db.GET_TEMPLATEID_BY_NAME, [templateName]);
        const { rows } = await db.query(db.GET_QUESTIONS_BY_TEMPLATEID, [templateId.rows[0].id]);
        return rows;
    },
    addEntry: async (userId, templateName) => {
        await db.query(db.ADD_ENTRY, [templateName, userId]);
        const { rows } = await db.query(db.GET_LATEST_ENTRY_FOR_USER_TEMPLATE_MATCH, [templateName, userId]);
        return rows[0];
    },
    addResponses: async (data, entryId) => {
        const values = Object.values(data);
        Object.keys(data).map(async (item, index) => {
            await db.query(db.ADD_RESPONSE, [entryId, item, values[index]]);
        })
        return;
    },
    getAllEntries: async (teamId) => {
        const { rows } = await db.query(db.GET_ALL_ENTRIES, [teamId]);
        return rows;
    },
    addTemplate: async (name, description, teamName) => {
        await db.query(db.ADD_TEMPLATE, [name, description, teamName]);
        return;
    },
    addQuestions: async (questions, teamId) => {
        questions.map(async (item, index) => {
            await db.query(db.ADD_QUESTION, [item.question, item.type, teamId]);
        })
        return;
    },
}