import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Diario from '../models/Diario';

class DiarioController {
    async list(req: Request, res: Response){
        const repository = getRepository(Diario);
        const lista = await repository.createQueryBuilder('tb_diario').innerJoinAndSelect("tb_diario.atividades", "atividades").getMany(); //encontra tudo o que está no repositório do atividade/models
        return res.json(lista);
    }

    
    //metodos para adicao, alteração, remoção
    async store(req: Request, res: Response){

        const repository = getRepository(Diario);//recupera o repositorio
        console.log(req.body);
        const end = repository.create(req.body);
        await repository.save(end);
        return res.json(end);
    }

    async delete(req: Request, res: Response){
        try{
            const repository = getRepository(Diario);
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

        async update(req: Request, res: Response){
            const repository = getRepository(Diario);//recupera o repositorio do Atividades.
            const {id} = req.body;//extrai os atributos id do corpo da mensagem
            const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo id.
            if(!idExists){
                return res.sendStatus(404);
            }
            
            const j = repository.create(req.body); //cria a entidade Atividades
            
            await repository.save(j); //persiste (update) a entidade na tabela.
            
            return res.json(j);
        }
}

export default new DiarioController();