import 'dotenv/config';
import nodemailer from 'nodemailer';
import formatData from '@config/formdata/FormData';

export async function sendOrderEmail(order: any) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mapsLink = `https://www.google.com/maps?q=${order.latitude},${order.longitude}`;

  // ✅ monta as imagens
  const imagesHtml = order.photos
    ?.map(
      (photo: any) => `
      <div style="margin-bottom:15px;text-align:center;">

        <!-- imagem -->
        <img src="${photo.url}" width="150"
             style="display:block;margin:0 auto 8px;border-radius:8px;object-fit:cover;" />

        <!-- botão -->
        <a href="${photo.url}" target="_blank"
           style="
             display:inline-block;
             padding:8px 12px;
             background:#28a745;
             color:#fff;
             text-decoration:none;
             border-radius:6px;
             font-size:13px;
           ">
           🔍 Ver imagem
        </a>

      </div>
    `,
    )
    .join('');

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 10px;">
      <h2 style="color: #2c3e50;">📢 Nova ordem cadastrada</h2>

      <p><strong>🛠 Problema:</strong> ${order.problems?.name || '-'}</p>
      <p><strong>📍 Endereço:</strong> ${order.address || '-'}, ${order.number || '-'}</p>
      <p><strong>🏙 Bairro/Cidade:</strong> ${order.neighborhooduf || '-'}</p>
      <p><strong>📌 Referência:</strong> ${order.reference || '-'}</p>
      <p><strong>📝 Descrição:</strong> ${order.descrition || '-'}</p>

      <p><strong>📅 Data:</strong> ${formatData(order.created_at)}</p>

      <hr />

      <p><strong>🌍 Localização:</strong></p>
      <a href="${mapsLink}" target="_blank"
         style="display:inline-block;padding:10px 15px;background:#3498db;color:#fff;text-decoration:none;border-radius:5px;">
        📍 Abrir no mapa
      </a>

      <p style="margin-top:10px;font-size:12px;color:#777;">
        Latitude: ${order.latitude || '-'} <br/>
        Longitude: ${order.longitude || '-'}
      </p>

      ${
        order.photos && order.photos.length > 0
          ? `
        <hr />
        <p><strong>📷 Fotos:</strong></p>
        <div style="display:flex;flex-wrap:wrap;">
          ${imagesHtml}
        </div>
      `
          : ''
      }
    </div>
  `;

  await transporter.sendMail({
    from: 'alecsandrolink2@gmail.com',
    to: 'edu94jf@gmail.com',
    subject: '📢 Nova ordem cadastrada',
    html,
  });
}
