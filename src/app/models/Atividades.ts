import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Diario from './Diario';

@Entity('tb_atividades')
class Atividade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    fisica: string;

    @Column("varchar")
    mental: string;

    @Column("varchar")
    academica: string;

    //associacao
    @ManyToOne(() => Diario, diario => diario.atividades, { onDelete: 'CASCADE' })
    diario: Diario;

}
export default Atividade;