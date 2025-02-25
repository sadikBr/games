extends Area2D

const SCROLL_SPEED = 150

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	if get_parent().game_started:
		position.x -= SCROLL_SPEED * delta
		if position.x <= 0:
			position.x = 864
