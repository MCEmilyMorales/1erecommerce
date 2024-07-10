import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './order.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  async addOrder(@Body() createOrder: CreateOrderDto) {
    const { userId, products } = createOrder;
    return await this.ordersService.addOrder(userId, products);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  async getOrder(@Param('id', ParseUUIDPipe) idOrder: string) {
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
    @ApiResponse({
    status: 201,
    description: 'Products added successfully.',
    schema: {
      example: {
        userId: 'UUID del usuario',
        products: [
          { id: 'UUID producto 1' },
          { id: 'UUID producto 2' }
        ]
      }
    }
  })
 */
