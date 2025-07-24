#lawlens/ui/api_server.py

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from langgraph.graph_builder import analyze_with_graph

app = FastAPI()

# Allow frontend on localhost:5173 to access API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str

@app.post("/api/analyze")
async def analyze(request: QueryRequest):
    result = analyze_with_graph(request.query)
    return {"result": result}

if __name__ == "__main__":
    uvicorn.run("lawlens.ui.api_server:app", host="0.0.0.0", port=8000, reload=True)
