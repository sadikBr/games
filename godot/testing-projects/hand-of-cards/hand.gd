class_name Hand extends Node2D

@export var MIN_ANGLE: float = -45.0
@export var MAX_ANGLE: float = -135.0

@export var HAND_SIZE: int = 1
@export var CIRCLE_RADIUS: int = 400

@export var ANGLE_OFFSET: float = 15.0

@onready var card_scene: PackedScene = preload("res://hand-of-cards/card.tscn")

func get_angles(size: int) -> Array[float]:
	var angles: Array[float] = []
	if size == 1:
		angles.append(-90)
	else:
		var total_angle = ANGLE_OFFSET * (size - 1)
		var min_angle = -90 + total_angle / 2
		var max_angle = -90 - total_angle / 2

		angles.append(min_angle)
		for i in range(size - 2):
			angles.append(min_angle - (i + 1)*ANGLE_OFFSET)
		angles.append(max_angle)
	
	angles.reverse()
	return angles

func get_card_position(_angle: float) -> Vector2:
	var x = CIRCLE_RADIUS * cos(deg_to_rad(_angle))
	var y = CIRCLE_RADIUS * sin(deg_to_rad(_angle))
	return Vector2(x, y)

func generate_hand(size: int):
	var angles = get_angles(size)
	for i in range(angles.size()):
		var angle = angles[i]
		var card = card_scene.instantiate() as Node2D
		card.position = get_card_position(angle)
		card.rotation = deg_to_rad(angle + 90)
		card.get_node("Panel/CardNumber").text = str(i + 1)
		self.add_child(card)

func _process(_delta: float) -> void:
	(get_node("DebugShape").shape as CircleShape2D).radius = CIRCLE_RADIUS
	generate_hand(HAND_SIZE)
