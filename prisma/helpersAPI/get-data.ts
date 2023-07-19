import * as https from 'https';

interface IData {
  data: any;
}

export const getData = (url: string): Promise<IData> => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      response.setEncoding('utf-8');
      let body = '';

      response.on('data', (chunk) => (body += chunk));

      response.on('error', (error) => reject(error));

      response.on('end', () => {
        const isStatusOk =
          response.statusCode && response.statusCode >= 200 && response.statusCode < 300;
        const correctBody = body.replace(/ζ/g, 'Z');
        const data = JSON.parse(correctBody);

        if (!isStatusOk) {
          reject({
            status: response.statusCode,
            message: !isStatusOk && data.error ? data.error : response.statusMessage,
          });
        }

        resolve({ data });
      });
    });
  });
};
