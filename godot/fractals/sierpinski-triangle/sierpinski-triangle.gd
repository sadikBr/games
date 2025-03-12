extends ColorRect

@export var max_depth := 5  # Adjust this in the inspector!
@export var start_length := 600.0   # Initial triangle size

func _draw() -> void:
	var start_point := Vector2(get_viewport_rect().size.x/2, 0)  # Center-top
	draw_sierpinski(start_point, start_length, max_depth)

func draw_sierpinski(top: Vector2, size: float, depth: int) -> void:
	if depth <= 0:
		# Base case: Draw actual triangle
		var height := (sqrt(3)/2.0) * size
		var left := Vector2(top.x - size/2, top.y + height)
		var right := Vector2(top.x + size/2, top.y + height)
		draw_primitive(PackedVector2Array([top, left, right]), [Color.GREEN_YELLOW], [])
		return
	
	# Calculate positions for smaller triangles
	var half_size := size/2
	var small_height := (sqrt(3)/2.0) * half_size
	
	# 1. Top triangle (same position)
	draw_sierpinski(top, half_size, depth - 1)
	
	# 2. Left triangle
	var left_pos := Vector2(top.x - size/4, top.y + small_height)
	draw_sierpinski(left_pos, half_size, depth - 1)
	
	# 3. Right triangle
	var right_pos := Vector2(top.x + size/4, top.y + small_height)
	draw_sierpinski(right_pos, half_size, depth - 1)
