import ExcelJS from 'exceljs';
import { Request, Response } from 'express';
import ExportOrderService from '../services/ExportOrderService';
import AppError from 'shared/errors/AppError';
import Problems from 'modules/problems/typeorm/entities/Problems';

export default class ExportController {
  public async export(request: Request, response: Response): Promise<Response> {
    const service = new ExportOrderService();
    const order = await service.execute();

    if (!order.length) {
      throw new AppError('Nenhuma order encontrada', 404);
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Order');

    //define as colunas
    worksheet.columns = [
      { header: 'Titulo', key: 'title' },
      { header: 'Rua', key: 'address' },
      { header: 'Bairro - Cidade', key: 'neighborhooduf' },
      { header: 'Problema', key: 'description' },
    ];

    //add dados
    order.forEach(order => {
      worksheet.addRow({
        title: order.problems_id,
        address: order.address,
        number: order.number,
        neighborhooduf: order.neighborhooduf,
        latitude: order.latitude,
        logitude: order.longitude,
        reference: order.reference,
        description: order.descrition,
        creatd_at: order.created_at,
      });
    });

    //Gerar buffer
    const buffer = await workbook.xlsx.writeBuffer();

    //Cofigurar headers
    response.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=Order.xlsx',
    );

    return response.end(buffer);
  }
}
