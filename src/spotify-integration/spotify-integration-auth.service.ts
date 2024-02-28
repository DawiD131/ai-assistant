import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { PrismaService } from '../prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SpotifyIntegrationAuthService {
  private readonly logger = new Logger(SpotifyIntegrationAuthService.name);
  constructor(
    private readonly httpService: HttpService,
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async auth(code: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .post(
          'https://accounts.spotify.com/api/token',
          {
            code: code,
            redirect_uri:
              'http://localhost:3000/spotify-integration/auth/callback',
            grant_type: 'authorization_code',
          },
          {
            headers: {
              Authorization:
                'Basic ' +
                Buffer.from(
                  this.configService.get<string>('SPOTIFY_CLIENT_ID') +
                    ':' +
                    this.configService.get<string>('SPOTIFY_CLIENT_SECRET'),
                ).toString('base64'),
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw error;
          }),
        ),
    );

    return this.prisma.spotifyIntegration.create({
      data: {
        token: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
      },
    });
  }

  getLoginQueryParameters() {
    const scope =
      'streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing';
    const state = this.generateRandomString(16);

    return new URLSearchParams({
      response_type: 'code',
      client_id: this.configService.get<string>('SPOTIFY_CLIENT_ID'),
      scope: scope,
      redirect_uri: 'http://localhost:3000/spotify-integration/auth/callback',
      state: state,
    }).toString();
  }

  generateRandomString(length: number) {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
