// ---------------------------------------------------------------------------
// Floating text labels via canvas-texture sprites. Used for room names and
// for entity bindings that show live values (temperature, sensor readings).
// ---------------------------------------------------------------------------

import * as THREE from 'three';

export class TextLabel {
  readonly sprite: THREE.Sprite;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private texture: THREE.CanvasTexture;
  private current = '';

  constructor(scale = 1) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 256;
    this.canvas.height = 128;
    this.ctx = this.canvas.getContext('2d')!;
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.anisotropy = 4;
    const material = new THREE.SpriteMaterial({
      map: this.texture,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });
    this.sprite = new THREE.Sprite(material);
    this.sprite.scale.set(1.0 * scale, 0.5 * scale, 1);
    this.sprite.renderOrder = 999;
  }

  setText(text: string, color = '#ffffff'): void {
    if (text === this.current) return;
    this.current = text;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Rounded translucent background pill.
    ctx.fillStyle = 'rgba(20,22,26,0.78)';
    roundRect(ctx, 8, 28, 240, 72, 16);
    ctx.fill();
    ctx.fillStyle = color;
    ctx.font = 'bold 48px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 128, 64, 224);
    this.texture.needsUpdate = true;
  }

  setPosition(x: number, y: number, z: number): void {
    this.sprite.position.set(x, y, z);
  }

  dispose(): void {
    this.texture.dispose();
    (this.sprite.material as THREE.SpriteMaterial).dispose();
  }
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
