const db = require('../db/db');

exports.getAvgCloseCTdaysdata = async () => {
  const sql = `SELECT AVG (CLOSED_CT_DAYS) AS LINE_DATA, COUNT(DISTINCT (DISPUTE_NBR)) AS BAR_DATA ,DISPUTE_END_MONTH 
        FROM PRSCR.CLOSED_DISPUTE_AP_GCG_JP GROUP BY DISPUTE_END_MONTH` 
        return await db.query(sql);

}

exports.getAvgCloseCTdaysdatawithmarket = async (market) => {
  const whereClause = (market === 'A5EAN+SG') ? `WHERE MARKET2='A5EAN'` : `WHERE MARKET2='${market}'`;
  const sql = `SELECT AVG (CLOSED_CT_DAYS) AS LINE_DATA, COUNT(DISTINCT (DISPUTE_NBR)) AS BAR_DATA ,DISPUTE_END_MONTH 
        FROM PRSCR.CLOSED_DISPUTE_AP_GCG_JP ${whereClause} GROUP BY DISPUTE_END_MONTH` 
        return await db.query(sql);

}