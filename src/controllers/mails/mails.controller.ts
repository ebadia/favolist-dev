import { Controller, Get, Post, Req, Param, Body, Query } from '@nestjs/common'
import { MailsService } from './mails.service'

@Controller('mails')
export class MailsController {
  constructor(private readonly mailsService: MailsService) {}

  // @Get()
  // async mail() {
  //   this.mailsService.mail()
  // }
  //
  @Post('/welcome')
  async postMail( @Body() payload: any ) {
    return await this.mailsService.welcome( payload )
  }


}
