const Pool = require('ibm_db').Pool;
let DB2_CONN_STR = process.env.DB2CONNLOCAL;
const ibmDbPool = new Pool();
ibmDbPool.setMaxPoolSize(process.env.DBPOOL);
ibmDbPool.setConnectTimeout(800);


const query = (sqlQueryStr) => {
  console.log("kkkkkkkkk")
    return new Promise((resolve, reject) => {
        ibmDbPool.open(DB2_CONN_STR, (err, conn) => {
            if (err) {
                console.log('Error in performDbRequest', err, sqlQueryStr);
                conn.close();
                reject(err);
            } else {
                conn.query(sqlQueryStr)
                    .then((result) => {
                        conn.close();
                        resolve(result);
                    }).catch((error) => {
                        console.log('Error in performDbRequest - conn.query', error, sqlQueryStr);
                        conn.close();
                        reject(error);
                    });
            }
        });
    });
};

module.exports = {
    query
}