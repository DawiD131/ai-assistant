import { Controller, Get, Query, Res } from '@nestjs/common';
import { SpotifyIntegrationAuthService } from './spotify-integration-auth.service';

@Controller('spotify-integration')
export class SpotifyIntegrationController {
  constructor(private spotifyAuthService: SpotifyIntegrationAuthService) {}
  @Get('/auth/callback')
  authCallback(@Query('code') code: string) {
    return this.spotifyAuthService.auth(code);
  }

  @Get('/auth/login')
  login(@Res() res) {
    const urlParams = this.spotifyAuthService.getLoginQueryParameters();
    res.redirect('https://accounts.spotify.com/authorize?' + urlParams);
  }
}
