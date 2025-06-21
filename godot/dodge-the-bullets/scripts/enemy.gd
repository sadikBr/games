extends CharacterBody2D

@onready var player: CharacterBody2D = $"../../Player"

var enemy_speed: float = 220.0
var new_velocity: Vector2

func _physics_process(delta: float) -> void:
	var direction = (player.position - position).normalized()

	if new_velocity.length() == 0:
		new_velocity = direction * enemy_speed * delta

	position += new_velocity
