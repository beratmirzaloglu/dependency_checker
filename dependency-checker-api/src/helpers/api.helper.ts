import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

export class ApiHelper {
  private static http = new HttpService();

  static async get(url: string): Promise<AxiosResponse> {
    const result = lastValueFrom(this.http.get(url));
    return result;
  }
}
