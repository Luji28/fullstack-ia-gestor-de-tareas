from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class Tarea(BaseModel):
    texto: str
    completada: bool = False


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

tareas = []  # lista en la memoria

@app.get("/tareas")
def obtener_tareas():
    return tareas

@app.post("/tareas")
def añadir_tarea(tarea: Tarea):
    tareas.append(tarea)
    return tareas

@app.delete("/tareas/{index}")
def eliminar_tarea(index):
    del tareas[index]
    return tareas