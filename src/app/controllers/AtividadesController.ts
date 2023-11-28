import { Request, Response} from "express";
import { getRepository } from "typeorm";
import Atividade from '../models/Atividades';

class AtividadeController{
    async list(req: Request, res: Response){
        const repository = getRepository(Atividade);
        const lista = await repository.find(); //encontra tudo o que está no repositório do Endereco/models
        return res.json(lista);
    }

    //metodos para insercao, elteracao e remocao de Atividade.
    async store(req: Request, res: Response){ //cria um repositorio apartir do enedereco, executa e devolve 

        const repository = getRepository(Atividade);//recupera o repositorio de Atividade

        const {id} = req.body;
        if(!id){ // a exclamacao inverte os valores do id

            const end = repository.create(req.body); // se não for informado o id ele cria um novo
            await repository.save(end);
            return res.json(end);

        }else{
            const Vid = await repository.findOne({where : {"id" : id }}); //testa se o id existe
            if(Vid){
    
                const end = repository.create(req.body); //se existir o id cadastrado ele altera
                await repository.save(end);
                return res.json(end);
                
                
            }else{ // se for informar o id e não existir no banco não faz nada
    
                return res.sendStatus(404); // não encontrado para alterar
            }
    
        }
    }
    
    async delete(req: Request, res: Response){
        try{
            const repository = getRepository(Atividade);
            const {id} = req.body;
            const end = await repository.findOne({where : {"id" : id }});
            if(end){
                await repository.remove(end);
                return res.sendStatus(204);
            }else{
                return res.sendStatus(404);
            }
        }catch(e:unknown){
        
            console.log(e);
            return res.sendStatus(500);
        }
    
        }
}


export default new AtividadeController(); // exporta uma Nova estância pra atividade no