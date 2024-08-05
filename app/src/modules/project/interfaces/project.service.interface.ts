import { type CreateProjectDto } from 'app/modules/project/dtos/create-project.request.dto';
import { type FindProjectByIdDto } from 'app/modules/project/dtos/find-project-by-id.request.dto';
import { type CreatedProjectDto } from 'app/modules/project/dtos/created-project.response.dto';
import { type DeleteProjectDto } from 'app/modules/project/dtos/delete-project.request.dto';

export interface IProjectService {
  create_project(request: CreateProjectDto): Promise<CreatedProjectDto>;

  find_project(request: FindProjectByIdDto): Promise<CreatedProjectDto>;

  delete_project(request: DeleteProjectDto): Promise<void>;
}
