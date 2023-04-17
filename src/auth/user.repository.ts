import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";

export class UserRepository extends Repository<User> {
    constructor(@InjectRepository(User) private dataSource: DataSource) {
        super(User, dataSource.manager)
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        const { username, password } = authCredentialsDto;
        const user = this.create({ username, password });

        await this.save(user);
    }

    // async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    //     const { title, description } = createBoardDto;

    //     const board = this.create({
    //         title,
    //         description,

    //         status: BoardStatus.PUBLIC
    //     });

    //     await this.save(board)
    //     return board;
    // }   
}