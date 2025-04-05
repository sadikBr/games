extends CharacterBody2D

const PLAYER_IMPACT = preload("res://scenes/player_impact.tscn")

var movement_speed: float = 7500.0

func _physics_process(delta: float) -> void:
	var target_position = get_global_mouse_position()
	var direction = (target_position - position).normalized()
	
	var distance_to_target = position.distance_to(target_position)
	
	if distance_to_target > 5.0:
		velocity = direction * movement_speed * delta
	else: 
		velocity = Vector2.ZERO

	move_and_slide()

func _on_hit_box_body_entered(body: Node2D) -> void:
	if body.is_in_group("enemies"):
		var impact = PLAYER_IMPACT.instantiate()
		impact.position = body.position
		get_parent().add_child(impact)
		body.queue_free()
		impact.emitting = true
		get_parent().shrink_player()
		var tree = get_tree()
		if tree:
			await tree.create_timer(0.5).timeout
			impact.queue_free()
