extends Node2D

@onready var cursor_raycast: RayCast2D = $CursorRaycast

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	cursor_raycast.global_position = get_global_mouse_position()
	
	var collision = cursor_raycast.is_colliding()
	
	if collision:
		var collider = cursor_raycast.get_collider()
		var collider_parent = collider.get_parent()
		if collider_parent is Card:
			collider_parent.hover_effect()
