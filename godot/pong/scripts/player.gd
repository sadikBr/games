extends StaticBody2D

@onready var player: StaticBody2D = $"."

var window_height: int
var paddle_height: int

func _ready() -> void:
	window_height = get_viewport_rect().size.y
	paddle_height = player.get_child(0).get_size().y

func _process(delta: float) -> void:
	if Input.is_action_pressed("ui_up"):
		position.y -= get_parent().PADDLE_SPEED * delta
	elif Input.is_action_pressed("ui_down"):
		position.y += get_parent().PADDLE_SPEED * delta
		
	position.y = clamp(position.y, paddle_height / 2, window_height - paddle_height / 2)
