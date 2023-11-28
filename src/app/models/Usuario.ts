import {Entity, Column, PrimaryColumn, TableInheritance} from 'typeorm';
@Entity('tb_usuario')
@TableInheritance({ column: { type: "varchar", name: "type" } })
export default abstract class Usuario {
    @PrimaryColumn('text')
    cpf: string;

    @Column('text')
    nome: string;

    @Column('date')
    data_nasc: Date;

    @Column('text')
    senha: string;

    @Column('text')
    telefone: string;
}