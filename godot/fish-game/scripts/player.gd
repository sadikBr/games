extends CharacterBody2D

const ACCELERATION: float = 5
var target_position: Vector2

func _process(delta: float) -> void:
	if Input.is_action_just_released("click"):
		target_position = get_global_mouse_position()
		look_at(target_position)

	
	if target_position:		
		if target_position.x < position.x:
			$Sprite2D.flip_v = true
		else: $Sprite2D.flip_v = false
		
		var diff = target_position - position
		position += diff * ACCELERATION * delta

func _on_breath_timer_timeout() -> void:
	$BreathEffect.emitting = true
