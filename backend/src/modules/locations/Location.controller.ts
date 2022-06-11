import { Controller, Get, Param, Req, Query } from '@nestjs/common';
import { LocationService } from './Location.service';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async getLocations() {
    return await this.locationService.getLocations();
  }

  @Get('search')
  async searchLocation(@Query('q') q) {
    return await this.locationService.searchLocations(q);
  }

  @Get(':id')
  async getLocation(@Param('id') id) {
    return await this.locationService.getLocation(id);
  }

}
