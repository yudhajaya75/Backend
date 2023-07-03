import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity('users')
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}