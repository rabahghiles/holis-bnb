import { Controller, Get, Delete, Put, Param, Body, Query } from '@nestjs/common';
import { LocationService } from './Location.service';

type updatestype = {
  price: number;
}

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

  @Delete(':id')
  async deleteLocation(@Param('id') id) {
    return await this.locationService.deleteLocation(id);
  }
  
  
  @Put(':id')
  async updateLocation(@Param('id') id: number, @Body() obj: updatestype){
    return await this.locationService.updateLocation(id, obj.price);
  }

  

}
