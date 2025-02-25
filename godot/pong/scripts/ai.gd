extends StaticBody2D

@onready var ai: StaticBody2D = $"."
@onready var ball: CharacterBody2D = $"../Ball"

var window_height: int
var paddle_height: int

func _ready() -> void:
	window_height = get_viewport_rect().size.y
	paddle_height = ai.get_child(0).get_size().y

func _process(delta: float) -> void:
	var dist = position.y - ball.position.y
	if abs(dist) > get_parent().PADDLE_SPEED * delta:
		position.y -= get_parent().PADDLE_SPEED * delta * sign(dist)
	else:
		position.y -= dist
	position.y = clamp(position.y, paddle_height / 2, window_height - paddle_height / 2)
