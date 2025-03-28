extends Node2D

@onready var astroids: Node = $Astroids
@onready var ship: CharacterBody2D = $Ship

@export var astroid_scene: PackedScene

func _ready() -> void:
	ship.connect("ship_destroyed", _on_ship_destroyed)

func _on_ship_destroyed():
	ship.queue_free()
	get_tree().reload_current_scene()

func _on_astroid_spawner_timeout() -> void:
	var astroid = astroid_scene.instantiate()
	
	var position1 = Vector2(randf_range(0, 1300), randf_range(-300, -100))
	var position2 = Vector2(randf_range(-300, -100), randf_range(0, 800))
	var position3 = Vector2(randf_range(0, 1300), randf_range(800, 1000))
	var position4 = Vector2(randf_range(1300, 1500), randf_range(0, 800))
	
	var random_value = randf()
	
	if random_value < 0.2:
		astroid.position = position1
	elif random_value < 0.5:
		astroid.position = position2
	elif random_value < 0.8:
		astroid.position = position3
	else:
		astroid.position = position4
	
	astroid.astroid_direction = (ship.position - astroid.position).normalized()
	astroids.add_child(astroid)
