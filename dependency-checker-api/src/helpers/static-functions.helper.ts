import { HttpException, HttpStatus } from '@nestjs/common';

export class StaticFunctions {
  static convertToURL(urlString: string): URL {
    try {
      const url = new URL(urlString);
      return url;
    } catch (error) {
      throw new HttpException(
        'Please enter a valid url with protocol (like http or https)',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  static makeVersionCodesSameLength(
    currentVersion: string[],
    latestVersion: string[],
  ): void {
    // find the less
    if (latestVersion.length > currentVersion.length) {
      // add zeros to current version until they are equal
      while (true) {
        const count = currentVersion.push('0');
        if (count === latestVersion.length) break;
      }
    } else if (currentVersion.length > latestVersion.length) {
      // add zeros to latest version until they are equal
      while (true) {
        const count = latestVersion.push('0');
        if (count === latestVersion.length) break;
      }
    }
  }
}
