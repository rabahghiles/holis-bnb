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
    return await this.locationRepository.find({
      order: {
        price: "ASC"
      }
    });
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
  }

  async deleteLocation(id: number) {
    if (isNaN(id)) throw new HttpException('Type number attendu pour le parametre id', HttpStatus.BAD_REQUEST);
    console.log("delete", id);
    return await this.locationRepository.delete(id);
  }

  async updateLocation(id: number, price: number) {
    if (isNaN(id)) throw new HttpException('Type number attendu pour le parametre id', HttpStatus.BAD_REQUEST);
    if (isNaN(price)) throw new HttpException('Type number attendu pour le prix de la locations', HttpStatus.BAD_REQUEST);

    await this.locationRepository
    .createQueryBuilder()
    .update(Location)
    .set({ price })
    .where("id = :id", { id })
    .execute()

    const query = {
      where: { id },
      relations: ["category"],
    }
    return await this.locationRepository.findOne(query);
  }
}
