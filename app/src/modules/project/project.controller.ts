import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  Version,
  Headers,
} from '@nestjs/common';

import { type ApiResponse } from 'app/lib/apis/api-response';
import { DtoValidationPipe } from 'app/lib/pipes/dto-validation.pipe';
import { extract_bearer_token } from 'app/lib/utils/extract-bearer-token';
import { AuthGuard } from 'app/modules/auth/auth.guard';
import { AuthService } from 'app/modules/auth/auth.service';
import { type IAuthService } from 'app/modules/auth/interfaces/auth.service.interface';
import {
  create_project,
  type CreateProjectDto,
} from 'app/modules/project/dtos/create-project.request.dto';
import { type CreatedProjectDto } from 'app/modules/project/dtos/created-project.response.dto';
import { find_project_by_id } from 'app/modules/project/dtos/find-project-by-id.request.dto';
import { type FoundProjectDto } from 'app/modules/project/dtos/found-project.response.dto';
import { type IProjectService } from 'app/modules/project/interfaces/project.service.interface';
import { ProjectService } from 'app/modules/project/project.service';

@Controller('project')
@UseGuards(AuthGuard)
export class ProjectController {
  private project_service: IProjectService;
  private auth_service: IAuthService;

  public constructor(
    project_service: ProjectService,
    auth_service: AuthService,
  ) {
    this.project_service = project_service;
    this.auth_service = auth_service;
  }

  @Version('1')
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async create_project_v1(
    @Body(new DtoValidationPipe(create_project)) body: CreateProjectDto,
    @Headers('authorization') authorization: string,
  ): Promise<ApiResponse<CreatedProjectDto>> {
    const token: string = extract_bearer_token(authorization);

    const creator_uid: string = await this.auth_service.extract_uid(token);

    const created = await this.project_service.create_project(
      body,
      creator_uid,
    );

    return {
      message: 'successfuly created project',
      data: created,
      status: HttpStatus.CREATED,
    };
  }

  @Version('1')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async find_project_v1(
    @Param('id', new DtoValidationPipe(find_project_by_id)) id_param: string,
  ): Promise<ApiResponse<FoundProjectDto>> {
    const result: FoundProjectDto =
      await this.project_service.find_project(id_param);

    return {
      message: 'project found',
      data: result,
      status: HttpStatus.OK,
    };
  }
}
