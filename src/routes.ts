import {Router} from 'express';
import AtividadeController from './app/controllers/AtividadesController';
import DiarioController from './app/controllers/DiarioController';
import ProfissionalController from './app/controllers/ProfissionalController';
import PacienteController from './app/controllers/PacienteController';


const router = Router();


router.get('/diario/list', DiarioController.list);
router.post('/diario/store', DiarioController.store);
router.delete('/diario/delete', DiarioController.delete);
router.put('/diario/update', DiarioController.update);


router.get('/atividades/list', AtividadeController.list);
router.post('/atividades/store', AtividadeController.store);
router.delete('/atividades/delete', AtividadeController.delete);
router.put('/atividades/update', AtividadeController.update);

router.get('/paciente/list', PacienteController.list);
router.post('/paciente/store', PacienteController.store);
router.delete('/paciente/delete', PacienteController.delete);
router.put('/paciente/update', PacienteController.update);
router.post('/paciente/login', PacienteController.login);
router.get('/paciente/: cpf', PacienteController.find); 

router.get('/profissional/list', ProfissionalController.list);
router.post('/profissional/store', ProfissionalController.store);
router.delete('/profissional/delete', ProfissionalController.delete);
router.put('/profissional/update', ProfissionalController.update);
router.post('/profissional/login', ProfissionalController.login);
router.get('/profissional/: cpf', ProfissionalController.find);

export default router;

//http://localhost:3000/