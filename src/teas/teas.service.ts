import { Injectable } from '@nestjs/common';
import { CreateTeaInput } from './dto/create-tea.input';
import { UpdateTeaInput } from './dto/update-tea.input';

@Injectable()
export class TeasService {
  create(createTeaInput: CreateTeaInput) {
    return 'This action adds a new tea';
  }

  findAll() {
    return [];
  }

  findOne(id: string) {
    return `This action returns a #${id} tea`;
  }

  update(id: string, updateTeaInput: UpdateTeaInput) {
    return `This action updates a #${id} tea`;
  }

  remove(id: string) {
    return `This action removes a #${id} tea`;
  }
}
