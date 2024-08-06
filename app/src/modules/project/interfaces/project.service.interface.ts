import { type CreateProjectDto } from 'app/modules/project/dtos/create-project.request.dto';
import { type FindProjectByIdDto } from 'app/modules/project/dtos/find-project-by-id.request.dto';
import { type FoundProjectDto } from 'app/modules/project/dtos/found-project.response.dto';
import { type CreatedProjectDto } from 'app/modules/project/dtos/created-project.response.dto';
import { type DeleteProjectDto } from 'app/modules/project/dtos/delete-project.request.dto';
import { type FindProjectsDto } from 'app/modules/project/dtos/find-projects.request.dto';
import { type FoundProjectsDto } from 'app/modules/project/dtos/found-projects.response.dto';

export interface IProjectService {
  create_project(request: CreateProjectDto): Promise<CreatedProjectDto>;

  find_project(request: FindProjectByIdDto): Promise<FoundProjectDto>;

  find_projects(request: FindProjectsDto): Promise<FoundProjectsDto>;

  delete_project(request: DeleteProjectDto): Promise<void>;
}
