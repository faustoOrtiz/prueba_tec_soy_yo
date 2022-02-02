const  request  = require('request');


const newEntity = (entity) => {
    return {
        entityId: entity.entityId,
        name: entity.name,
        identificationNumber: entity.identificationNumber,
        expirationDate: entity.expirationDate,
        contactName: entity.contactName,
        contactEmail: entity.contactMail,
        logo: entity.logo,
    };
};

const getEntity = async (id) => {
  
     return new Promise(function(resolve, reject){
        request(`${process.env.WS}/${process.env.ENVIRONMENT}/entity/v2.1/entities/${id}`, function (error, response, body) {
            if (error) return reject(error);
            try {     
                entity=JSON.parse(body).data;
                resolve(entity);
            } catch(e) {
                reject(e);
            }
        });
    });
  
};

const entityFilter = async (req, res, next) => {
        
    const startId = req.body.startId;
    const endId = req.body.endId;
    let status = false;
    const entities = [];
    
    try {
        if ( startId < 1 || startId > 20 || !startId || endId < 1 || endId>20 || !endId || startId > endId  ) {
            res.status(404).send({
                error: "Error no se encuentra para rango especificado",
            });

        } else {
           
            
            for (let i = startId; i <= endId; i++) {
                entityFind = await getEntity(i);
                if ( !entityFind.name || !entityFind.identificationNumber || !entityFind.expirationDate || !entityFind.contactName || !entityFind.contactMail) {
                    status = true;
                    break;
                }
                entities.push(newEntity(entityFind));
            }
            if (status) {
                res.status(400).send({
                    error: "Error en validación datos de entrada",
                });
            } else {
                res.status(200).send({entities});
            }
        }
    } catch (error) {
        res.status(500).send({
            error: "Error ",
        });
        
    }
};



module.exports.entityFilter=entityFilter