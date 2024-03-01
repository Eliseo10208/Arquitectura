import amqplib from 'amqplib'
import { INotificationNewPago } from '../../domain/service/INotificationNewPago'
import { Pago } from '../../domain/entities/Pago'
import { buffer } from 'stream/consumers';


export class NotificationNewPago implements INotificationNewPago{
    private options: any;
    private url: any;
    private exch: any;
    private server: any;
    constructor() {
        this.options = {
          protocol:'amqp',
          username: 'zoe',
          password:'zoe10208',
          port: 5672,
            
        };
        this.url = 'amqp://admin:zoe10208@34.198.106.93';
        this.exch = 'up.practica';
        //Options solo para cloudamqp
       // this.server = process.env.AMQP_SERVER;
      }
      async  sendNotification(pago: Pago): Promise<boolean> {
          try {
          const conn = await amqplib.connect(this.url);
          const ch =await conn.createChannel();
          
          const status = ch.publish(this.exch,"", Buffer.from(JSON.stringify(pago)))
         
          return status;
          } catch (error) {
            return false;
          }

      }
}