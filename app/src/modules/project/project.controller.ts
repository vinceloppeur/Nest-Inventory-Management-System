/* vendors */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Version,
  Delete,
  Param,
  Req,
} from '@nestjs/common';
import { type Request } from 'express';

/* interfaces */
import { type IProjectService } from 'app/modules/project/interfaces/project.service.interface';

/* providers */
import { ProjectService } from 'app/modules/project/project.service';

import { AuthGuard } from 'app/modules/auth/auth.guard';

import { DtoValidationPipe } from 'app/lib/pipes/dto-validation.pipe';

/* validations */
import { CreateProjectValidation } from 'app/modules/project/validations/create-project.validation';

/* types and DTOs */
import { type ApiResponse } from 'app/lib/apis/api-response';
import { type CreatedProjectDto } from 'app/modules/project/dtos/created-project.response.dto';
import { type FoundProjectDto } from 'app/modules/project/dtos/found-project.response.dto';

@Controller('project')
@UseGuards(AuthGuard)
export class ProjectController {
  private project_service: IProjectService;

  public constructor(project_service: ProjectService) {
    this.project_service = project_service;
  }

  @Version('1')
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async create_project_v1(
    @Body(new DtoValidationPipe(CreateProjectValidation))
    body: CreateProjectValidation,
    @Req() req: Request & { user_id: string },
  ): Promise<ApiResponse<CreatedProjectDto>> {
    const created = await this.project_service.create_project({
      name: body.name,
      user_id: req.user_id,
    });

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
    @Param('id') id: string,
    @Req() req: Request & { user_id: string },
  ): Promise<ApiResponse<FoundProjectDto>> {
    const result: FoundProjectDto = await this.project_service.find_project({
      user_id: req.user_id,
      project_id: id,
    });

    return {
      message: 'project found',
      data: result,
      status: HttpStatus.OK,
    };
  }

  @Version('1')
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async delete_project_v1(
    @Param('id') id: string,
    @Req() req: Request & { user_id: string },
  ): Promise<ApiResponse> {
    await this.project_service.delete_project({
      user_id: req.user_id,
      project_id: id,
    });

    return {
      message: 'project deleted successfuly',
      status: HttpStatus.OK,
    };
  }
}
