import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
//uuid의 버전중 v1을 사용할 것이며, uuid라는 단어로 사용

@Injectable()
export class BoardsService {
    constructor(
        // @InjectRepository(BoardRepository)
        // private boardRepository: BoardRepository,
        private boardRepository: BoardRepository,
    ) {}

    createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }

    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    // createBoard(createBoardDto: createBoardDto) {
    //     // const title = createBoardDto.title;
    //     const { title, description } = createBoardDto;
    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         //title: title,
    //         description,
    //         //description: description,
    //         // 모델 필드명과 선언명이 같다면 명 하나만 적어주면 됨
    //         status: BoardStatus.PUBLIC
    //         // 게시글 공개 여부: default 공개
    //     }
    //     this.boards.push(board);
    //     return board;
    //     // return JSON.stringify(board);
    // }
// ----------------------------------------------------------------------------------
    // async, await: 요청 처리 시간이 다끝나고 결과값을 받을때, 처리가 완료된 후에 결과값을 받음
    // async getBoardByID(id: number): Promise <Board> {
    //     const found = await this.boardRepository.findOne(id);

    //     if(!found) {
    //         throw new NotFoundException(`Can't find Board with id ${id}`)
    //     }
        
    //     return found
    // }
// ------------------------------------------------------------------------------------
    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id);

    //     if(!found) {
    //         throw new NotFoundException(`Can't find Board with id ${id}`);
    //     }
    //     return found;
    // }

    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }
    // // return값을 void: 아무것도 return 하지않음
    // // id가 같지않은것만 남겨두고 같은 것만 삭제

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;

    //     return board;
    // }
}
