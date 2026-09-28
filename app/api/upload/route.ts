import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('foto') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Tidak ada file yang diupload' },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const ext = file.name.split('.').pop();
    const fileName = `${timestamp}.${ext}`;
    
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, fileName);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const imageUrl = `/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      fileName: fileName
    });

  } catch (error) {
    console.error('Error upload file:', error);
    return NextResponse.json(
      { error: 'Gagal mengupload file' },
      { status: 500 }
    );
  }
}