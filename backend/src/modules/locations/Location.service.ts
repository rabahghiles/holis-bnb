import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './Location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async getLocations() {
    return await this.locationRepository.find();
  }

  async getLocation(id: number) {
    if (isNaN(id)) throw new HttpException('Type number attendu pour le parametre id', HttpStatus.BAD_REQUEST);
    const query = {
      where: { id },
      relations: ["category"],
    }
    return await this.locationRepository.findOne(query);
  }

  async searchLocations(keyword: string) {
    if ( keyword.length <= 0 ) return [];

    return await this.locationRepository.createQueryBuilder().select()
      .where('title ILIKE :query', {query: `%${keyword}%`})
      .orWhere('description ILIKE :query', {query: `%${keyword}%`})
      .orWhere('location ILIKE :query', {query: `%${keyword}%`})
      .getMany();


    // return await this.locationRepository.createQueryBuilder().select()
    //   .where(`MATCH(title) AGAINST ('${keyword}' IN BOOLEAN MODE)`)
    //   .orWhere(`MATCH(description) AGAINST ('${keyword}' IN BOOLEAN MODE)`)
    //   .orWhere(`MATCH(location) AGAINST ('${keyword}' IN BOOLEAN MODE)`)
    //   .getMany();
  }
}
