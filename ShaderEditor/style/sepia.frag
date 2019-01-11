// 393:.769:.189:0:.349:.686:.168:0:.272:.534:.131

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 cameraAddent;
uniform mat2 cameraOrientation;
uniform samplerExternalOES cameraBack;

void main(void) {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec2 st = cameraAddent + uv * cameraOrientation;

    vec3 color = texture2D(cameraBack, st).rgb;
    vec3 originalColor = color;

    //  393:.769:.189
    color.x = 0.393 * originalColor.x + 
              0.769 * originalColor.y +
              0.189 * originalColor.z;
    // .349:.686:.168
    color.y = 0.349 * originalColor.x + 
              0.769 * originalColor.y +
              0.168 * originalColor.z;
    // .272:.534:.131
    color.z = 0.272 * originalColor.x + 
              0.534 * originalColor.y +
              0.131 * originalColor.z;

    gl_FragColor = vec4(color, 1.0);
}
