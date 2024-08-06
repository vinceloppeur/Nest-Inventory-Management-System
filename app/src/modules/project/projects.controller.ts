/* vendors */
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
  Version,
} from '@nestjs/common';
import { type Request } from 'express';

/* interfaces */
import { type IProjectService } from 'app/modules/project/interfaces/project.service.interface';

/* providers */
import { AuthGuard } from 'app/modules/auth/auth.guard';
import { ProjectService } from 'app/modules/project/project.service';

/* types and DTOs */
import { type ApiResponse } from 'app/lib/apis/api-response';
import { type FoundProjectsDto } from 'app/modules/project/dtos/found-projects.response.dto';

@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
  private project_service: IProjectService;

  public constructor(project_service: ProjectService) {
    this.project_service = project_service;
  }

  @Version('1')
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async find_projects_v1(
    @Req() req: Request & { user_id: string },
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
  ): Promise<ApiResponse<FoundProjectsDto>> {
    const result = await this.project_service.find_projects({
      user_id: req.user_id,
      page,
    });

    return { message: 'projects found', data: result, status: HttpStatus.OK };
  }
}
