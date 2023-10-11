import { EntityDTO, wrap } from '@mikro-orm/core';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class EntityTransformerInterceptor<TData, KResponse>
  implements NestInterceptor
{
  transform(
    data: EntityDTO<TData> | EntityDTO<TData>[],
    _context?: ExecutionContext,
  ): KResponse | KResponse[] {
    return data as KResponse | KResponse[];
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<TData>,
  ): Observable<KResponse | KResponse[]> {
    return next.handle().pipe(
      map((data: TData) => {
        let raw: EntityDTO<TData> | EntityDTO<TData>[];

        if (Array.isArray(data)) {
          raw = data.map((item) => wrap<TData>(item).toObject());
        } else {
          raw = wrap<TData>(data).toObject();
        }

        return this.transform(raw, context);
      }),
    );
  }
}
