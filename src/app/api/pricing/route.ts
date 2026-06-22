import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Fetch Vehicle Models
    const vehicleModels = await prisma.vehicleModel.findMany({
      orderBy: { modelName: 'asc' },
    });

    // 2. Fetch Services and their prices
    const services = await prisma.service.findMany({
      include: {
        prices: true,
      },
    });

    // 3. Fetch Surcharges
    const surcharges = await prisma.surcharge.findMany();

    return NextResponse.json({
      success: true,
      data: {
        vehicleModels,
        services,
        surcharges,
      },
    });
  } catch (error) {
    console.error('Error fetching pricing data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pricing data' },
      { status: 500 }
    );
  }
}
