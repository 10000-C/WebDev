import { Middleware, IMiddleware, Inject } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';

@Middleware()
export class JwtMiddleware implements IMiddleware<Context, NextFunction> {
  @Inject()
  jwtService: JwtService;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const authHeader = ctx.headers.authorization;
      
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        try {
          const payload = (await this.jwtService.verify(token)) as unknown as {
            id: number;
            role: string;
            name: string;
          };

          ctx.state.user = {
            id: payload.id,
            role: payload.role,
            name: payload.name
          };
        } catch (e) {
          ctx.logger.warn('JWT验证失败:', e.message);
        }
      }
      
      await next();
    };
  }

  static getName(): string {
    return 'jwt';
  }
}