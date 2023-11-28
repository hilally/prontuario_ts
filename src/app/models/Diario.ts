import { Column, Entity, PrimaryGeneratedColumn, TableInheritance, OneToMany, OneToOne, JoinColumn } from "typeorm";
import Atividade from "./Atividades";
import Paciente from "./Paciente";
@Entity ('tb_diario')
class Diario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    observacoes: string;

    @Column('date')
    data_registro: Date;

    //associação
    @OneToMany(() => Atividade, atividade => atividade.diario)
    atividades: Atividade[];

    @OneToOne(() => Paciente, paciente => paciente.diario)
    @JoinColumn()
    paciente: Paciente;
}

export default Diario;