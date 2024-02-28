import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SpotifyIntegrationService {
  private readonly logger = new Logger(SpotifyIntegrationService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async getToken() {
    return this.prisma.spotifyIntegration.findFirst();
  }

  async getAvailableDevices() {
    const { token } = await this.getToken();
    const { data } = await firstValueFrom(
      this.httpService.get('https://api.spotify.com/v1/me/player/devices', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );

    return data;
  }

  async play() {
    const { token } = await this.getToken();
    const { data } = await firstValueFrom(
      this.httpService.put(
        'https://api.spotify.com/v1/me/player/play?device_id=6ab6e2121a10ed61ea69aa27644155798bc02f4d',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    );

    return data;
  }
}
