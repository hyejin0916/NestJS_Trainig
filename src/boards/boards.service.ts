import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { createBoardDto } from './dto/create-board.dto';
//uuid의 버전중 v1을 사용할 것이며, uuid라는 단어로 사용

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: createBoardDto) {
        // const title = createBoardDto.title;
        const { title, description } = createBoardDto;
        const board: Board = {
            id: uuid(),
            title,
            //title: title,
            description,
            //description: description,
            // 모델 필드명과 선언명이 같다면 명 하나만 적어주면 됨
            status: BoardStatus.PUBLIC
            // 게시글 공개 여부: default 공개
        }
        this.boards.push(board);
        return board;
        // return JSON.stringify(board);
    }

    getBoardById(id: string): Board {
        return this.boards.find((board) => board.id === id);
    }

    deleteBoard(id: string): void {
        this.boards = this.boards.filter((board) => board.id !== id);
    }
    // return값을 void: 아무것도 return 하지않음
    // id가 같지않은것만 남겨두고 같은 것만 삭제

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;

        return board;
    }
}
