import { ArgumentMetadata, BadRequestException, ConsoleLogger, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

export class BoardStatusValidationPipe implements PipeTransform {
    
    // readonly: Class 외부에서 접근이 가능하지만, 값을 변경할 수 없음
    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]

    transform(value: any) {
        value = value.toUpperCase();
        // 들어온 value를 모두 대문자로

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't in the status options`)
        }

        return value;
    }

    // value가 StatusOptions안에 있는 두가지의 값이 맞는지 체크
    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        // status가 StatusOptions안에 해당하는 값이라면 그에 해당하는 index값을 넣음
        return index !== -1;
        // 해당하는 값이 아니라면 인덱스값을 -1 줌
        // -1 은 리스트 안에서 없는 값을 찾을때 -1이라는 문구가 나옴
    }
}