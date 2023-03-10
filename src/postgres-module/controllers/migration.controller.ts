import { Controller, Get, Param } from '@nestjs/common';
import { DataMigrationService } from '../services/migration.service';

@Controller()
export class MigrationController {
  constructor(private readonly transferService: DataMigrationService) {}

  @Get('bulkTransfer/:limit/:offset')
  async transfer(
    @Param('limit') limit: number,
    @Param('offset') offset: number,
  ) {
    // 2001324
    await this.transferService.bulkTransfer(limit, offset);
    return { message: 'Data transferred successfully' };
  }
}
