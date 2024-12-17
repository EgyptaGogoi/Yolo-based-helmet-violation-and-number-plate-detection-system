import { Module } from '@nestjs/common';
import { DetectViolationController } from './detect-violation.controller';
import { DetectViolationService } from './detect-violation.service';

@Module({
  controllers: [DetectViolationController],
  providers: [DetectViolationService]
})
export class DetectViolationModule {}
