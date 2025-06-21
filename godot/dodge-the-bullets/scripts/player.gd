extends CharacterBody2D

var player_speed: float = 150.0

func _physics_process(_delta: float) -> void:
	var target_position = get_global_mouse_position()
	var direction = (target_position - position).normalized()
	var distance_to_target = position.distance_to(target_position)
	if distance_to_target > 5.0:
		velocity = direction * player_speed
	else: 
		velocity = Vector2.ZERO
	move_and_slide()

func _on_hit_box_body_entered(body: Node2D) -> void:
	if body.is_in_group("enemies"):
		body.get_node("Sprite2D").visible = false
		var impact = body.get_node("PlayerImpact")
		impact.emitting = true
		get_parent().damage_player()
		var tree = get_tree()
		if tree:
			await tree.create_timer(0.2).timeout
			body.queue_free()
