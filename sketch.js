const string = "THE EGG"; 
const size = 270; 
const fontFile = "/sketch/Muli-Black.ttf";
const showText = true; // whether or not to have an overlay of the original text (in the background color)
const textAlpha = 1; // the alpha of the text if displayed (low value will make it slowly fade in)
const backgroundColor = 0; // black
const strokeAlpha = 60; // the alpha of the lines (lower numbers more transparent)
const strokeColor = [255, 204, 0]; // the line color
const fontSampleFactor = 0.6; // How many points there are: the higher the number, the closer together they are (more detail)
const noiseZoom = 0.011; // how zoomed in the perlin noise is
const noiseOctaves = 4; // The number of octaves for the noise
const noiseFalloff = 0.9; // The falloff for the noise layers
const zOffsetChange = 0; // How much the noise field changes in the z direction each frame
const individualZOffset = 0; // how far away the points/lines are from each other in the z noise axis (the bigger the number, the more chaotic)
const lineSpeed = 0.7; // the maximum amount each point can move each frame

let font;
let points = [];
let startingPoints;
let animationStarted = false; // Flag to track when the scroll happens

function preload() {
  font = loadFont(fontFile);
}

function setup() {
  console.log('Initializing canvas 1');
  createCanvas(windowWidth, 900);
  textFont(font);
  textSize(size);
  fill(backgroundColor, textAlpha);
  stroke(strokeColor, strokeAlpha);
  noiseDetail(noiseOctaves, noiseFalloff);
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '10'; 

  startingPoints = font.textToPoints(string, width / 2 - textWidth(string) / 2, height / 2, size, {"sampleFactor": fontSampleFactor});
  
  // Super important, converts text to a series of points, sampleFactor controls the density
  for (let p = 0; p < startingPoints.length; p++) {
    points[p] = startingPoints[p]; // For each starting point, save to array points, and give random z offset
    points[p].zOffset = random();
  }
  
  // Event listener for scroll
  window.onscroll = handleScroll;
}

function draw() {
  // Always draw the text outline even when animation hasn't started
  if (showText) {
    fill(1, 1); // Make sure text is outlined
    stroke(strokeColor, strokeAlpha); // Set the stroke color and transparency for the outline
    strokeWeight(1);
    text(string, width / 2 - textWidth(string) / 2, height / 2);
  }

  // If animation has started, start drawing the noisy lines
  if (animationStarted) {
    for (let pt = 0; pt < points.length; pt++) {
      let p = points[pt];
      let noiseX = p.x * noiseZoom;
      let noiseY = p.y * noiseZoom;
      let noiseZ = frameCount * zOffsetChange + p.zOffset * individualZOffset;
      let newPX = p.x + map(noise(noiseX, noiseY, noiseZ), 0, 1, -lineSpeed, lineSpeed);
      let newPY = p.y + map(noise(noiseX, noiseY, noiseZ + 214), 0, 1, -lineSpeed, lineSpeed);
      line(p.x, p.y, newPX, newPY);
      p.x = newPX; // Update the point for the next frame
      p.y = newPY;
    }
  }
}

function handleScroll() {
  if (!animationStarted) {
    animationStarted = true; 
    loop(); 
  }
}
 