import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from './Location.service';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  /** List all locations in database with this endpoint */
  @Get()
  async getLocations() {
    return await this.locationService.getLocations();
  }

  @Get(':id')
  async getLocation(@Param('id') id) {
    return await this.locationService.getLocation(id);
  }
}
