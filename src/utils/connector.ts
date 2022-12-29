import { HttpException } from '@nestjs/common';
import axios, { Method } from 'axios';
import { microservices } from '../config/configuration';

type ConnectorType = {
  microservice: keyof typeof microservices;
  data?: any;
  headers?: any;
  url: string;
  method: Method;
};

export const connector = async ({
  headers,
  data,
  url,
  microservice,
  method,
}: ConnectorType) => {
  const { baseURL } = microservices[microservice];
  if (!headers) headers = {};

  const micro = await axios({
    baseURL,
    url,
    [method.toLowerCase() == 'get' ? 'params' : 'data']: data,
    headers: {
      ...microservices[microservice].headers,
      ...headers,
    },
    method,
  })
    .then(({ data }) => data)
    .catch((e) => {
      if (e.response.status >= 500)
        throw new HttpException('Error connecting to microservice', 500);
      if (e.response.status >= 400)
        throw new HttpException(e.response.data, 400);
    });

  return micro;
};
