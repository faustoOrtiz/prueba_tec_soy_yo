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

const entityFilter = async (req, res) => {
    let statusEntity = false;
    const entities = [];
         
    const startId = req.body.startId;
    const endId = req.body.endId;
   
    
    try {
        if ( startId < 1 || startId > 20 || !startId || endId < 1 || endId>20 || !endId || startId > endId  ) {
            res.status(404).send({
                error: "Error no se encuentra para rango especificado ",
            });

        } else {
           
            for (let i = startId; i <= endId; i++) {
                entityFind = await getEntity(i);
                statusEntity = await valfindEntity(entityFind);
                if(!statusEntity){
                    entities.push(newEntity(entityFind));
                }
            }
            if (statusEntity) {
                res.status(400).send({
                    error: "Error en validación datos de entrada",
                });
            } else {

                entities.sort(function (a, b) {
                    if (a.name > b.name) {
                      return 1;
                    }
                    if (a.name < b.name) {
                      return -1;
                    }
                    return 0;
                  });
                  
                res.status(200).send({entities});
            }
        }
    } catch (error) {
        res.status(500).send({
            error: "Error ",
        });
        
    }
};
const  valfindEntity = async (entityFind)=>{
    
    let status;

    if(!entityFind.name || !entityFind.identificationNumber || !entityFind.expirationDate || !entityFind.contactName || !entityFind.contactMail){
        status=true;
    }else{
        status=false;
    }
    return status
} ;


module.exports.entityFilter=entityFilter