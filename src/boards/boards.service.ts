import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';
//uuid의 버전중 v1을 사용할 것이며, uuid라는 단어로 사용

@Injectable()
export class BoardsService {
    constructor(
        // @InjectRepository(BoardRepository)
        // private boardRepository: BoardRepository,
        private boardRepository: BoardRepository,
    ) {}

    // async, await: 요청 처리 시간이 다끝나고 결과값을 받을때, 처리가 완료된 후에 결과값을 받음
    async getAllBoard(
        user: User,
    ): Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId', { userId: user.id})

        const boards = await query.getMany();
        return boards;
    }

    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne({ where: { id } });

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
        return found;
    }

    async deleteBoard(id: number, user: User): Promise<void> {
        const result = await this.boardRepository.delete({id:id, user:{id: user.id}});

        if(result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }

        console.log('result', result);
        // 실행결과: DeleteResult { raw: [], affected: 1 }
        // affected: 영향을 받은 데이터가 1개
    }
    // return값을 void: 아무것도 return 하지않음
    // id가 같지않은것만 남겨두고 같은 것만 삭제

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }
}
