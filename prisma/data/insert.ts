import * as fs from 'fs';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse';

export async function insertCasing() {
  const csvPath = path.resolve(__dirname, 'casing.csv');
  const headers = ['name', 'place'];
  const content = fs.readFileSync(csvPath, { encoding: 'utf-8' });
  parse(
    content,
    { delimiter: ',', columns: headers },
    async (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        const prisma = new PrismaClient();
        await prisma.casing.createMany({
          data: result,
          skipDuplicates: true,
        });
      }
    },
  );
}

export async function insertEquipment() {
  const csvPath = path.resolve(__dirname, 'equipment.csv');
  const headers = ['name', 'place'];
  const content = fs.readFileSync(csvPath, { encoding: 'utf-8' });
  parse(
    content,
    { delimiter: ',', columns: headers },
    async (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        const prisma = new PrismaClient();
        await prisma.equipment.createMany({
          data: result,
          skipDuplicates: false,
        });
      }
    },
  );
}
