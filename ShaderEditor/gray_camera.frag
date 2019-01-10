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
    float meancolor = (color.x + color.y + color.z)/3.0;

    color.x = meancolor;
    color.y = meancolor;
    color.z = meancolor;

    gl_FragColor = vec4(color, 1.0);
}
