import { BaseQueryParameterDto } from "src/shared/dto/base-query-parameters.dto";

export class FindUserQueryDto extends BaseQueryParameterDto {
    name: string;
    lastName: string;
    email: string;
    active: boolean;
    role: string;
}