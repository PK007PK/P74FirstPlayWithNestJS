import { Controller, Get, Headers, Ip, Query, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('fox')
export class FoxController {
  @Get()
  myFirstAction(
    @Headers('accept-encoding') encoding: string,
    @Ip() ip: string,
    @Query('name') name: string,
    @Query('surname') surname: string,
    @Req() request: Request,
  ) {
    console.log(encoding, ip);
    console.log(request.headers);

    return `<h1>Hello Fox!</h1>
    <p>Accept-Encoding: ${encoding}</p>
    <p>IP: ${ip}</p>
    <p>Name: ${name}, Surname ${surname}</p>
    `;
  }
}
