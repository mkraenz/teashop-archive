import { Tea as PrismaTea } from '@prisma/client';

// TODO do we really need the domain level Tea class?
class Tea implements PrismaTea {
  id: string;
  name: string;
  price: number;
  bestAtTemperature: number;
  tags: string;
  imageUrl: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
