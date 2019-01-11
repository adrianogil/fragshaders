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
    vec3 color0 = getcamerapixel(0.0, 0.0);

    vec3 color1 = getcamerapixel(-1.0, -1.0);
    vec3 color2 = getcamerapixel(-1.0,  0.0);
    vec3 color3 = getcamerapixel(-1.0,  1.0);
    vec3 color4 = getcamerapixel( 0.0, -1.0);
    vec3 color5 = getcamerapixel( 0.0,  1.0);
    vec3 color6 = getcamerapixel( 1.0, -1.0);
    vec3 color7 = getcamerapixel( 1.0,  0.0);
    vec3 color8 = getcamerapixel( 1.0,  1.0);


    float distance = length(color1 - color0) + 
                     length(color2 - color0) + 
                     length(color3 - color0) + 
                     length(color4 - color0) + 
                     length(color5 - color0) + 
                     length(color6 - color0) + 
                     length(color7 - color0) + 
                     length(color8 - color0);

    float max_distance = 0.1;
    float max_magnification = 0.05;

    vec3 magnification_factor = vec4(0.0, 0.0, 0.0);

    if (distance > max_distance)
    {
        magnification_factor = normalize(color0) * max_magnification;
    } else {
        magnification_factor = normalize(color0) * max_magnification * distance / max_distance;
    }

    gl_FragColor = color0 + magnification_factor;
}