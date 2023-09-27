export default {
    vertex: `
        varying vec2 vUv;

        void main(){
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            vUv = uv;
        }
    `,
    fragment: `
        uniform sampler2D uTexture;

        varying vec2 vUv;

        void main(){
            vec4 color = texture(uTexture, vUv);

            float pixel = (color.r + color.g + color.b) / 3.0;

            float binary = step(200.0 / 255.0, pixel);

            gl_FragColor = vec4(vec3(binary), 1.0);
        }
    `
}