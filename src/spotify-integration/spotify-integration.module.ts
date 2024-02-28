import { Module } from '@nestjs/common';
import { SpotifyIntegrationController } from './spotify-integration.controller';
import { SpotifyIntegrationService } from './spotify-integration.service';
import { HttpModule } from '@nestjs/axios';
import { SpotifyIntegrationAuthService } from './spotify-integration-auth.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [SpotifyIntegrationController],
  providers: [
    SpotifyIntegrationService,
    SpotifyIntegrationAuthService,
    PrismaService,
  ],
})
export class SpotifyIntegrationModule {}
