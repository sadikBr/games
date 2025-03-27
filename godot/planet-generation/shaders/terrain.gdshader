shader_type spatial;

uniform sampler2D noise;
uniform sampler2D gradient: repeat_disable;

varying vec4 world_vert;

void vertex() {
	vec3 new_vertex = VERTEX + VERTEX * texture(noise, UV).xyz;
	world_vert = inverse(MODEL_MATRIX) * vec4(new_vertex, 1.0);
	VERTEX = new_vertex;
}

void fragment() {
	float color_uv = (length(world_vert.xyz) - 6.0) / 4.0;
	
	SPECULAR = 0.8;
	ROUGHNESS = 0.6;
	ALBEDO = texture(gradient, vec2(color_uv, 0.0)).rgb;
}

//void light() {
//	// Called for every pixel for every light affecting the material.
//	// Uncomment to replace the default light processing function with this one.
//}
