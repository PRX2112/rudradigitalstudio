const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 table & calculation
function makeCrcTable() {
  const table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  return table;
}
const crcTable = makeCrcTable();

function crc32(buf) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crc]);
}

function encodePng(width, height, rgbaBuffer) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8 bits per channel
  ihdr.writeUInt8(6, 9); // RGBA
  ihdr.writeUInt8(0, 10); // compression
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // interlace
  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Scanlines with filter byte 0x00
  const scanlines = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    const rowOffset = y * (1 + width * 4);
    scanlines[rowOffset] = 0; // Filter None
    rgbaBuffer.copy(scanlines, rowOffset + 1, y * width * 4, (y + 1) * width * 4);
  }

  const idatData = zlib.deflateSync(scanlines);
  const idatChunk = makeChunk('IDAT', idatData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createIco(pngBuffers) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2); // ICO
  header.writeUInt16LE(pngBuffers.length, 4);

  const dirSize = 16 * pngBuffers.length;
  let offset = 6 + dirSize;
  const entries = [];

  for (const { width, height, buffer } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(width >= 256 ? 0 : width, 0);
    entry.writeUInt8(height >= 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buffer.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map(p => p.buffer)]);
}

// Draw a luxury circular RDS emblem into RGBA buffer
function drawRdsIcon(size) {
  const buf = Buffer.alloc(size * size * 4);
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size * 0.47;
  const rRing = size * 0.43;
  const ringWidth = Math.max(1.2, size * 0.055);

  // Pixel drawing
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const dx = x + 0.5 - cx;
      const dy = y + 0.5 - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= rOuter) {
        // Inside outer disk
        // Base dark obsidian color
        let r = 7;
        let g = 8;
        let b = 9;
        let a = 255;

        // Radial lighting
        const normDist = dist / rOuter;
        const light = 1 - normDist * 0.4;
        r = Math.min(255, Math.round(r + 14 * light));
        g = Math.min(255, Math.round(g + 16 * light));
        b = Math.min(255, Math.round(b + 22 * light));

        // Gold Ring
        const ringDist = Math.abs(dist - rRing);
        if (ringDist <= ringWidth) {
          const ringAlpha = Math.max(0, 1 - ringDist / ringWidth);
          // Copper/Gold (#d4a389 -> #f5d5c5)
          r = Math.round(r * (1 - ringAlpha) + 212 * ringAlpha);
          g = Math.round(g * (1 - ringAlpha) + 163 * ringAlpha);
          b = Math.round(b * (1 - ringAlpha) + 137 * ringAlpha);
        }

        // Anti-aliased outer edge
        if (dist > rOuter - 1) {
          const edgeAlpha = Math.max(0, Math.min(1, rOuter - dist));
          a = Math.round(edgeAlpha * 255);
        }

        buf[idx] = r;
        buf[idx + 1] = g;
        buf[idx + 2] = b;
        buf[idx + 3] = a;
      } else {
        // Transparent outside
        buf[idx] = 0;
        buf[idx + 1] = 0;
        buf[idx + 2] = 0;
        buf[idx + 3] = 0;
      }
    }
  }

  // Draw Lettering "R" (or "RDS" for larger sizes)
  // 5x7 or 7x9 bitmap font for crisp rendering at tiny icon resolutions
  if (size === 16) {
    // Sharp pixel "R" in center (5x7)
    const patternR = [
      "11110",
      "10001",
      "10001",
      "11110",
      "10010",
      "10001",
      "10001"
    ];
    drawBitmap(buf, size, patternR, 6, 5, [245, 213, 197, 255]);
  } else if (size === 32) {
    // "RDS" bitmap font
    // R (5x7)
    const R = [
      "11110",
      "10001",
      "10001",
      "11110",
      "10010",
      "10001",
      "10001"
    ];
    // D (5x7)
    const D = [
      "11110",
      "10001",
      "10001",
      "10001",
      "10001",
      "10001",
      "11110"
    ];
    // S (5x7)
    const S = [
      "01111",
      "10000",
      "10000",
      "01110",
      "00001",
      "00001",
      "11110"
    ];
    drawBitmap(buf, size, R, 6, 13, [245, 213, 197, 255]);
    drawBitmap(buf, size, D, 13, 13, [245, 213, 197, 255]);
    drawBitmap(buf, size, S, 20, 13, [245, 213, 197, 255]);
    // Top sparkle dot
    setPixel(buf, size, 15, 8, [212, 163, 137, 255]);
    setPixel(buf, size, 16, 7, [245, 213, 197, 255]);
    setPixel(buf, size, 16, 9, [212, 163, 137, 255]);
    setPixel(buf, size, 17, 8, [212, 163, 137, 255]);
  } else if (size >= 48) {
    // Scale 2x letters for 48px
    const scale = Math.round(size / 32);
    const R = [
      "11110",
      "10001",
      "10001",
      "11110",
      "10010",
      "10001",
      "10001"
    ];
    const D = [
      "11110",
      "10001",
      "10001",
      "10001",
      "10001",
      "10001",
      "11110"
    ];
    const S = [
      "01111",
      "10000",
      "10000",
      "01110",
      "00001",
      "00001",
      "11110"
    ];
    const startY = Math.round(cy - 4 * scale);
    drawScaledBitmap(buf, size, R, Math.round(cx - 10 * scale), startY, scale, [245, 213, 197, 255]);
    drawScaledBitmap(buf, size, D, Math.round(cx - 3 * scale), startY, scale, [245, 213, 197, 255]);
    drawScaledBitmap(buf, size, S, Math.round(cx + 4 * scale), startY, scale, [245, 213, 197, 255]);
  }

  return buf;
}

function setPixel(buf, size, x, y, color) {
  if (x >= 0 && x < size && y >= 0 && y < size) {
    const idx = (y * size + x) * 4;
    buf[idx] = color[0];
    buf[idx + 1] = color[1];
    buf[idx + 2] = color[2];
    buf[idx + 3] = color[3];
  }
}

function drawBitmap(buf, size, pattern, startX, startY, color) {
  for (let r = 0; r < pattern.length; r++) {
    for (let c = 0; c < pattern[r].length; c++) {
      if (pattern[r][c] === '1') {
        setPixel(buf, size, startX + c, startY + r, color);
      }
    }
  }
}

function drawScaledBitmap(buf, size, pattern, startX, startY, scale, color) {
  for (let r = 0; r < pattern.length; r++) {
    for (let c = 0; c < pattern[r].length; c++) {
      if (pattern[r][c] === '1') {
        for (let dy = 0; dy < scale; dy++) {
          for (let dx = 0; dx < scale; dx++) {
            setPixel(buf, size, startX + c * scale + dx, startY + r * scale + dy, color);
          }
        }
      }
    }
  }
}

// Generate sizes
const p16 = encodePng(16, 16, drawRdsIcon(16));
const p32 = encodePng(32, 32, drawRdsIcon(32));
const p48 = encodePng(48, 48, drawRdsIcon(48));
const p180 = encodePng(180, 180, drawRdsIcon(180));

const icoBuffer = createIco([
  { width: 16, height: 16, buffer: p16 },
  { width: 32, height: 32, buffer: p32 },
  { width: 48, height: 48, buffer: p48 },
]);

// Write destination files
fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'favicon.ico'), icoBuffer);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.ico'), icoBuffer);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'apple-touch-icon.png'), p180);
fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'apple-icon.png'), p180);

console.log('Favicon files generated successfully!');
console.log('ICO size:', icoBuffer.length, 'bytes');
console.log('Apple Touch Icon size:', p180.length, 'bytes');
