import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'proyectos.json');

// GET - Obtener todos los proyectos
export async function GET() {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8');
    const jsonData = JSON.parse(data);
    return NextResponse.json(jsonData.proyectos);
  } catch (error) {
    return NextResponse.json({ error: 'Error al leer proyectos' }, { status: 500 });
  }
}

// POST - Crear nuevo proyecto
export async function POST(request: Request) {
  try {
    const newProject = await request.json();
    const data = fs.readFileSync(dataPath, 'utf-8');
    const jsonData = JSON.parse(data);

    // Generar nuevo ID
    const maxId = jsonData.proyectos.reduce((max: number, p: any) => Math.max(max, p.id), 0);
    newProject.id = maxId + 1;
    newProject.createdAt = new Date().toISOString();
    newProject.updatedAt = new Date().toISOString();
    newProject.active = true;

    jsonData.proyectos.push(newProject);
    fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2));

    return NextResponse.json(newProject);
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear proyecto' }, { status: 500 });
  }
}

// PUT - Actualizar proyecto
export async function PUT(request: Request) {
  try {
    const updatedProject = await request.json();
    const data = fs.readFileSync(dataPath, 'utf-8');
    const jsonData = JSON.parse(data);

    const index = jsonData.proyectos.findIndex((p: any) => p.id === updatedProject.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Proyecto no encontrado' }, { status: 404 });
    }

    updatedProject.updatedAt = new Date().toISOString();
    jsonData.proyectos[index] = { ...jsonData.proyectos[index], ...updatedProject };
    fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2));

    return NextResponse.json(jsonData.proyectos[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar proyecto' }, { status: 500 });
  }
}

// DELETE - Eliminar proyecto
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const data = fs.readFileSync(dataPath, 'utf-8');
    const jsonData = JSON.parse(data);

    jsonData.proyectos = jsonData.proyectos.filter((p: any) => p.id !== Number(id));
    fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar proyecto' }, { status: 500 });
  }
}
