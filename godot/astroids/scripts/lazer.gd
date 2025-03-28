extends CharacterBody2D

@export var speed: float = 1000.0
@export var lifespan: float = 2.5
@export var damage: int = 20

var direction: Vector2

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	position += direction * speed * delta
	
	# Remove the lazer if lifespan expires
	lifespan -= delta
	if lifespan <= 0:
		queue_free()
