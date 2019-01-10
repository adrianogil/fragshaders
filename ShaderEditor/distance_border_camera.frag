#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 cameraAddent;
uniform mat2 cameraOrientation;
uniform samplerExternalOES cameraBack;

vec3 getcamerapixel(float i, float y)
{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec2 st = cameraAddent + uv * cameraOrientation;

    return texture2D(cameraBack, uv + vec2(i,y)/resolution.xy).rgb;
}

void main(void) {
    vec3 color = getcamerapixel(0,0);

    gl_FragColor = vec4(color, 1.0);
}
