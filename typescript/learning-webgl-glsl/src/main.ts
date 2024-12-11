const canvas = document.getElementById('webglCanvas') as HTMLCanvasElement;
const webglContext = canvas.getContext('webgl') as WebGL2RenderingContext;

console.log(webglContext);
