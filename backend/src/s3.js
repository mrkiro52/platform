const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')

const BUCKET = process.env.S3_BUCKET || 'kirocamp'
const ENDPOINT = process.env.S3_ENDPOINT || 'https://s3.regru.cloud'
const PUBLIC_BASE = process.env.S3_PUBLIC_URL || `https://${BUCKET}.s3.regru.cloud`

const s3 = new S3Client({
  region: process.env.S3_REGION || 'ru-1',
  endpoint: ENDPOINT,
  forcePathStyle: false,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  },
})

const s3Configured = Boolean(process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY)

async function uploadAvatar(key, buffer, contentType) {
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    ACL: 'public-read',
  }))
  return `${PUBLIC_BASE}/${key}`
}

async function deleteAvatar(key) {
  try {
    await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }))
  } catch {
    // ничего страшного, если объект уже отсутствует
  }
}

function keyFromUrl(url) {
  if (!url) return null
  const marker = `${PUBLIC_BASE}/`
  return url.startsWith(marker) ? url.slice(marker.length) : null
}

module.exports = { uploadAvatar, deleteAvatar, keyFromUrl, s3Configured }
