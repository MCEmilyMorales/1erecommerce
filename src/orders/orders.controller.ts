import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './order.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  async addOrder(@Body() createOrder: CreateOrderDto) {
    const { userId, products } = createOrder;
    return await this.ordersService.addOrder(userId, products);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getOrder(@Param('id', ParseUUIDPipe) idOrder: string) {
    console.log(idOrder);

    return await this.ordersService.getOrder(idOrder);
  }
}
/**
 * {
  "userId":"UUID del usuario",
  "products":[
     {
   "id":"UUID producto 1"
  },
  {
    "id":"UUID producto 2"
  }
    ]
}
 */