import { Request, Response} from "express";
import { getRepository } from "typeorm";
import Profissional from '../models/Profissional';

class ProfissionalController{
    async login(req: Request, res: Response){
        const repository = getRepository(Profissional);
        const {cpf, senha} = req.body;
        const c = await repository.findOne(
            {where : {"cpf" : cpf, "senha" : senha }});
            if(c){
                //  res.sendStatus(201);
                  return res.json(c);
              }else{
                  return res.sendStatus(204);
            }
        }
        async find(req: Request, res: Response){
            const repository = getRepository(Profissional);
            const cpf = req.params.cpf;
            const c = await repository.findOne({where : {"cpf" : cpf}});
            if(c){
                console.log(c);      
                return res.json(c);
            }else{
                return res.sendStatus(204);
            }
        }    
        async list(req: Request, res: Response){
            const repository = getRepository(Profissional);
            const lista = await repository.createQueryBuilder('tb_profissional').leftJoinAndSelect("tb_profissional.paciente", "paciente").getMany(); //encontra tudo o que está no repositório do Profissional/models
        return res.json(lista);  
        }

        async store(req: Request, res: Response){ //cria um repositorio apartir do enedereco, executa e devolve 
            const repository = getRepository(Profissional);//recupera o repositorio
            console.log(req.body);
            const end = repository.create(req.body);
            await repository.save(end);
            return res.json(end);
            
            }
            
    async delete(req: Request, res: Response){
        try{
            const repository = getRepository(Profissional);
            const {cpf} = req.body;
            const end = await repository.findOne({where : {"cpf" : cpf }});
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
            const repository = getRepository(Profissional);//recupera o repositorio do Profissional.
            const {cpf} = req.body;//extrai os atributos cpf do corpo da mensagem
            const cpfExists = await repository.findOne({where :{cpf}});//consulta na tabela se existe um registro com o mesmo cpf.
            if(!cpfExists){
                return res.sendStatus(404);
            }
            const c = repository.create(req.body); //cria a entidade Profissional
            await repository.save(c); //persiste (update) a entidade na tabela.
            return res.json(c);
        }
}

export default new ProfissionalController();