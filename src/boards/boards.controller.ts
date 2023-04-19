import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    // 모든 게시글을 가져오는 핸들러
    @Get('/')
    getAllBoard(
        @GetUser() user: User,
    ): Promise<Board[]> {
        return this.boardsService.getAllBoard(user);
    }

    // 게시글 생성
    @Post('')
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto,
    @GetUser() user:User): Promise<Board> {
        // console.log(createBoardDto)
        // { title: 'Board 5', description: 'Board 5' }
        return this.boardsService.createBoard(createBoardDto, user);
    }
    // 특정 게시글 가져오기
    @Get('/:id')
    getBoardById(@Param('id') id: number) : Promise<Board> {
        return this.boardsService.getBoardById(id);
    }
    // 파라미터가 여러개인 경우
    // (@Param() params: string[])으로 작성

    // 게시글 삭제
    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.boardsService.deleteBoard(id);
    }

    // 게시글 상태 업데이트
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ) : Promise<Board> {
        return this.boardsService.updateBoardStatus(id, status)
    }
}