from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import psycopg2


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Tarea(BaseModel):
    texto: str
    completada: bool = False


load_dotenv("datos.env")

def get_conn():
    return psycopg2.connect(
        host="localhost",
        database="taskmanager",
        user="postgres",
        password=os.getenv("DB_PASSWORD")
    )

@app.get("/tareas")
def obtener_tareas():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT id, texto, completada FROM tareas")
    filas = cursor.fetchall()
    conn.close()
    return [{"id": f[0], "texto": f[1], "completada": f[2]} for f in filas]

@app.post("/tareas")
def añadir_tarea(tarea: Tarea):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO tareas (texto, completada) VALUES (%s, %s)",
                   (tarea.texto, tarea.completada))
    conn.commit()
    conn.close()
    return obtener_tareas()

@app.delete("/tareas/{id}")
def eliminar_tarea(id: int):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tareas WHERE id = %s", (id,))
    conn.commit()
    conn.close()
    return obtener_tareas()