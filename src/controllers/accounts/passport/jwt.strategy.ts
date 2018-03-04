import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component, Inject } from '@nestjs/common';
import { AccountsService } from '../accounts.service';

const token_secret = process.env.TOKEN_SECRET || 'sfoodt'

@Component()
export class SFJwtStrategy extends Strategy {

  constructor(private readonly authService: AccountsService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: token_secret,
      },
      async (req, payload, next) => await this.verify(req, payload, next),
    );
    passport.use(this);
  }

  public async verify(req, payload, done) {

    const isValid = await this.authService.validateUser(payload);
    if (!isValid) {
      console.log(payload)
      return done('Unauthorized', false);
    }
    done(null, payload);
  }
}
