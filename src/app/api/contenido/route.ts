import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'contenido.json');

// GET - Obtener todo el contenido
export async function GET() {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8');
    const jsonData = JSON.parse(data);
    return NextResponse.json(jsonData);
  } catch (error) {
    return NextResponse.json({ error: 'Error al leer contenido' }, { status: 500 });
  }
}

// PUT - Actualizar contenido completo
export async function PUT(request: Request) {
  try {
    const newContent = await request.json();
    fs.writeFileSync(dataPath, JSON.stringify(newContent, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar contenido' }, { status: 500 });
  }
}
