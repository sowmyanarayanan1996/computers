from fastapi import FastAPI,UploadFile
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware

upload_dir = Path()/'react_fastapi/uploads'


app= FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/upload_file')
async def upload_files(details:UploadFile):
    data = await details.read()
    upload_dir.mkdir(parents=True, exist_ok=True)
    save = upload_dir/details.filename
    with open(save,'wb')as f:
        f.write(data)
    return {"filename ":details.filename}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("back:app",port=8000, reload=True)
