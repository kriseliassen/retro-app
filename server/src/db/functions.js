const db =  require('./db.js');

module.exports ={
    teams: async () => {
        const { rows } = await db.query(db.GET_ALL_TEAMS);
        return rows;
    } 
}