extends ColorRect

var top_point: Vector2
var triangles = []

func _ready() -> void:
	top_point = Vector2(get_window().size.x / 2.0, 0)
	triangles = {
		"triangles": [top_point],
		"height": get_window().size.y
	}
	
	for i in range(8):
		triangles = calculate_triangles(triangles["height"])

func calculate_triangles(height):
	var new_triangles = []
	
	for point in triangles["triangles"]:
		var triangle_side = height / sin(deg_to_rad(60))
		var bottom_right_point = Vector2(point.x + triangle_side / 2, point.y + height)
		var bottom_left_point = Vector2(point.x - triangle_side / 2, point.y + height)
		
		new_triangles.append_array([point, bottom_left_point, bottom_right_point])
	
	return { "triangles": new_triangles, "height": height / 2 }


func _draw() -> void:
	for point in triangles["triangles"]:
		draw_triangle(point, triangles.height * 2)

func draw_triangle(point: Vector2, height: int, triangle_color: Color = Color.GREEN_YELLOW) -> void:
	if height < .1: return
	
	var triangle_side = height / sin(deg_to_rad(60))
	var bottom_right_point = Vector2(point.x + triangle_side / 2, point.y + height)
	var bottom_left_point = Vector2(point.x - triangle_side / 2, point.y + height)

	draw_primitive([
		point, bottom_left_point, bottom_right_point
	], [triangle_color], [])
