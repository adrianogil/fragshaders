// Shader simulates CatEye
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

    vec3 sepiaColor = texture2D(cameraBack, st).rgb;
    vec3 originalColor = sepiaColor;

    //  393:.769:.189
    sepiaColor.x = 0.393 * originalColor.x + 
              0.769 * originalColor.y +
              0.189 * originalColor.z;
    // .349:.686:.168
    sepiaColor.y = 0.349 * originalColor.x + 
              0.769 * originalColor.y +
              0.168 * originalColor.z;
    // .272:.534:.131
    sepiaColor.z = 0.272 * originalColor.x + 
              0.534 * originalColor.y +
              0.131 * originalColor.z;

    vec2 cateye_center = vec2(0.5, 0.5);
    float cateye_ellipse_a = 0.02;
    float cateye_ellipse_b = 0.2;

    float ellipse_value = (uv.x - cateye_center.x) * (uv.x - cateye_center.x) / cateye_ellipse_a + 
      (uv.y - cateye_center.y) * (uv.y - cateye_center.y) / cateye_ellipse_b;

    if (ellipse_value <= 1.0)
    {
      // Inside ellipse
      float darkFactor = 0.5*(1.0 - ellipse_value);
      vec3 darkerColor = originalColor - darkFactor*normalize(originalColor);
      gl_FragColor = vec4(darkerColor, 1.0);
    } else if (ellipse_value <= 2.0)
    {
      float f = ellipse_value - 1.0;
      gl_FragColor = vec4(mix(originalColor, sepiaColor, f), 1.0);
    }
    else{
      // Outside ellipse
      gl_FragColor = vec4(sepiaColor, 1.0);
    }
    
}



