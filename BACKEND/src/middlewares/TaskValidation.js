const TaskModel = require('../model/TaskModel');
const { isPast } = require('date-fns') // O data FNS é um módulo node para tratar datas e possui várias funções.

const TaskValidation = async (req, res, next) => {

  const { macaddress, type, title, description, when } = req.body;

  if(!macaddress)
  return res.status(400).json({ error: 'macaddress é obrigatório'});
  else if (!type)
  return res.status(400).json({ error: 'tipo é obrigatório'});
  else if (!title)
  return res.status(400).json({ error: 'title é obrigatório'})
  else if (!description)
  return res.status(400).json({ error: 'descrição é obrigatório'})
  else if (!when)
  return res.status(400).json({ error: 'Data e hora é obrigatório'})
  else if (isPast(new Date(when)))
  return res.status(400).json({ error: 'escolha uma data e hora futura'})
  
  else{
    let exists; 
    
    if (req.params.id){ 
      exists = await TaskModel.
        findOne( 
          {
          '_id': {'$ne': req.params.id},  // '$ne' operador de negação que seja diferente.      
          'when': {'$eq': new Date(when)}, // '$eq' é um operador de equals e o new Date esta convertendo o valor retornado que veio em formato de texto.
          'macaddress':{'$in': macaddress} // '$in' é um operador que verifica se esta condito
        });
        
    } else {

      exists = await TaskModel.
        findOne( 
          {         
          'when': {'$eq': new Date(when)}, 
          'macaddress':{'$in': macaddress}
        });
      
    }
    // Aqui estamos verificando se atividade exixte pelo hora e usuário
      if(exists){
        return res.status(400).json({ error: 'já existe uma tarefa nesse dia e nesse horário'})
      }

    next();
  }

}

module.exports = TaskValidation;