const {response, request, json} = require('express');
var firebird = require('node-firebird');
const conections =  require('../database/connections');

const getArticleVisualMin = (req = request, res = response) => {
    const code = req.params.code;
    const result = new Promise((resolve, reject) => {
        firebird.attach( conections.G32 ,function(err, db) {
            if (err) {
                console.log('Error',err);
                reject(err)
            }
                db.query(
                    `
                    select * from  XTJEC_ARTICULOMINVISUAL  where clave = '${code}';
                    ` , 
                    function(err, articles) {
                        if (err) {
                            reject(error)
                        }
                        console.log(articles);

                        db.detach();
                        articles = articles.map(article => {
                            return {
                                code : article.CLAVE.toString('utf-8'),
                                article : article.NOMBRE.toString('latin1'),
                                minium : article.MINVISUAL
                            }
                        });
                        console.log(articles);
                        resolve(articles[0]);
                });
        });
    });
    result.then( article =>  res.json({
        article
    }));
}

const saveArticleVisualMin = (req = request, res = response) => {
    const article = req.body;
    console.log(article);
    article.article = article.article.replace("'", "");
    const result = new Promise((resolve, reject) => {
        firebird.attach( conections.G32 ,function(err, db) {
            if (err) {
                console.log('Error',err);
                reject(err)
            }
            db.transaction(firebird.ISOLATION_READ_COMMITED, function(err, transaction) {
                transaction.query(
                    `
                    INSERT INTO XTJEC_ARTICULOMINVISUAL (CLAVE, NOMBRE, MINVISUAL) VALUES ('${article.code}', '${article.article}', ${article.minium});    
                    `, 
                    async function(err) {
                        if (err) {
                            console.log('error2',err);
                            reject(err)
                        }
                        transaction.commit(function(err) {
                            if ('err3', err){
                                console.log(err);
                                transaction.rollback();
                            }
                            else
                                db.detach();
                                resolve('Article Saved');
                        });
                    }
                ); 
            });
        });
    });
    result.then( data =>  res.json({
        msg:data
    }));
}

const updateArticleVisualMin = (req = request, res = response) => {
    const article = req.body
    const result = new Promise((resolve, reject) => {
        firebird.attach( conections.G32 ,function(err, db) {
            if (err) {
                console.log('Error',err);
                reject(err)
            }
            db.transaction(firebird.ISOLATION_READ_COMMITED, function(err, transaction) {
            console.log('article',article);

                transaction.query(
                    `
                    UPDATE XTJEC_ARTICULOMINVISUAL
                    SET MINVISUAL = ${ article.minium }
                    WHERE (CLAVE = '${ article.code }' ); 
                    `, 
                    async function(err) {
                        if (err) {
                            console.log('err2',err);
                            reject(err)
                        }
                        transaction.commit(function(err) {
                            if (err){
                                console.log('err3',err);
                                transaction.rollback();
                            }
                            else
                                db.detach();
                                resolve('Article updated');
                        });
                    }
                ); 
            });
        });
    });
    result.then( data =>  res.json({
        msg:data
    }));
}

module.exports = { 
    saveArticleVisualMin,
    getArticleVisualMin,
    updateArticleVisualMin
}
