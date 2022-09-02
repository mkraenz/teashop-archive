import { Injectable } from '@nestjs/common';
import { CreateTeaInput } from './dto/create-tea.input';
import { UpdateTeaInput } from './dto/update-tea.input';

@Injectable()
export class TeasService {
  create(createTeaInput: CreateTeaInput) {
    return 'This action adds a new tea';
  }

  findAll() {
    return `This action returns all teas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tea`;
  }

  update(id: number, updateTeaInput: UpdateTeaInput) {
    return `This action updates a #${id} tea`;
  }

  remove(id: number) {
    return `This action removes a #${id} tea`;
  }
}
