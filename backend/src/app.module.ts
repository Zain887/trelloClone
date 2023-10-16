
import { MiddlewareConsumer,Module , NestModule, RequestMethod} from '@nestjs/common';
import { JwtMiddleware } from '../src/jwt/jwt.middleware'; // Import your custo
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { ListModule } from './list/list.module';
import { BoardMemberModule } from './board_member/board_member.module';
import { CardMemberModule } from './card_member/card_member.module';
import { CardModule } from './card/card.module';
import { CommentModule } from './comment/comment.module';
import { MemberModule } from './member/member.module';
import { TodoModule } from './todo/todo.module';
import { TodoItemModule } from './todo_item/todo_item.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { dataSourceOptions } from 'db/data-source';


@Module({
  imports: [JwtModule.register({
    secret: jwtConstants.secret, 
  }),
    TypeOrmModule.forRoot(dataSourceOptions), 
    AuthModule,
    UserModule,
    BoardModule,
    ListModule,
    BoardMemberModule,
    CardMemberModule,
    CardModule,
    CommentModule,
    MemberModule,
    TodoModule,
    TodoItemModule,
  ],
  controllers: [AppController],
  providers: [AppService] ,
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).exclude(
      { path: 'auth', method: RequestMethod.ALL },
      { path: 'users/signup', method: RequestMethod.POST },
      'auth/(.*)',
    ).forRoutes('*'); 
  }
}