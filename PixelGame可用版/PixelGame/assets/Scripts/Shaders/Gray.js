const renderEngine = cc.renderer.renderEngine;
const renderer = renderEngine.renderer;
let CustomMaterial = require('CustomMaterial');

const shader = {
    name: 'GrayShader',

    defines: [],

    vert: `
        uniform mat4 viewProj;
        attribute vec3 a_position;
        attribute vec2 a_uv0;
        varying vec2 uv0;
        void main () {
            vec4 pos = viewProj * vec4(a_position, 1);
            gl_Position = pos;
            uv0 = a_uv0;
        }`,

    frag:
        `
        uniform sampler2D texture;
        uniform vec4 color;
        varying vec2 uv0;

        void main()
        {
            vec4 c = color * texture2D(texture,uv0);
            float g = 0.2126*c.r + 0.7152*c.g + 0.0722*c.b;
            gl_FragColor = vec4(g,g,g,c.a);
        }`,
};

CustomMaterial.addShader(shader);
module.exports = shader;