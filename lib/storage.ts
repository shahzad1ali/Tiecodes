import { BlobServiceClient } from "@azure/storage-blob";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

const UPLOADS_DIR = join(/* turbopackIgnore: true */ process.cwd(), "uploads");

export async function saveUpload(file: File) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const storageKey = `${randomUUID()}-${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  if (process.env.STORAGE_PROVIDER === "azure") {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connectionString) throw new Error("Azure storage is not configured.");
    const container = BlobServiceClient.fromConnectionString(connectionString).getContainerClient(
      process.env.AZURE_STORAGE_CONTAINER ?? "portfolio"
    );
    await container.createIfNotExists();
    const blob = container.getBlockBlobClient(storageKey);
    await blob.uploadData(buffer, { blobHTTPHeaders: { blobContentType: file.type } });
    return { storageKey, url: blob.url };
  }
  await mkdir(UPLOADS_DIR, { recursive: true });
  await writeFile(join(UPLOADS_DIR, storageKey), buffer);
  return { storageKey, url: `/uploads/${storageKey}` };
}
