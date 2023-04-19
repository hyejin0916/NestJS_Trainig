import { Board } from "src/boards/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(type => Board, board => board.user, { eager: true })
    // 타입, board의 user컬럼에 접근, 유저정보를 가져올 때 board정보도 같이 가져옴
    boards: Board[];

    async validatePassword(password: string): Promise<Boolean> {
        let isValid = await bcrypt.compare(password, this.password)
        return isValid
    }
}