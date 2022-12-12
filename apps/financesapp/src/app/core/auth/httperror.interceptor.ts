import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        let title = '';
        let icon: any = '';

        if (error instanceof HttpErrorResponse) {
          console.log(error);
          switch (error.status) {
            case 400:
              title = 'Erro';
              icon = 'error';
              errorMsg = `Requisição inválida`;
              break;
            case 401:
              title = 'Erro';
              icon = 'error';
              errorMsg = `Usuário sem acesso`;
              break;
            case 403:
              title = 'Atenção';
              icon = 'warning';
              errorMsg = `${error?.error?.message}`;
              break;
            case 404:
              title = 'Atenção';
              icon = 'warning';
              errorMsg = `O servidor não pode encontrar o recurso solicitado`;
              break;
            case 409:
              title = 'Erro';
              icon = 'error';
              errorMsg = `${error?.error?.message}`;
              break;
            case 500:
              title = 'Erro Interno';
              icon = 'error';
              errorMsg = `${error?.error?.message}`;
              break;
            case 503:
              title = 'Erro Interno';
              icon = 'error';
              errorMsg = `Serviço temporariamente indisponível`;
              break;
            default:
              title = 'Erro';
              icon = 'error';
              errorMsg = `Não foi possível encontrar a origem do erro`;
              break;
          }
          console.log(errorMsg, title);
          Swal.fire({
            title: title,
            text: errorMsg,
            icon,
          });
        } else {
          console.error('some thing else happened');
        }

        return throwError(errorMsg);
      })
    );
  }
}
