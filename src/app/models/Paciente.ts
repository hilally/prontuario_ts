import {Column, JoinTable, ChildEntity, ManyToOne, OneToOne, JoinColumn} from 'typeorm';
import  Usuario  from './Usuario';
import Profissional from './Profissional';
import Diario from './Diario';
    @ChildEntity()
    export default class Paciente extends Usuario{
        @Column('text')
        medicacao: string;

        @Column('text')
        objetivo: string;

        //agregacao
        @ManyToOne(() => Profissional)
        @JoinTable({
            name: 'tb_paciente',
            joinColumn: { name: 'paciente_cpf', referencedColumnName: 'cpf' },
        })
        profissional: Profissional;

        //associacao
        @OneToOne(() => Diario, diario => diario.paciente)
        @JoinColumn()
        diario: Diario;
}