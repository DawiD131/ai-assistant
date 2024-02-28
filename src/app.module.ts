import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { HttpModule } from '@nestjs/axios';
import { SpotifyIntegrationModule } from './spotify-integration/spotify-integration.module';
import { SpotifyIntegrationController } from './spotify-integration/spotify-integration.controller';
import { SpotifyIntegrationService } from './spotify-integration/spotify-integration.service';
import { SpotifyIntegrationAuthService } from './spotify-integration/spotify-integration-auth.service';
import { ConfigModule } from '@nestjs/config';
import { EntryModule } from './entry/entry.module';
import { OpenaiService } from './openai.service';

@Module({
  imports: [
    HttpModule,
    SpotifyIntegrationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    EntryModule,
  ],
  controllers: [SpotifyIntegrationController],
  providers: [
    PrismaService,
    OpenaiService,
    SpotifyIntegrationService,
    SpotifyIntegrationAuthService,
  ],
})
export class AppModule {}
