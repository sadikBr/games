extends Area2D

@export var speed: float = 50.0
@export var astroid_health: float = 200.0

var astroid_direction: Vector2

func take_damage(damage: int) -> void:
	astroid_health -= damage
	
	if astroid_health <= 0:
		queue_free()

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	position += astroid_direction * speed * delta

func _on_body_entered(body: Node2D) -> void:
	if body.is_in_group("lazer"):
		take_damage(body.damage)
		body.queue_free()
	elif body.name == "Ship":
		body.destroy()
