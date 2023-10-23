import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as passport from 'passport';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    // Use passport.authenticate with your strategy name (e.g., 'jwt')
    passport.authenticate('jwt', (err, user) => {
      if (err || !user) {
        // Handle authentication error or unauthorized access
        res.status(401).json({ message: 'Authentication failed' });
      } else {
        // Authentication successful, attach the user to the request object
        req.user = user;
        next();
      }
    })(req, res, next);
  }
}
