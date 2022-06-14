import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './Category.entity'

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategories() {
    return await this.categoryRepository.find();
  }


  async getCategory(id: number) {
    if (isNaN(id)) throw new HttpException('Type number attendu pour le parametre id', HttpStatus.BAD_REQUEST);
    return await this.categoryRepository.findOne({id});
  }



}