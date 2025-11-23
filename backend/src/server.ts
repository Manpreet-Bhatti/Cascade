import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose, { Schema, Document } from "mongoose";
import cors from "cors";
import { Transform, TransformCallback } from "stream";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.use(cors());

interface ILog extends Document {
  service: string;
  level: string;
  message: string;
  timestamp: Date;
}

mongoose
  .connect("mongodb://localhost:27017/cascade")
  .then(() => console.log("MongoDB connected to Cascade"));

const LogSchema = new Schema<ILog>({
  service: String,
  level: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const LogModel = mongoose.model<ILog>("Log", LogSchema);

class LogParserStream extends Transform {
  private buffer: string = "";

  constructor() {
    super({ objectMode: true });
  }

  _transform(
    chunk: Buffer,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    this.buffer += chunk.toString();

    const lines = this.buffer.split("\n");

    this.buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.trim()) {
        try {
          const logEntry = JSON.parse(line);
          this.push(logEntry);
        } catch (error) {
          console.error("Parse Error:", error);
        }
      }
    }

    callback();
  }

  _flush(callback: TransformCallback): void {
    if (this.buffer.trim()) {
      try {
        this.push(JSON.parse(this.buffer));
      } catch (e) {}
    }

    callback();
  }
}

app.post("/ingest/stream", (req: Request, res: Response) => {
  const logParser = new LogParserStream();

  req.pipe(logParser).on("data", async (logData: any) => {
    io.emit("log", logData);

    await LogModel.create(logData);
  });

  req.on("end", () => res.status(200).send("Stream processed"));
  req.on("error", () => res.status(500).send("Stream Error"));
});

app.use(express.json());
app.post("/ingest/live", async (req: Request, res: Response) => {
  const logData = req.body;
  await LogModel.create(logData);
  io.emit("new-log", logData);
  res.sendStatus(200);
});

httpServer.listen(3001, () => console.log("Cascade Ingestor running on :3001"));
