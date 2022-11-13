import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Ip,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateFoxDto } from './dto/create-fox.dto';
import { FoxService } from './fox.service';

@Controller('fox')
export class FoxController {
  constructor(
    @Inject(FoxService) private foxService: FoxService, // <--- Dependency injection
  ) {}

  @Get()
  myFirstAction(
    @Headers('accept-encoding') encoding: string, // <--- Getting a header
    @Ip() ip: string, // <--- Getting an IP address
    @Query('name') name: string, // <--- Getting a query parameter
    @Query('surname') surname: string, // <--- Getting a query parameter
    @Req() request: Request, // <--- Getting a request object
  ) {
    console.log(encoding, ip);
    console.log(request.headers);

    return `<h1>Hello Fox!</h1>
    <p>Accept-Encoding: ${encoding}</p>
    <p>IP: ${ip}</p>
    <p>Name: ${name}, Surname ${surname}</p>
    `;
  }

  @Post('/')
  createFox(
    @Body() newFox: CreateFoxDto, // <--- Getting a body
  ) {
    return this.foxService.createFox(newFox); // <--- Calling a service
  }
}
