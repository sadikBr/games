extends Node2D

@onready var ray_cast_right: RayCast2D = $RayCastRight
@onready var ray_cast_left: RayCast2D = $RayCastLeft
@onready var animated_sprite: AnimatedSprite2D = $AnimatedSprite2D

const ENEMY_SPEED = 30
var direction = 1

func _process(delta: float) -> void:
	if ray_cast_right.is_colliding():
		animated_sprite.flip_h = true
		direction = -1

	if ray_cast_left.is_colliding():
		animated_sprite.flip_h = false
		direction = 1

	position.x += ENEMY_SPEED * direction * delta
