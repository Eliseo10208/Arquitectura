import amqplib from 'amqplib'
import { INotificationNewFactura } from '../../domain/services/INotificationNewFactura'
import { Factura } from '../../domain/entities/Factura'
import { buffer } from 'stream/consumers';


export class NotificationNewFactura implements INotificationNewFactura{
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
        this.exch = 'up.practica.pendiente';
        //Options solo para cloudamqp
       // this.server = process.env.AMQP_SERVER;
      }
      async  sendNotification(factura: Factura): Promise<boolean> {
          try {
          const conn = await amqplib.connect(this.url);
          const ch =await conn.createChannel();
          
          const status = ch.publish(this.exch,"", Buffer.from(JSON.stringify(factura)))
         
          return status;
          } catch (error) {
            return false;
          }

      }
}